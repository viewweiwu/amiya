# AySearchTable

![amiya AySearchTable](https://misc.hzzcckj.cn/upload/image/202011/ac6556223800000.png)

[查看大图](https://misc.hzzcckj.cn/upload/image/202011/ac6556223800000.png)

1. 自带 AySearch、AyTable、AyDialogForm（1 个）。
2. 下可能会使用到 AyCtrl、AyAction 等。
3. AySearch、AyTable 只在内部，不需要用户写。
4. 点击 新增、编辑、详情 按钮，会打开 AyDialogForm，平时都是隐藏看不见的。

## 示例：增删改查

<code src="./AySearchTableDemo.tsx" />

## 弹窗改抽屉

```tsx
import React from 'react'
import { AySearchTable, AyAction, AyCtrl, AySearchTableField } from 'amiya'
import { AyTableCtrlField } from 'amiya/lib/AyTable/ay-table'
import { listApi, addApi, updateApi, deleteApi, professionOptions } from '../api'
import 'antd/dist/antd.min.css'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cname',
    search: {},
    dialog: {
      required: true
    }
  },
  {
    title: '英文名',
    key: 'name',
    search: {},
    dialog: {
      required: true
    }
  },
  {
    title: '初始HP',
    key: 'defaultHp',
    dialog: {}
  },
  {
    title: '初始攻击',
    key: 'defaultAtk',
    dialog: {}
  },
  {
    title: '职业',
    key: 'profession',
    type: 'select',
    search: {},
    dialog: {},
    options: professionOptions
  },
  {
    title: '上线时间',
    key: 'createDate',
    table: {
      renderType: 'datetime'
    }
  },
  {
    title: '上线开始时间',
    key: 'startDate',
    type: 'date',
    search: {},
    table: {
      hidden: true
    }
  },
  {
    title: '上线结束时间',
    key: 'endDate',
    type: 'date',
    search: {},
    table: {
      hidden: true
    }
  }
]

const CtrlField: AyTableCtrlField = {
  width: 200,
  render: (value, record) => {
    return (
      <AyCtrl>
        <AyAction record={record} action="update">
          编辑
        </AyAction>
        <AyAction record={record} action="delete">
          删除
        </AyAction>
        <AyAction record={record} action="view">
          详情
        </AyAction>
      </AyCtrl>
    )
  }
}

export default function Demo() {
  return (
    <AySearchTable
      title="表格标题"
      selectionType="checkbox"
      api={listApi}
      fields={fields}
      ctrl={CtrlField}
      deleteApi={deleteApi}
      dialogFormExtend={{
        drawer: true,
        fields: fields,
        updateApi,
        addApi
      }}
    >
      <AyAction action="batch-delete">批量删除</AyAction>
      <AyAction action="add">新增</AyAction>
    </AySearchTable>
  )
}
```

## 参数

| 参数名             | 说明                                                              | 参数类型                                        | 默认值 |
| ------------------ | ----------------------------------------------------------------- | ----------------------------------------------- | ------ |
| title              | 表格标题，显示在左上角的文字                                      | string \| ReactNode                             | ''     |
| fields             | 配置项                                                            | Array<[AySearchTableField][aysearchtablefield]> | []     |
| selectionType      | 是否开启勾选                                                      | 'checkbox'                                      | -      |
| children           | 放在右上角的按钮                                                  | ReactNode                                       | -      |
| api                | 列表分页接口                                                      | Promise                                         | -      |
| deleteApi          | 批量删除接口                                                      | Promise                                         | -      |
| data               | 表格静态数据，不希望表格做请求，自己定义数据。                    | Array<Record\>                                  | -      |
| ctrl               | 列表每一行后面数据跟着的按钮渲染。                                | AySearchTableField                              | -      |
| onSelectionChange  | 选项改变事件                                                      | (selection: Array<Record\>): void               | -      |
| rowKey             | 列表每一行的唯一标志                                              | string                                          | 'id'   |
| selectShowKey      | 批量删除,勾选时，在表格顶部会有数字，点击数字可以看到选项的名称。 | string                                          | 'name' |
| dialogFormExtend   | dialog form 的配置。                                              | AyDialogFormProps                               | {}     |
| scrollX            | 滚动的 X 轴数值。                                                 | number                                          | -      |
| filterData         | 列表数据过滤。                                                    | (data: Object) => Object                        | -      |
| beforeSearch       | 提交前过滤。                                                      | (data: Object) => Object                        | -      |
| onExpand           | 展开事件。                                                        | (expanded: boolean, record: Record) => void     | -      |
| pagination         | 分页参数。                                                        | antd 分页一致                                   | -      |
| center             | 节点插入在查询和表格之间。                                        | ReactNode                                       | -      |
| onLoad             | 表格查询完成监听。                                                | (records: Array<Record\>, data: any) => void    | -      |
| searchVisible      | 查询区域是否展。                                                  | boolean                                         | true   |
| tableExtend        | table 其它属性。                                                  | Object                                          | {}     |
| extendSearchParams | table 查询时额外查询参数。                                        | Object                                          | {}     |
| after              | 可以在表格底部插入 AyAction                                       | ReactNode                                       | -      |

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

| 参数名         | 说明                                           | 参数类型                                                           | 默认值   |
| -------------- | ---------------------------------------------- | ------------------------------------------------------------------ | -------- |
| title          | 标题                                           | string                                                             | -        |
| key            | 唯一 key，dataIndex 默认会跟次值一样           | string                                                             | -        |
| options        | 可选项，展示会根据这个值变化                   | Array<[Option][option]>                                            | -        |
| hidden         | 隐藏这一列                                     | boolean                                                            | -        |
| render         | 自定义展示列                                   | (text: ReactNode, record: AnyKeyProps, index: number) => ReactNode | -        |
| renderType     | 美化展示列，可以[全局注册][rendertype]         | 'datetime'                                                         | 'string' | - |
| filter         | 筛选                                           | boolean                                                            | -        |
| filterMultiple | 筛选是否支持多选                               | boolean                                                            | false    |
| sort           | 排序                                           | boolean                                                            | -        |
| sortOrder      | 排序权重，越大越重，不设置则表示不需要多列筛选 | number                                                             | -        |

## Option 参数

| 参数名   | 说明     | 参数类型                | 默认值 |
| -------- | -------- | ----------------------- | ------ |
| label    | 显示选项 | string \| number        | -      |
| value    | 值       | any                     | -      |
| disabled | 是否禁用 | boolean                 | -      |
| children | 子元素   | Array<[Option][option]> | -      |

[1]: ./table/全局扩展按钮配置
[option]: ./table#option-参数
[aysearchtablefield]: ./table#aysearchtablefield
[rendertype]: ./table/自定义渲染列#更加丰富的全局注册
[ayformfield]: ./form#ayformfield-参数
[aytablefield]: ./table#aytablefield
