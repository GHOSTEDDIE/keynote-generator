import test from 'node:test';
import assert from 'node:assert/strict';
import { generate, templates, normalizeProduct, productCategories, styles, suggestedProducts } from './generator.js';

test('用户给定句式的固定结果回归', () => {
  assert.equal(generate({ templateId: 0, rng: () => 0 }).text, '杯子，2年前立项，研发20个月。');
  assert.equal(generate({ templateId: 1, rng: () => 0 }).text, '为了这款杯子，我们开了50场会。');
});

test('每个模板保留产品名，边界随机值不会产生空值或非法数字', () => {
  for (const template of templates) {
    for (const value of [0, 0.5, 0.999999]) {
      const result = generate({ product: '折叠拖鞋', templateId: template.id, rng: () => value });
      assert.ok(result.text.includes('折叠拖鞋'));
      if (result.hasNumbers) assert.match(result.text, /\d/);
      assert.doesNotMatch(result.text, /undefined|NaN|null/);
      assert.equal(result.style, template.style);
    }
  }
});

test('随机生成遵守口吻选择且不连续重复模板', () => {
  for (const { id: style } of styles) {
    let previousId;
    for (let i = 0; i < 1000; i++) {
      const result = generate({ style, previousId });
      assert.notEqual(result.templateId, previousId);
      if (style !== 'all') assert.equal(result.style, style);
      previousId = result.templateId;
    }
  }
});

test('只换数字保留句式和产品', () => {
  for (const template of templates) {
    const first = generate({ product: '纸巾', templateId: template.id, rng: () => 0 });
    const second = generate({ product: first.product, templateId: first.templateId, rng: () => 0.999999 });
    if (!first.hasNumbers) {
      assert.equal(first.text, second.text);
      continue;
    }
    assert.notEqual(first.text, second.text);
    assert.equal(first.text.replace(/\d+/g, '#'), second.text.replace(/\d+/g, '#'));
  }
});

test('新增示例的固定结果回归', () => {
  assert.equal(generate({ product: '汽车', templateId: 32, rng: () => 0 }).text, '这款汽车，靠背角度比迈巴赫还多1度。');
  assert.equal(generate({ product: '纸巾盒', templateId: 24 }).text, '我们这款纸巾盒是车规级纸巾盒。');
  assert.equal(generate({ product: '中折叠', templateId: 25 }).text, '我们这次的中折叠是行业首发。');
});

test('车型、手机和折叠屏识别，不将折叠拖鞋误判为手机', () => {
  assert.deepEqual(productCategories('新能源汽车'), ['car', 'seat']);
  assert.deepEqual(productCategories('SUV'), ['car', 'seat']);
  assert.deepEqual(productCategories('中折叠'), ['phone', 'foldable']);
  assert.deepEqual(productCategories('三折叠手机'), ['phone', 'foldable']);
  assert.deepEqual(productCategories('折叠拖鞋'), ['everyday']);
  assert.deepEqual(productCategories('纸巾盒'), ['everyday']);
  assert.deepEqual(productCategories('手机'), ['phone']);
  assert.deepEqual(productCategories('沙发'), ['seat', 'everyday']);
});

test('每种物品和口吻只抽取通用或对应品类句式，所有候选都可达', () => {
  for (const product of [...suggestedProducts, '折叠拖鞋', '自定义产品']) {
    const categories = productCategories(product);
    for (const { id: style } of styles) {
      const pool = templates.filter(t => (style === 'all' || t.style === style) &&
        (!t.categories.length || t.categories.some(c => categories.includes(c))));
      assert.ok(pool.length > 1);
      for (let i = 0; i < pool.length; i++) {
        const result = generate({ product, style, rng: () => (i + 0.5) / pool.length });
        assert.equal(result.templateId, pool[i].id);
        assert.ok(result.text.includes(product));
        const next = generate({ product, style, previousId: result.templateId, rng: () => 0 });
        assert.notEqual(next.templateId, result.templateId);
      }
    }
  }
});

test('无随机数字的句式不因产品型号含数字而开启只换数字', () => {
  assert.equal(generate({ product: '手机17', templateId: 25 }).hasNumbers, false);
  assert.equal(generate({ product: '手机17', templateId: 0 }).hasNumbers, true);
});

test('空白产品默认杯子，去首尾空格并限制长度', () => {
  assert.equal(normalizeProduct('   '), '杯子');
  assert.equal(normalizeProduct('  纸巾  '), '纸巾');
  assert.equal([...normalizeProduct('🫖'.repeat(30))].length, 20);
});
