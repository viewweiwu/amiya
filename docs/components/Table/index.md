# AySearchTable

<!-- ![amiya AySearchTable](https://misc.hzzcckj.cn/upload/image/202011/ac6556223800000.png) -->

1. 自带 AySearch、AyTable、AyDialogForm（1 个）。
2. 下可能会使用到 AyCtrl、AyAction 等。
3. AySearch、AyTable 只在内部，不需要用户写。
4. 点击 新增、编辑、详情 按钮，会打开 AyDialogForm，平时都是隐藏看不见的。

## 示例：增删改查

<code src="./AySearchTableDemo.tsx" />

## 参数

| 参数名             | 说明                                                                                                                                    | 参数类型                                        | 默认值 |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------ |
| title              | 表格标题，显示在左上角的文字                                                                                                            | string \| ReactNode                             | ''     |
| fields             | 配置项                                                                                                                                  | Array<[AySearchTableField][aysearchtablefield]> | []     |
| selectionType      | 是否开启勾选，checkbox： 多选、radio：单选，单选表格的使用可以请看[这里][单选表格]                                                      | 'checkbox' \| 'radio'                           | -      |
| children           | 放在右上角的按钮                                                                                                                        | ReactNode                                       | -      |
| api                | 列表分页接口                                                                                                                            | Promise                                         | -      |
| deleteApi          | 批量删除接口                                                                                                                            | Promise                                         | -      |
| data               | 表格静态数据，不希望表格做请求，自己定义数据。                                                                                          | Array<Record\>                                  | -      |
| ctrl               | 列表每一行后面数据跟着的按钮渲染。                                                                                                      | AySearchTableField                              | -      |
| rowKey             | 列表每一行的唯一标志                                                                                                                    | string                                          | 'id'   |
| selectShowKey      | 批量删除,勾选时，在表格顶部会有数字，点击数字可以看到选项的名称。                                                                       | string                                          | 'name' |
| dialogFormExtend   | [AyDialogForm][aydialogform] 的配置。                                                                                                   | AyDialogFormProps                               | {}     |
| scrollX            | 滚动的 X 轴数值。                                                                                                                       | number                                          | -      |
| height             | 表格滚动高度。                                                                                                                          | number                                          | -      |
| filterData         | 列表数据过滤。                                                                                                                          | (data: Object) => Array<Record\>                | -      |
| beforeSearch       | 提交前过滤。                                                                                                                            | (data: Object) => Object                        | -      |
| pagination         | 分页参数。                                                                                                                              | antd 分页一致                                   | -      |
| center             | 节点插入在查询和表格之间。                                                                                                              | ReactNode                                       | -      |
| listHeader         | AySearchList 在列表头部插入元素。                                                                                                       | ReactNode                                       | -      |
| tableHeader        | AySearchTable 在列表头部插入元素。                                                                                                      | ReactNode                                       | -      |
| searchVisible      | 查询区域是否展。                                                                                                                        | boolean                                         | true   |
| tableExtend        | table 其它属性。                                                                                                                        | Object                                          | {}     |
| extendSearchParams | table 查询时额外查询参数。                                                                                                              | Object                                          | {}     |
| after              | 可以在表格底部插入 AyAction。                                                                                                           | ReactNode                                       | -      |
| autoload           | 表格渲染时自动发起请求。                                                                                                                | booelan                                         | true   |
| onExpand           | 展开事件。                                                                                                                              | (expanded: boolean, record: Record) => void     | -      |
| onLoad             | 表格查询完成监听。                                                                                                                      | (records: Array<Record\>, data: any) => void    | -      |
| onParamsChange     | 查询参数变化事件，包括分页                                                                                                              | (searchPamras: Object) => void                  | -      |
| onSelectionChange  | 选项改变事件                                                                                                                            | (selection: Array<Record\>): void               | -      |
| rowSelection       | 表格选项设置，可以用来设置表格是否[禁用][禁用表格选项]，请不要设置 type、selectedRowKeys、onSelect、onSelectAll，这会影响到原本的设置。 | -                                               | -      |

extra 右侧扩展按钮配置参考[此处][1]。

## AySearchTableField

最为常见的 Field，是每个列表页面都会用到的参数。

```typescript
const fields: Array<AySearchTableField> = [
  {
    title: '', // 表格、查询、编辑 的标题
    key: '', // 表格、查询、编辑 的 key
    type: '', // 查询、编辑 的 FormType
    options: [], // 表格、查询、编辑 的  选项
    // 定义在此处的优先级更高，如果没有，则使用外层的参数
    search: {
      position: 'more' // 如果写了此参数，该查询项会出现在表格右侧
    },
    // 定义在此处的优先级更高，如果没有，则使用外层的参数
    dialog: {},
    // 定义在此处的优先级更高，如果没有，则使用外层的参数
    table: {
      renderType: 'datetime' | string // 决定表格渲染方式
    }
  }
]
```

<hr />

| 参数名  | 说明                                                            | 参数类型                     | 默认值  |
| ------- | --------------------------------------------------------------- | ---------------------------- | ------- |
| title   | 名称                                                            | string                       | -       |
| key     | 唯一 key                                                        | string                       | -       |
| type    | 表单类型                                                        | [FormType][formtype]         | 'input' |
| options | 可选项                                                          | Array<[Option][option]>      | -       |
| search  | AySearch 需要的扩展参数，里面的属性比外面的属性优先级更高。     | [AyFormField][ayformfield]   | -       |
| dialog  | AyDialogForm 需要的扩展参数，里面的属性比外面的属性优先级更高。 | [AyFormField][ayformfield]   | -       |
| table   | AyTable 需要的扩展参数，里面的属性比外面的属性优先级更高。      | [AyTableField][aytablefield] | -       |

## AyTableField

| 参数名         | 说明                                                       | 参数类型                                                              | 默认值   |
| -------------- | ---------------------------------------------------------- | --------------------------------------------------------------------- | -------- |
| title          | 标题                                                       | string                                                                | -        |
| key            | 唯一 key，dataIndex 默认会跟次值一样                       | string                                                                | -        |
| options        | 可选项，展示会根据这个值变化                               | Array<[Option][option]>                                               | -        |
| hidden         | 隐藏这一列                                                 | boolean \| () => boolean                                              | -        |
| render         | 自定义展示列                                               | (text: ReactNode, record: AnyKeyProps, index: number) => ReactNode    | -        |
| renderType     | 美化展示列，可以[全局注册][rendertype]                     | string                                                                | 'string' | - |
| filter         | 筛选                                                       | boolean                                                               | -        |
| filterMultiple | 筛选是否支持多选                                           | boolean                                                               | false    |
| sort           | 排序                                                       | boolean                                                               | -        |
| sortOrder      | 排序权重，越大越重，不设置则表示不需要多列筛选             | number                                                                | -        |
| editable       | 表格是否可以编辑                                           | boolean                                                               | -        |
| before         | (仅 `editable` 可用), 渲染前置元素，[使用案例][可编辑表格] | ({ record: Record, field: Field, refreshRow: Function }) => ReactNode | -        |
| after          | (仅 `editable` 可用), 渲染后置元素，[使用案例][可编辑表格] | ({ record: Record, field: Field, refreshRow: Function }) => ReactNode | -        |

## Option 参数

| 参数名   | 说明     | 参数类型                | 默认值 |
| -------- | -------- | ----------------------- | ------ |
| label    | 显示选项 | string \| number        | -      |
| value    | 值       | any                     | -      |
| disabled | 是否禁用 | boolean                 | -      |
| children | 子元素   | Array<[Option][option]> | -      |

## Method 方法

| 方法名                                                                      | 说明                                                                                                                               | 返回值                                 |
| --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| refresh()                                                                   | 重新发起请求                                                                                                                       | -                                      |
| reset()                                                                     | 回到第一页，重新发起请求                                                                                                           | -                                      |
| doLayout()                                                                  | 重新布局表格                                                                                                                       | -                                      |
| clearFilters(keys: Array<String\>)                                          | 可以不传参数，不传则清空全部；传了则清空相同 key 的过滤值，即设置 filter 之后的值                                                  | -                                      |
| clearSorts(keys: Array<String\>)                                            | 可以不传参数，不传则清空全部；传了则清空相同 key 的排序值，即设置 sort 之后的值                                                    | -                                      |
| getSelection()                                                              | 获取所有选项                                                                                                                       | Array<Record\>                         |
| setSelection(selection: Array<Record\>)                                     | 设置选中行                                                                                                                         | -                                      |
| addSelection(selection: Array<Record\>)                                     | 添加选中行                                                                                                                         | -                                      |
| clearSelection()                                                            | 清空所有选中行                                                                                                                     | -                                      |
| getTableData()                                                              | 获取表格数据                                                                                                                       | Array<Record\>                         |
| getApiParams()                                                              | 获取表格请求前数据，不会发起请求，会经过 defaultSearchFilter、beforeSearch 方法过滤，即接口将要请求时的数据                        | { pagination, filters, sorts, search } |
| setSortsValue(<br>Array<{ key: string, order: 'ascend' \| 'descend' }><br>) | 设置排序值，<span style="color: #f06">设置后会影响，并覆盖现有的排序值</span>，可用 `getApiParams()` 中的 `sorts` 来获得现有排序值 | -                                      |
| setFiltersValue({ key: value })                                             | 设置筛选值                                                                                                                         | -                                      |

[1]: ./全局方法/set-search-table-default-value
[option]: ./table#option-参数
[formtype]: ./form#formtype
[aysearchtablefield]: ./table#aysearchtablefield
[rendertype]: ./table/自定义渲染列#已全局注册
[ayformfield]: ./form#ayformfield-参数
[aytablefield]: ./table#aytablefield
[aydialogform]: ./form/ay-dialog-form
[禁用表格选项]: ./table/禁用表格选项
[单选表格]: ./table/单选表格
[可编辑表格]: ./table/可编辑表格