---
toc: false
---

# 京东订单页

<Badge>AySearchList</Badge>
<Badge>AyTagGroup</Badge>

复杂程度：⭐️⭐️

仔细观察京东的订单列表，有一点点的复杂：

1. 有 Tab 筛选，有两个选项样式特殊，还是得考选择 CSS 解决。
2. Tab 能切，`订单回收站` 选择后还会站展示特殊信息，然后把查询区域隐藏了。
3. 有 Tag 筛选，是默认隐藏的，需要点 `高级` 才能展示出来。
4. 一条数据就是一个表格，表格状态很多，需要考虑拆分订单、分阶段支付、多组商品的显示情况。
5. 表头有筛选，非传统选择框样式。
6. 表格内容虽有表格的样子，但用表格实现太复杂，这里选择 Row、Col 布局。

<code src="./page/index.tsx" />
