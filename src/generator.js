export const styles = [
  { id: 'all', label: '自由发挥', note: '下一句，谁也猜不到。' },
  { id: 'research', label: '研发叙事', note: '产品很小，项目很大。' },
  { id: 'detail', label: '死磕细节', note: '每个细节，都值得一场会。' },
  { id: 'vision', label: '格局打开', note: '重新定义一点日常。' },
  { id: 'hype', label: '越级宣言', note: '车规级起步，行业首发。' },
];

export const suggestedProducts = ['杯子', '拖鞋', '纸巾', '纸巾盒', '充电线', '汽车', '手机', '中折叠', '耳机', '冰箱', '沙发'];

export function productCategories(product) {
  const categories = [];
  if (/汽车|轿车|跑车|越野车|新能源车|电动车|SUV|MPV/i.test(product)) categories.push('car');
  if (/手机|折叠屏|中折叠|大折叠|小折叠|三折叠|iPhone/i.test(product)) categories.push('phone');
  if (/折叠屏|中折叠|大折叠|小折叠|三折叠|折叠.*手机|手机.*折叠/i.test(product)) categories.push('foldable');
  if (/座椅|沙发|靠背|椅子/.test(product) || categories.includes('car')) categories.push('seat');
  if (/杯|纸巾|拖鞋|充电线|耳机|冰箱|沙发|枕头|雨伞|牙刷/.test(product)) categories.push('everyday');
  return categories;
}

// A shared rendering context keeps random ranges and product substitution in one place.
export const templates = [
  ['research', ({ p, n }) => `${p}，${n(2, 8)}年前立项，研发${n(20, 96)}个月。`],
  ['research', ({ p, n }) => `为了这款${p}，我们开了${n(50, 999)}场会。`],
  ['research', ({ p, n }) => `${n(12, 80)}位工程师，熬过${n(100, 900)}个凌晨，只为这款${p}。`],
  ['research', ({ p, n }) => `这款${p}背后，是${n(3, 12)}个实验室和${n(1000, 9000)}页被推翻的方案。`],
  ['research', ({ p, n }) => `我们为${p}做了${n(100, 800)}版原型，最后选择了第${n(1, 9)}版的初心。`],
  ['research', ({ p, n }) => `这款${p}晚来了${n(6, 36)}个月，因为我们还想再好${n(1, 9)}%。`],
  ['research', ({ p, n }) => `为了做好${p}，我们把${n(5, 30)}年的行业经验，全部重新学了一遍。`],
  ['research', ({ p, n }) => `${p}的研发预算追加了${n(8, 66)}次，只因我们对平凡不妥协。`],
  ['detail', ({ p, n }) => `只是${p}上的一个弧度，我们就打磨了${n(100, 999)}次。`],
  ['detail', ({ p, n }) => `为了让${p}看起来毫不费力，我们付出了${n(1000, 9999)}小时的努力。`],
  ['detail', ({ p, n }) => `${p}的这一抹白，是从${n(100, 999)}种白里选出来的。`],
  ['detail', ({ p, n }) => `这款${p}的包装打开速度，被我们精确到了${n(1, 9)}位小数。`],
  ['detail', ({ p, n }) => `哪怕只提升${n(1, 9)}%的手感，这款${p}也值得推倒重来${n(20, 99)}次。`],
  ['detail', ({ p, n }) => `从${n(30, 90)}个角度审视这款${p}，每一个角度，都有自己的项目组。`],
  ['detail', ({ p, n }) => `这款${p}没有多余的设计，因为我们删掉了${n(100, 999)}个多余的设计。`],
  ['detail', ({ p, n }) => `为了${p}上这${n(1, 5)}毫米的改变，我们的会议纪要厚了${n(10, 99)}厘米。`],
  ['vision', ({ p, n }) => `我们不是做了一款${p}，而是提前交付了${n(5, 30)}年后的日常。`],
  ['vision', ({ p, n }) => `今天，这款${p}让行业的想象力，向前走了${n(10, 99)}步。`],
  ['vision', ({ p, n }) => `${n(3, 15)}代人的期待，终于在这款${p}上有了答案。`],
  ['vision', ({ p, n }) => `关于${p}，我们问了${n(1000, 9999)}个为什么，才敢说这一句凭什么。`],
  ['vision', ({ p, n }) => `从${n(10, 99)}个不可能，到你手里的这款${p}。`],
  ['vision', ({ p, n }) => `世界上有${n(1000, 9999)}种${p}，我们想做第一个让你记住的。`],
  ['vision', ({ p, n }) => `这款${p}的起点，是我们对未来${n(10, 50)}年的一次认真想象。`],
  ['vision', ({ p, n }) => `${n(100, 999)}次被质疑之后，我们用这款${p}，重新定义理所当然。`],
  ['hype', ({ p }) => `我们这款${p}是车规级${p}。`, ['everyday']],
  ['hype', ({ p }) => `我们这次的${p}是行业首发。`],
  ['hype', ({ p, n }) => `这款${p}，旗舰级只是起点，我们直接做到了${n(2, 9)}个级别之上。`],
  ['hype', ({ p, n }) => `关于${p}的行业标准，我们今天新增了${n(3, 18)}条。`],
  ['hype', ({ p, n }) => `这款${p}，${n(10, 99)}万元以内，我们暂时没找到对手。`],
  ['hype', ({ p }) => `这款${p}，别人叫配置，我们叫标配。`],
  ['hype', ({ p, n }) => `${p}行业还在卷参数，我们已经领先了${n(2, 8)}个版本的审美。`],
  ['hype', ({ p, n }) => `为了这款${p}，我们第一次把${n(3, 12)}个行业的旗舰标准放在了一起。`],
  ['detail', ({ p, n }) => `这款${p}，靠背角度比迈巴赫还多${n(1, 9)}度。`, ['seat']],
  ['hype', ({ p, n }) => `这款${p}，靠背角度比迈巴赫还多${n(1, 9)}度，这一度，是格局。`, ['seat']],
  ['detail', ({ p, n }) => `这款${p}的后排，多出的${n(1, 9)}毫米，装得下整个商务舱。`, ['car']],
  ['detail', ({ p, n }) => `这款${p}的关门声，我们请${n(8, 30)}位调音师，调了${n(100, 999)}遍。`, ['car']],
  ['research', ({ p, n }) => `为了这款${p}的座椅，我们让${n(100, 999)}位工程师，认真坐了${n(6, 36)}个月。`, ['car']],
  ['hype', ({ p, n }) => `这款${p}，把${n(100, 500)}万元级的豪华，做成了入门配置。`, ['car']],
  ['vision', ({ p, n }) => `这款${p}有${n(3, 9)}个轮子之外的梦想，首先，是把客厅搬上路。`, ['car']],
  ['detail', ({ p, n }) => `这款${p}的座椅按摩有${n(20, 99)}种模式，连周一的疲惫都有专属方案。`, ['car']],
  ['research', ({ p, n }) => `这款${p}的车载冰箱，我们用${n(100, 999)}瓶可乐，验证了什么叫刚刚好的凉。`, ['car']],
  ['hype', ({ p, n }) => `这款${p}有${n(10, 99)}项同级唯一，同级是谁，我们稍后再定义。`, ['car']],
  ['detail', ({ p, n }) => `这款${p}的边框又窄了${n(1, 9)}丝米，但我们的格局又大了${n(2, 8)}倍。`, ['phone']],
  ['research', ({ p, n }) => `为了这款${p}的镜头模组，我们推翻了${n(30, 99)}版设计，才让每一颗都像主摄。`, ['phone']],
  ['hype', ({ p }) => `这款${p}，是手机，也是你口袋里的专业影像工作室。`, ['phone']],
  ['detail', ({ p, n }) => `这款${p}的快门声，我们采集了${n(30, 99)}台相机，只为听起来更像大片。`, ['phone']],
  ['vision', ({ p, n }) => `这款${p}领先的不只是${n(2, 5)}代性能，还有你下次换机的理由。`, ['phone']],
  ['hype', ({ p, n }) => `这款${p}，${n(3, 9)}颗镜头，每一颗都想当主角。`, ['phone']],
  ['research', ({ p, n }) => `为了这款${p}的散热，我们让${n(30, 99)}位工程师，重新理解了冷静。`, ['phone']],
  ['hype', ({ p, n }) => `这款${p}，${n(2, 5)}块屏幕，打开的是整个行业的想象力。`, ['foldable']],
  ['detail', ({ p, n }) => `这款${p}，铰链折叠${n(30, 99)}万次之后，我们才决定把它叫作刚刚开始。`, ['foldable']],
  ['research', ({ p, n }) => `为了这款${p}的折痕，我们开了${n(100, 999)}场会，最终决定让行业先折服。`, ['foldable']],
  ['hype', ({ p }) => `我们这次的${p}是行业首发，折的是屏幕，展开的是时代。`, ['foldable']],
  ['vision', ({ p, n }) => `这款${p}展开只需${n(1, 3)}秒，我们为这一刻准备了${n(3, 9)}年。`, ['foldable']],
  ['hype', ({ p, n }) => `这款${p}用了${n(3, 9)}道航天级工艺，只为让日常也能冲上云霄。`, ['everyday']],
  ['detail', ({ p, n }) => `这款${p}通过了${n(100, 999)}次严苛测试，严苛到测试员都想给它开场发布会。`, ['everyday']],
  ['hype', ({ p }) => `这款${p}，以百万豪车的标准，重新定义日用品。`, ['everyday']],
  ['research', ({ p, n }) => `这款${p}背后，是${n(3, 9)}个实验室对生活仪式感的联合攻关。`, ['everyday']],
].map(([style, render, categories = []], id) => ({ id, style, render, categories }));

export function normalizeProduct(product) {
  return [...product.trim()].slice(0, 20).join('') || '杯子';
}

export function generate({ product = '杯子', style = 'all', previousId, templateId, rng = Math.random } = {}) {
  const p = normalizeProduct(product);
  const categories = productCategories(p);
  const pool = templates.filter(t => (style === 'all' || t.style === style) && t.id !== previousId &&
    (!t.categories.length || t.categories.some(category => categories.includes(category))));
  const template = templateId === undefined ? pool[Math.floor(rng() * pool.length)] : templates.find(t => t.id === templateId);
  if (!template) throw new Error('没有匹配的文案模板');
  let hasNumbers = false;
  const n = (min, max) => {
    hasNumbers = true;
    return Math.floor(rng() * (max - min + 1)) + min;
  };
  const text = template.render({ p, n });
  return { templateId: template.id, style: template.style, product: p, text, hasNumbers };
}
