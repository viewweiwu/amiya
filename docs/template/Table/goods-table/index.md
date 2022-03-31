---
toc: false
---

# 商品表格

<Badge>AySearchTable</Badge><Badge>useOptions</Badge><Badge>AyDialogForm</Badge>

复杂程度：⭐️⭐️⭐️

Amiya 的组件是可以封装的，让它更加适合你的项目。

useOriginPagination 可以让 antd `Table` 出现跨行时，不再自动分页。

`AySearchList` 导出的 `Selection`、`SelectionAll`其实也可以在`AySearchTable` 里面使用。

antd `Table` 开启选项时，勾选的那一列没有 onCell 配置，所以可以使用 `Selection`、`SelectionAll` 来控制选中。

关于 antd Table checkbox 不能跨行和 antd 表格自动分页特性不能关，官方似乎并不打算支持，相关 issue [#3505](https://github.com/ant-design/ant-design/issues/3505) [#9160](https://github.com/ant-design/ant-design/issues/9160)

<code src="./page/index.tsx" />
