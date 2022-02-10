---
toc: false
---

# AySearchTable 查询表格

<!-- ![amiya AySearchTable](https://misc.hzzcckj.cn/upload/image/202011/ac6556223800000.png) -->

表格顶部使用了 `AySearch`，可以点击[这里](./form/ay-search)看详细介绍。

## 示例：增删改查

<code src="./AySearchTableDemo.tsx" />

对示例代码里的 listApi 有疑问或者想要自定义？ 🤔️ 可以点[这里](./global/set-default-search-filter)查看请求提交处理，点[这里](./global/set-default-data-filter)查看请求返回处理。

## JSX / TSX 语法糖 <Badge>0.41.0</Badge>

<code src="./AySearchTableDemoTsx.tsx" />

```diff
-const fields: Array<AySearchTableField> = [
-  {
-    title: '头像',
-    key: 'icon',
-    width: 80,
-    align: 'center',
-    renderType: 'image',
-    props: {
-      width: 70
-    }
-  },
-  {
-    title: '姓名',
-    key: 'cn',
-    render: (text: string, record: Record) => {
-      return (
-        <div>
-          <div>{record.cn}</div>
-          <div>{record.en}</div>
-          <div>{record.jp}</div>
-        </div>
-      )
-    },
-    search: true,
-    dialog: {
-      required: true
-    }
-  },
-  {
-    title: '英文名',
-    key: 'en',
-    hidden: true,
-    search: true,
-    dialog: {
-      required: true
-    }
-  },
-  // ...
-]

<AySearchTable
  title="表格标题"
  selectionType="checkbox"
  api={listApi}
  ctrl={ctrl}
  rowKey="sort_id"
- fields={fields}
  selectShowKey="cn"
  deleteApi={deleteApi}
  dialogFormExtend={{
    updateApi,
    addApi
-   fields: fields
  }}
  >
+ <AyFields>
+   <AyField
+     title="头像"
+     key="icon"
+     width={80}
+     align="center"
+     renderType="image"
+     props={{
+       width: 70
+     }}
+   />
+   <AyField
+     title="姓名"
+     key="cn"
+     search
+     render={(text: string, record: Record) => {
+       return (
+         <div>
+           <div>{record.cn}</div>
+           <div>{record.en}</div>
+           <div>{record.jp}</div>
+         </div>
+       )
+     }}
+   />
+   <AyField title="英文名" key="en" search dialog hidden />
+   {// ...}
+ </AyFields>
  <AyAction action="batch-delete">批量删除</AyAction>
  <AyAction action="add">新增</AyAction>
</AySearchTable>
```

只是换了另一种风格写 `fields` 而已，请不要用其它元素包裹住 `AyFields` 和 `AyField`。

## 参数

| 参数名             | 说明                                                                                                                                         | 参数类型                                        | 默认值 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------ |
| title              | 表格标题，显示在表格左上角的标题文字。                                                                                                       | string \| ReactNode                             | ''     |
| fields             | 配置项，可决定表格、查询项、弹窗表单的配置。                                                                                                 | Array<[AySearchTableField][aysearchtablefield]> | []     |
| selectionType      | 是否开启勾选，checkbox：多选、radio：单选，单选表格的使用可以请看[这里][单选表格]，开启后需要指定 rowKey。                                   | 'checkbox' \| 'radio'                           | -      |
| children           | 子元素会被放在表格右上角。                                                                                                                   | ReactNode                                       | -      |
| api                | 列表分页接口，会传递分页和参数参数，发现跟接口风格不一致，点[这里][自定义请求]查看自定义方式。                                               | Promise                                         | -      |
| deleteApi          | 批量删除接口。                                                                                                                               | Promise                                         | -      |
| data               | 表格静态数据，不希望表格做请求，自己定义数据。                                                                                               | Array<Record\>                                  | -      |
| ctrl               | 列表每一行后面数据跟着的按钮渲染。                                                                                                           | AySearchTableField                              | -      |
| rowKey             | 列表每一行的唯一标志。                                                                                                                       | string                                          | 'id'   |
| selectShowKey      | 批量删除，勾选时，在表格顶部会有数字，点击数字可以看到选项的名称。                                                                           | string                                          | 'name' |
| dialogFormExtend   | [AyDialogForm][aydialogform] 的扩展配置。                                                                                                    | AyDialogFormProps                               | {}     |
| scrollX            | 滚动的 X 轴数值。                                                                                                                            | number                                          | -      |
| height             | 表格滚动高度。                                                                                                                               | number                                          | -      |
| filterData         | 列表数据过滤。                                                                                                                               | (data: Object) => Array<Record\>                | -      |
| beforeSearch       | 提交前过滤，希望请求前改变参数可使用此方法。                                                                                                 | (data: Object) => Object                        | -      |
| pagination         | 分页参数。                                                                                                                                   | antd 分页一致                                   | -      |
| center             | 把元素插入到查询和表格之间。                                                                                                                 | ReactNode                                       | -      |
| listHeader         | AySearchList 在列表头部插入元素。                                                                                                            | ReactNode                                       | -      |
| tableHeader        | AySearchTable 在列表头部插入元素。                                                                                                           | ReactNode                                       | -      |
| searchVisible      | 查询区域是否展示。                                                                                                                           | boolean                                         | true   |
| tableExtend        | table 的扩展配置。                                                                                                                           | Object                                          | {}     |
| extendSearchParams | 请求时额外携带的参数。                                                                                                                       | Object                                          | {}     |
| after              | 在表格底部插入元素。                                                                                                                         | ReactNode                                       | -      |
| autoload           | 表格渲染时是否自动发起请求。                                                                                                                 | booelan                                         | true   |
| onExpand           | 展开事件。                                                                                                                                   | (expanded: boolean, record: Record) => void     | -      |
| onLoad             | 表格查询完成监听。                                                                                                                           | (records: Array<Record\>, data: any) => void    | -      |
| onParamsChange     | 查询参数变化事件，包括分页。                                                                                                                 | (searchPamras: Object) => void                  | -      |
| onSelectionChange  | 选项改变事件。                                                                                                                               | (selection: Array<Record\>): void               | -      |
| rowSelection       | 表格选项设置，可以用来设置表格是否[禁用][禁用表格选项]，请不要设置 type、selectedRowKeys、onSelect、onSelectAll 方法，这会影响到原本的设置。 | -                                               | -      |

extra 右侧扩展按钮配置参考[这里][1]。

## AySearchTableField

最为常见的 Field，是每个列表页面都会用到的参数。

| 参数名         | 说明                                                                                        | 参数类型                                                              | 默认值 | 版本   |
| -------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------ | ------ |
| title          | 标题。                                                                                      | string                                                                | -      | -      |
| key            | 唯一 key，dataIndex 默认会跟这个值一样。                                                    | string                                                                | -      | -      |
| options        | 可选项，展示会根据这个值变化。                                                              | Array<[Option][option]>                                               | -      | -      |
| hidden         | 是否隐藏这一列。                                                                            | boolean \| () => boolean                                              | -      | 0.45.0 |
| render         | 自定义展示列。                                                                              | (text: ReactNode, record: AnyKeyProps, index: number) => ReactNode    | -      | 0.45.0 |
| renderType     | 美化展示列，扩展方法看[这里][rendertype]。                                                  | string                                                                | -      | 0.45.0 |
| filter         | 设置 true 会以 options 作为筛选项出现在表头。                                               | boolean                                                               | -      | 0.45.0 |
| filterMultiple | 筛选是否支持多选，需要先设置 `filter: true`。                                               | boolean                                                               | false  | 0.45.0 |
| sort           | 排序。                                                                                      | boolean                                                               | -      | 0.45.0 |
| sortOrder      | 排序权重，越大越重，不设置则表示不需要多列筛选，需要先设置 `sort: true`。                   | number                                                                | -      | 0.45.0 |
| editable       | 表格是否可以编辑，具体示例看[这里][可编辑表格]。                                            | boolean                                                               | -      | 0.45.0 |
| before         | (仅 `editable` 可用), 渲染前置元素，[使用案例][可编辑表格]                                  | ({ record: Record, field: Field, refreshRow: Function }) => ReactNode | -      | 0.45.0 |
| after          | (仅 `editable` 可用), 渲染后置元素，[使用案例][可编辑表格]                                  | ({ record: Record, field: Field, refreshRow: Function }) => ReactNode | -      | 0.45.0 |
| children       | 嵌套表格时使用。                                                                            | Array<[AyTableField][aytablefield]>                                   | -      | 0.45.0 |
| search         | AySearch 需要的扩展参数，里面的属性比外面的属性优先级更高，为 true 则在查询区域展示输入框。 | [AyFormField][ayformfield] \| boolean                                 | -      | -      |
| dialog         | AyDialogForm 需要的扩展参数，里面的属性比外面的属性优先级更高，为 true 则在弹窗展示输入框。 | [AyFormField][ayformfield] \| boolean                                 | -      | -      |
| table          | AyTable 需要的扩展参数，里面的属性比外面的属性优先级更高，为 false 则不在表格展示。         | [AyTableField][aytablefield] \| boolean                               | -      | -      |

```typescript
// 示例
const fields: Array<AySearchTableField> = [
  {
    title: '', // 表格、查询、编辑 的标题
    key: '', // 表格、查询、编辑 的 key
    type: '', // 查询、编辑 的 FormType
    options: [], // 表格、查询、编辑 的  选项
    // 表示查询区域内出现该元素，默认是输入框
    search: true,
    // 表示弹窗内出现该元素，默认是输入框
    dialog: true
  }
]
```

## AyTableField

| 参数名         | 说明                                                                      | 参数类型                                                              | 默认值   |
| -------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------- |
| title          | 标题。                                                                    | string                                                                | -        |
| key            | 唯一 key，dataIndex 默认会跟这个值一样。                                  | string                                                                | -        |
| options        | 可选项，展示会根据这个值变化。                                            | Array<[Option][option]>                                               | -        |
| hidden         | 是否隐藏这一列。                                                          | boolean \| () => boolean                                              | -        |
| render         | 自定义展示列。                                                            | (text: ReactNode, record: AnyKeyProps, index: number) => ReactNode    | -        |
| renderType     | 美化展示列，扩展方法看[这里][rendertype]。                                | string                                                                | 'string' | - |
| filter         | 设置 true 会以 options 作为筛选项出现在表头。                             | boolean                                                               | -        |
| filterMultiple | 筛选是否支持多选，需要先设置 `filter: true`。                             | boolean                                                               | false    |
| sort           | 排序。                                                                    | boolean                                                               | -        |
| sortOrder      | 排序权重，越大越重，不设置则表示不需要多列筛选，需要先设置 `sort: true`。 | number                                                                | -        |
| editable       | 表格是否可以编辑，具体示例看[这里][可编辑表格]。                          | boolean                                                               | -        |
| before         | (仅 `editable` 可用), 渲染前置元素，[使用案例][可编辑表格]                | ({ record: Record, field: Field, refreshRow: Function }) => ReactNode | -        |
| after          | (仅 `editable` 可用), 渲染后置元素，[使用案例][可编辑表格]                | ({ record: Record, field: Field, refreshRow: Function }) => ReactNode | -        |
| children       | 嵌套表格时使用。                                                          | Array<[AyTableField][aytablefield]>                                   | -        |

## Option 参数

| 参数名   | 说明     | 参数类型                | 默认值 |
| -------- | -------- | ----------------------- | ------ |
| label    | 显示选项 | string \| number        | -      |
| value    | 值       | any                     | -      |
| disabled | 是否禁用 | boolean                 | -      |
| children | 子元素   | Array<[Option][option]> | -      |

## Method 方法

| 方法名                                                                      | 说明                                                                                                                                 | 返回值                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| refresh()                                                                   | 重新发起请求。                                                                                                                       | -                                      |
| reset()                                                                     | 回到第一页，重新发起请求。                                                                                                           | -                                      |
| doLayout()                                                                  | 重新布局表格。                                                                                                                       | -                                      |
| clearFilters(keys: Array<String\>)                                          | 可以不传参数，不传则清空全部；传了则清空相同 key 的过滤值，即设置 filter 之后的值。                                                  | -                                      |
| clearSorts(keys: Array<String\>)                                            | 可以不传参数，不传则清空全部；传了则清空相同 key 的排序值，即设置 sort 之后的值。                                                    | -                                      |
| getSelection()                                                              | 获取所有勾选的行。                                                                                                                   | Array<Record\>                         |
| setSelection(selection: Array<Record\>)                                     | 设置选中行。                                                                                                                         | -                                      |
| addSelection(selection: Array<Record\>)                                     | 添加选中行。                                                                                                                         | -                                      |
| clearSelection()                                                            | 清空所有选中行。                                                                                                                     | -                                      |
| getTableData()                                                              | 获取表格当前数据。                                                                                                                   | Array<Record\>                         |
| getApiParams()                                                              | 获取表格请求前数据，不会发起请求，会经过 defaultSearchFilter、beforeSearch 方法过滤，即接口将要请求时的数据。                        | { pagination, filters, sorts, search } |
| setSortsValue(<br>Array<{ key: string, order: 'ascend' \| 'descend' }><br>) | 设置排序值，<span style="color: #f06">设置后会影响，并覆盖现有的排序值</span>，可用 `getApiParams()` 中的 `sorts` 来获得现有排序值。 | -                                      |
| setFiltersValue({ key: value })                                             | 设置筛选值。                                                                                                                         | -                                      |

[1]: ./global/set-search-table-default-value
[option]: ./table#option-参数
[formtype]: ./form#formtype
[aysearchtablefield]: ./table#aysearchtablefield
[rendertype]: ./table/custom-render#已全局注册
[ayformfield]: ./form#ayformfield-参数
[aytablefield]: ./table#aytablefield
[aydialogform]: ./form/ay-dialog-form
[禁用表格选项]: ./table/disabled-row
[单选表格]: ./table/radio-table
[可编辑表格]: ./table/edit-table
[自定义请求]: ./global/set-default-search-filter
