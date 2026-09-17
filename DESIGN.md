---
version: alpha
colors:
  page: "#f3f5fa"
  paper: "#ffffff"
  ink: "#17213c"
  muted: "#616b82"
  blue: "#203fbd"
  blue-hover: "#17319a"
  lime: "#e5fd86"
  line: "#dce1ed"
  soft: "#eaf0ff"
  stage-muted: "#ccd5ff"
  scroll-thumb: "#a3adc5"
  scroll-hover: "#7a86a5"
  scroll-active: "#616b82"
typography:
  sans:
    fontFamily: '"PingFang SC", "Microsoft YaHei", system-ui, sans-serif'
  display:
    fontFamily: '"Arial Black", "PingFang SC", "Microsoft YaHei", sans-serif'
omitted:
  - section: spacing
    reason: Single screen with component-specific spacing defined in CSS.
  - section: rounded
    reason: Component-specific radii live in CSS.
  - section: components
    reason: Component states documented below; no theme adapter.
---

# 有点东西

## Overview
面向中文用户的单页娱乐工具。依据本次用户需求，纯前端 React、随机一句话、可替换数字，不接入模型或后端。新建目录没有可复用模块或同级页面。

视觉参考发布会演示屏：大块钴蓝舞台、醒目的数字、安静的设置区；不做数据仪表盘，不堆功能。原创句式为戏仿，不归属真实品牌。

## Colors
src/style.css 的 :root 是运行时唯一配色源；本文件 colors 同名映射到 --变量。数字 lime 仅在 blue 上显示；ink 为页面正文，muted 为辅助文字。一个浅色主题。

## Typography
sans 对应 --sans，display 对应 --display。使用本地中文字体，无外部字体加载。大屏文案 28–41px，设置文字 11–16px。长产品名自动换行。

## Layout
页面最大宽 1280px，桌面左设置右舞台，700px 以下改为上下布局。文档自然滚动，不限制页面高度。文案、操作区与反馈区分开；反馈预留 33px。

## Elevation & Depth
用色块、浅边框区分层次；不使用阴影和模糊。舞台作为唯一高对比视觉焦点。

## Shapes
舞台 14px 圆角，输入 9px，操作按钮 8px。标识轻微倾斜呼应玩笑感，其他控件保持稳定。

## Components
原生 button、input、radio 为唯一交互实现。输入和口吻修改在“再来一句大的”时生效。“只换数字”基于当前舞台中的产品和句式。无随机数字时禁用“只换数字”并显示原因，数字能力按模板而非产品型号判断。空白产品按杯子生成。11 个快捷物品按现有样式自然换行；四种口吻加自由发挥，按产品类型匹配专属句式。没有表格、弹层或下拉菜单。

复制共用 App.copy 和一个 role=status 反馈区；失败提示手动选中文案复制，复制期间禁用复制按钮。历史只保留本页最近三句，刷新清空，不持久存储。生成同步完成，无加载动画。

所有按钮有 hover、active、focus-visible；radio 由浏览器提供方向键行为。切换文案 240ms 淡入；尊重 reduced-motion。滚动条由全局 CSS 提供普通、hover、active、forced-colors 样式。

## Do's and Don'ts
- 文案只写用户需要的产品和操作语言。
- 仅数字在舞台中强调，配色从 CSS 变量复用。
- 不加入登录、后端、模型调用、收费、复杂导出。
- 不将虚构数字或原创句式当作真实发布会引用。
