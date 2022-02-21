---
order: 1
---

# 更新日志

## 0.48.1

1. fix: 修复 `AySearchTable` `Alert` 样式缺少。

## 0.48.0

1. feat: `AyDialog` 支持 `onClose` 方法。
2. feat: `AyDialog` 的 `setVisible` 变成可选的。

## 0.47.1

1. feat: 优化 `Form` `render` 的次数。
2. fix: 修复 `AyForm`、`AyButton`、`AyGroupCard` console 警告。
3. fix: 修复大部分文档页面的 console 报错。

## 0.47.0

1. feat: 添加 `AyCardGroup` 使用。
2. fix: `AyForm` `password` type `readonly` 模式下显示 \*。
3. fix: `AyForm` 有子元素时 `required` 错误的校验必填。

## 0.46.0

1. feat: 支持 `AyForm` 表单的其它属性直接平铺。
2. fix: 修复 `AySearchTable`、`AySearchList` 的 `Fields` 子元素不生效。
3. fix: 修复 `AyDialogForm` 文件引入。

## 0.45.2

1. fix: 修复 `AySearchTable` 的 `field` 添加 `dialog` 属性时，受原本表格属性污染。

## 0.45.1

1. fix: `AySearch` 在小屏幕时，不会隐藏溢出项了。
2. fix: `AySearch` 对 `date`、`date-range` 的 `title` 设置不在生效。

## 0.45.0

1. feat: 可以在 `AySearchTable` 外面直接使用 table 属性了。
2. feat: 在外层元素 className="full-width" 的情况下，AyForm 的 max-width 会填充 100% 宽度。
3. feat: `AyForm` type 添加 `tag-group` 类型
4. feat: `AySearch` 支持平铺模式。
5. fix: 修复 `AyForm` type 为 `card` 时样式错乱，且默认现在 `span` 值是 24。
6. fix: `AyForm` type 为 `slider` 的默认值由 null 调整为 0。

## 0.44.0

1. feat: `AySearchTable`、`AyForm` 的 Field 支持 `tooltip` 属性。
2. feat: `AySearchTable`、`AySearchList` 的 extra 按钮样式优化。
3. feat: 重写 `AySearchTable` 扩展 icon。
4. fix: 样式名称修复。

## 0.43.0

1. feat: `AyForm` FormType 为 `number` 和 `percent` 取消默认的 `placeholder`。
2. feat: `AyForm`、`AyDialogForm` 的表单类型取消默认 100% 宽度，`AySearch` 还是会的。
3. feat: `AyForm` FormType 新增 `slider`、`Rate` 两种类型。
4. feat: `AyForm` 默认 span 改为 24。
5. feat: `AyForm` 取消默认右边距。
6. feat: `AySearchTable` renderType 新增 `unit`、`status` 两种类型。

```less
// 如果还是需要填充宽度的，请在全局样式添加下面这段。 另外 0.45.0 版本后可在 Form 元素添加 className="full-width" 来让表单元素宽度填满
.ay-form {
  .max-width: 100%;
}
```

## 0.42.0

1. feat: AyButton 支持 Tooltip。
2. feat: AyButton、AyCtrl 支持次级按钮模式。
3. feat: 支持 AyCtrl 按钮之间的间距控制。
4. feat: 优化 AyCtrl 的默认按钮间距。

## 0.41.1

`2022-01-20`

1. fix: 修复 AyForm 引用错误。

## 0.41.0

`2022-01-19`

1. fix: 修复 editable-confirm 没有支持 rowKey 属性。
2. fix: 修复 AySearchTable type 为 group 时的错误提示。
3. feat: 现在可以直接设置 search: true, dialog: true, table: false 这种写法了。
4. feat: 可以使用 AyFields、AyField 写法来写 `AySearchTable`、`AySearchList`、 `AyForm`、`AyDialogForm`，支持 JSX / TSX 语法糖。
5. feat: `AySearchTable`、`AySearchList` 如果没有查询选项，会自动关闭查询区域了。

## 0.40.3

`2022-01-11`

1. fix: 矫正 AyCtrl 对 AyButton 和 AyAction 的判定。

## 0.40.2

`2022-01-11`

1. feat: AyCtrl 只对子元素是 AyButton、AyCtrl 做转换，其它元素不转换。

## 0.40.1

`2022-01-10`

1. fix: 修复 AySearchTable & AySearchList 的 autoload 设置为 false 时，reset 方法无效。

## 0.40.0

`2022-01-05`

1. fix: AyFrom hidden: false || visible: false 状态下 rules 属性无效，避免隐藏了还要必填

## 0.39.0

1. fix: 修复 AySearchTable、AySearchList，'date-range' 设置 startKey、endKey 无效的情况

## 0.38.1

`2021-12-23`

1. fix: 修复 AySearchList 缺少 addSelection， setSelection 方法。

## 0.38.0

`2021-12-22`

1. feat: AySearch 支持全局设置默认展示行数
2. feat: AyDialogForm 可直接调用 Form 的方法
3. fix: AyDialogForm 修复某些情况会携带 "\_\_" 开头的 key

## 0.37.3

`2021-11-23`

1. fix: 修复 AySearchTable 设置完默认分页后选择分页无效。

## 0.37.1

`2021-11-11`

1. fix: 修复 AySearch 跨格时，有可能会少展示一个查询项 的 bug。

## 0.37.0

`2021-11-11`

1. fix: 修复表格全屏按钮顶部查询区域尺寸宽度变化。

## 0.36.0

`2021-11-03`

1. doc: 文档更新。
2. feat: 开放 AySearch 组件文档。
3. feat: AySearch 不同的容器宽度会有不同的展示形式，[详情](./components/form/ay-search)
4. feat: 更新 AySearchTable 的样式。

## 0.35.0

1. doc: 文档更新。
2. feat: AyAction 新增 `detailApi` `detailParams` Api。

## 0.34.0

1. feat: 添加表格勾选控制

## 0.33.1

1. feat: 支持更多的主题色。

## 0.33.0

1. doc: 新文档。
2. delete: 删除 addFieldListener，removeFieldListener 方法。
3. feat: 添加新的 renderType：html、tags。

## 0.32.1

1. fix: 修复输入查询参数后，直接点击排序或筛选，请求缺少输入的参数。

## 0.32.0

1. feat: AyAction 支持 successMsg。

## 0.31.0

1. feat: 支持 umd 引入方式。
2. fix: 修复高版本 antd 下，文档筛选出错。

## 0.30.0

1. feat: AySearchList 支持使用 listHeader 插入元素。
1. feat: AySearchTable 支持使用 tableHeader 插入元素。

## 0.29.2

1. fix: 修复全屏后 tooltip 不消失。
2. fix: 默认 ay-form 溢出不隐藏。

## 0.29.1

1. fix: 支持 AySearchList onParamsChange 事件。

## 0.29.0

1. feat: 支持 AySearchTable onParamsChange 事件。
1. fix: 修复 select 类型 readonly 状态下 缺少空值展示。

## 0.28.3

1. fix: 修复 AyButton disalbed 不能唤起 Popconfirm。

## 0.28.2

1. fix: 修复 renderContent record 永远为空的 bug。

## 0.28.1

1. fix: AyDialog 支持 footer 隐藏。

## 0.28.0

1. feat: AyDialogForm 支持失败监听。[#60](https://github.com/viewweiwu/amiya/issues/60)

## 0.27.0

1. feat: 支持表格默认属性设置。[#59](https://github.com/viewweiwu/amiya/issues/59)

## 0.26.1

1. fix: 修复 AySearchList 默认间距。

## 0.26.0

1. feat: 添加 AySearchList 支持。
2. feat: 补充 AySearchList 使用文档。

## 0.25.0

1. feat: 添加 AyDialogForm 文档。
2. feat: 支持 AyDialog 扩展参数。

## 0.24.0

1. fix: 带有 'am' 样式的全部替换成 'ay'。
2. feat: AySearch 支持 formExtend 属性。[#58](https://github.com/viewweiwu/amiya/issues/58)

## 0.23.3

1. feat: required 默认添加上 `请输入` 文本。
2. feat: select `mode=multiple` 支持显示。

## 0.23.2

1. feat: AySearch 支持 span 设置。

## 0.23.1

1. fix: 查询提交会错误清空 0。[#57](https://github.com/viewweiwu/amiya/issues/57)

## 0.23.0

1. feat: 支持监听重置按钮事件。[#56](https://github.com/viewweiwu/amiya/issues/56)

## 0.22.2

1. fix: AyForm type 为 date-range 时选择会报错。

## 0.22.0

1. feat: AyForm 支持子元素获取数据。[#55](https://github.com/viewweiwu/amiya/issues/55)

## 0.21.0

1. feat: AySearchTable 添加可编辑表格的类型扩展。[#54](https://github.com/viewweiwu/amiya/issues/54)

## 0.20.0

1. feat: 添加 AySearchTable、 defaultFilterValue、defaultSortValue 配置。[#52](https://github.com/viewweiwu/amiya/issues/53)
2. feat: 添加 setSortsValue、setFiltersValue、getApiParams 方法。[#53](https://github.com/viewweiwu/amiya/issues/53)

## 0.19.2

1. fix: 修复 AySearchTable reset 方法，刷新会清空不携带查询参数的 bug。[#52](https://github.com/viewweiwu/amiya/issues/52)

## 0.19.1

1. fix: 修复 doLayout 布局，会刷新掉 search 值的 bug。[#48](https://github.com/viewweiwu/amiya/issues/48)
2. fix: 日期格式化秒钟恢复正常。[#49](https://github.com/viewweiwu/amiya/issues/49)

## 0.19.0

1. fix: 解决表格 pagition = false 不生效。
2. feat: 表格支持 clearFilters 方法。[#47](https://github.com/viewweiwu/amiya/issues/47)
3. feat: 表格支持 clearSorts 方法。[#47](https://github.com/viewweiwu/amiya/issues/47)

## 0.18.1

1. fix: 表格支持 doLayout 方法，用来刷新查询区域。

## 0.18.0

1. feat: 支持表格单选。

## 0.17.1

1. fix: 修复 date 类型未格式化的 bug。[#45](https://github.com/viewweiwu/amiya/issues/45)

## 0.17.0

1. feat: 表格默认添加分页跳转。[#42](https://github.com/viewweiwu/amiya/issues/42)
2. feat: 表格筛选与排序之后默认回到第一页。[#43](https://github.com/viewweiwu/amiya/issues/43)

## 0.16.1

1. fix: 表格 data 支持响应。[#41](https://github.com/viewweiwu/amiya/issues/41)

## 0.16.0

1. fix: 修复 AyForm type card 子元素无法正确的格式化。[#40](https://github.com/viewweiwu/amiya/issues/40)
2. feat: 支持 AyForm type date-range 日期格式化。[#40](https://github.com/viewweiwu/amiya/issues/40)

## 0.15.0

1. feat: 支持表格禁用选项。[#39](https://github.com/viewweiwu/amiya/issues/39)
2. feat: feat: AyDialog 支持样式设置。[#38](https://github.com/viewweiwu/amiya/issues/38)

## 0.14.2

1. fix: 表格支持不自动请求。[#35](https://github.com/viewweiwu/amiya/issues/35)

## 0.14.1

1. fix: extendSearchParams 参数设置应该只需要设置 search 层。[#34](https://github.com/viewweiwu/amiya/issues/34)

## 0.14.0

1. feat: 支持 action 传递 params 参数。[#32](https://github.com/viewweiwu/amiya/issues/32)

## 0.13.2

1. fix: 修复引用 bug。

## 0.13.1

1. feat: 支持表格可编辑行。[#31](https://github.com/viewweiwu/amiya/issues/31)

## 0.13.0

1. feat: 支持单元格可以编辑。[#31](https://github.com/viewweiwu/amiya/issues/31)

## 0.12.0

1. feat: 支持组合表单项，支持 input、input-group 两种类型。[#21](https://github.com/viewweiwu/amiya/issues/21)

## 0.11.1

1. fix: 修复 DialogForm 修改 fields 刷新无效。[#30](https://github.com/viewweiwu/amiya/issues/30)
2. fix: 支持表格扩展列默认隐藏。

## 0.11.0

1. feat: 支持表格设置高度。[#28](https://github.com/viewweiwu/amiya/issues/28)

## 0.10.0

1. feat: 支持表格 hidden 可以是个 function。[#25](https://github.com/viewweiwu/amiya/issues/26)

## 0.9.4

1. fix: 修复 AyDialogForm 不能响应 renderContent。[#24](https://github.com/viewweiwu/amiya/issues/24)
2. fix: 修复 TS 联想。

## 0.9.3

1. fix: 修复导出目录。

## 0.9.2

1. fix: 补充 amiya 联想类型。[#23](https://github.com/viewweiwu/amiya/issues/23)

## 0.9.1

1. fix: 修复 `searchVisible: false` 的情况下，无法正确分页的问题。[#18](https://github.com/viewweiwu/amiya/issues/18)

## 0.9.0

1. feat: 表格支持在底部插入按钮。[#17](https://github.com/viewweiwu/amiya/issues/17)

## 0.8.2

1. fix: 修复表格设置了 title 和 search 都隐藏，标题区域还存在。[#16](https://github.com/viewweiwu/amiya/issues/16)

## 0.8.1

1. fix: 修复表格 ellipsis 没有作用。[#15](https://github.com/viewweiwu/amiya/issues/15)

## 0.8.0

1. feat: 添加可折叠的组件 AyCard。[#13](https://github.com/viewweiwu/amiya/issues/13)
2. feat: 支持用卡片分组表单，FormType 支持 card。[#13](https://github.com/viewweiwu/amiya/issues/13)
3. feat: AyForm 支持 gutter 属性。[#14](https://github.com/viewweiwu/amiya/issues/13)

## 0.7.1

1. fix: 修复 AyCtrl 在子元素第一个渲染为 null 时，其它按钮跟着消失的 bug。[#12](https://github.com/viewweiwu/amiya/issues/12)

## 0.7.0

1. feat: 支持 action onFinish 事件回调。[#11](https://github.com/viewweiwu/amiya/issues/11)

## 0.6.0

1. feat: 支持设置按钮权限。[#10](https://github.com/viewweiwu/amiya/issues/10)
2. feat: 支持 formLayout 设置。[#9](https://github.com/viewweiwu/amiya/issues/9)

## 0.5.0

1. feat: 支持表头合并。[#8](https://github.com/viewweiwu/amiya/issues/8)
2. feat: 支持过滤与排序。[#7](https://github.com/viewweiwu/amiya/issues/7)

## 0.4.0

1. feat: AySearchTable 支持把表单项放在顶部右侧。[#4](https://github.com/viewweiwu/amiya/issues/4)
2. feat: 去掉 AySearchTable 条数展示。
3. feat: AyForm 新增 search type。[#3](https://github.com/viewweiwu/amiya/issues/3)
4. feat: AySearchTable 支持传递额外查询条件[#6](https://github.com/viewweiwu/amiya/issues/6)
5. fix: 修复 AySearchTable rules 报错。[#5](https://github.com/viewweiwu/amiya/issues/5)

## 0.3.3

1. fix: 修复表格定位出错。[#2](https://github.com/viewweiwu/amiya/issues/2)

## 0.3.2

1. fix: AyForm readonly 状态下 setFieldsValue 渲染延迟。[#1](https://github.com/viewweiwu/amiya/issues/1)

## 0.3.1

1. fix: AyCtrl max 数量刚好等于 children 数量时，不需要折叠。

## 0.3.0

1. feat: AyCtrl 支持折叠。

## 0.2.0

1. feat: 支持表格全局注册 registerTableReder。

## 0.1.2

1. fix: 修复 AySearchTable TS 报错。

## 0.1.1

1. feat: 支持默认网页全屏。

## 0.1.0

1. feat: 添加表格 extra 按钮。
2. feat: 添加表格 tableFooterExtraOnly 展示。

## 0.0.x

... 此前正在基建，省略 30 个版本。
