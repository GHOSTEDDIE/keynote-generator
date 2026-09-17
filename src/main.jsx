import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { generate, styles, suggestedProducts } from './generator.js';
import './style.css';

function Icon({ name, ...props }) {
  const paths = {
    shuffle: 'm16 3 4 4-4 4M4 7h3c5 0 5 10 10 10h3m-4-4 4 4-4 4M4 17h3c2 0 3-2 4-4m2-2c1-2 2-4 4-4h3',
    copy: 'M9 8V4h11v13h-4M4 8h11v13H4z',
    arrow: 'M4 12h16m-6-6 6 6-6 6',
    refresh: 'M20 7v5h-5M4 17v-5h5M6 7a7 7 0 0 1 12-1l2 6M4 12l2 6a7 7 0 0 0 12-1',
  };
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}><path d={paths[name]} /></svg>;
}

function Quote({ text }) {
  return text.split(/(\d+(?:\.\d+)?)/g).map((part, i) => /\d/.test(part) ? <em key={i}>{part}</em> : <React.Fragment key={i}>{part}</React.Fragment>);
}

function App() {
  const [product, setProduct] = useState('杯子');
  const [style, setStyle] = useState('all');
  const [quote, setQuote] = useState(() => generate({ templateId: 1 }));
  const [history, setHistory] = useState([]);
  const [count, setCount] = useState(1);
  const [status, setStatus] = useState('');
  const [copying, setCopying] = useState(false);
  const copyInFlight = useRef(false);

  function nextQuote(numbersOnly = false) {
    if (numbersOnly && !quote.hasNumbers) return;
    const next = generate({
      product: numbersOnly ? quote.product : product,
      style,
      previousId: quote.templateId,
      ...(numbersOnly ? { templateId: quote.templateId } : {}),
    });
    // Same random digits are possible; advance once within the template's range.
    if (next.text === quote.text) {
      const values = [0, 0.999999];
      for (const value of values) {
        const candidate = generate({ product: next.product, templateId: next.templateId, rng: () => value });
        if (candidate.text !== quote.text) { Object.assign(next, candidate); break; }
      }
    }
    setHistory(items => [quote, ...items].slice(0, 3));
    setQuote(next);
    setCount(value => value + 1);
    setStatus('');
  }

  async function copy(text) {
    if (copyInFlight.current) return;
    copyInFlight.current = true;
    setCopying(true);
    setStatus('');
    try {
      await navigator.clipboard.writeText(text);
      setStatus('已复制，轮到你上台了。');
    } catch {
      setStatus('复制未成功，请选中文案后手动复制。');
    } finally {
      copyInFlight.current = false;
      setCopying(false);
    }
  }

  return <div className="app">
    <header className="header">
      <a className="brand" href="./" aria-label="有点东西首页"><span className="brand-icon" aria-hidden="true">有</span><span>有点东西<span className="brand-sub">发布会文案生成器</span></span></a>
      <span className="header-note"><span className="live-dot" /> 每个小东西，都值得一场发布会</span>
    </header>
    <main>
      <section className="intro"><p className="eyebrow">平凡产品 · 隆重登场</p><h1>产品可以普通，<br className="mobile-break" />发布会不能。</h1><p className="intro-copy">给一点小题大做，来一句一本正经的夸张。</p></section>
      <div className="workspace">
        <aside className="controls" aria-label="文案设置">
          <div className="field-heading"><label htmlFor="product">今天，发布点什么？</label><span>最多 20 字</span></div>
          <input id="product" value={product} maxLength={20} onChange={e => setProduct(e.target.value)} placeholder="比如：汽车、手机、纸巾盒" />
          <div className="suggestions" aria-label="试试这些产品">{suggestedProducts.map(p => <button key={p} type="button" aria-pressed={product === p} onClick={() => setProduct(p)}>{p}</button>)}</div>
          <fieldset><legend>选一种发布会口吻</legend><div className="style-options">{styles.map(item => <label key={item.id} className={`style-option ${style === item.id ? 'selected' : ''}`}><input type="radio" name="style" value={item.id} checked={style === item.id} onChange={() => setStyle(item.id)} /><span><strong>{item.label}</strong><small>{item.note}</small></span><span className="radio-mark" aria-hidden="true" /></label>)}</div></fieldset>
          <div className="aside-note"><span aria-hidden="true">✳</span><p>东西越日常，<br />场面越不寻常。</p></div>
        </aside>
        <section className="result" aria-label="生成的发布会文案">
          <div className="stage">
            <div className="stage-top"><span className="stage-label"><span className="live-dot" /> 重磅发布</span><span className="slide-number">第 {String(count).padStart(2, '0')} 句</span></div>
            <div className="speech"><p className="quote-category">{styles.find(item => item.id === quote.style).label} / {quote.product}</p><blockquote key={count} aria-live="polite" aria-atomic="true"><Quote text={quote.text} /></blockquote></div>
            <div className="stage-bottom"><span>掌声，可以响起来了。</span><span className="stage-star" aria-hidden="true">✳</span></div>
          </div>
          <div className="actions"><button className="primary" onClick={() => nextQuote()}><Icon name="shuffle" />再来一句大的<Icon name="arrow" /></button><button className="secondary" disabled={!quote.hasNumbers} onClick={() => nextQuote(true)}><Icon name="refresh" />只换数字</button><button className="secondary" disabled={copying} onClick={() => copy(quote.text)}><Icon name="copy" />复制文案</button></div>
          <div className="feedback" role="status">{status || (!quote.hasNumbers ? '这句不含随机数字，试试“再来一句大的”。' : '')}</div>
          <section className="history" aria-label="刚刚的金句"><div className="history-heading"><h2>刚刚的金句</h2><span>好大的口气，好小的产品</span></div>{history.length ? <ol>{history.map((item, index) => <li key={`${count}-${index}`}><span className="history-index">{String(count - index - 1).padStart(2, '0')}</span><p>{item.text}</p><button className="history-copy" disabled={copying} onClick={() => copy(item.text)} aria-label={`复制第${count - index - 1}句`}><Icon name="copy" /></button></li>)}</ol> : <div className="empty-history"><span aria-hidden="true">↗</span> 再来一句，上一句就收在这里。</div>}</section>
        </section>
      </div>
    </main>
    <footer><span>有点东西 · 小题大做工作室</span><span>纯属虚构，认真你就输了。</span></footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
