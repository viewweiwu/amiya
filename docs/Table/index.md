# AySearchTable

## 示例：增删改查

<code src="./Demo.tsx" />

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
      renderType: 'date'
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
      <AyAction action="add">新建</AyAction>
    </AySearchTable>
  )
}
```

## 参数

| 参数名            | 说明                                                              | 参数类型                                     | 默认值 |
| ----------------- | ----------------------------------------------------------------- | -------------------------------------------- | ------ |
| title             | 表格标题，显示在左上角的文字                                      | string \| ReactNode                          | ''     |
| fields            | 配置项                                                            | Array<AySearchTableField\>                   | []     |
| selectionType     | 是否开启勾选                                                      | 'checkbox'                                   | -      |
| children          | 放在左上角的按钮                                                  | ReactNode                                    | -      |
| api               | 列表分页接口                                                      | Promise                                      | -      |
| deleteApi         | 批量删除接口                                                      | Promise                                      | -      |
| data              | 表格静态数据，不希望表格做请求，自己定义数据。                    | Array<Record\>                               | -      |
| ctrl              | 列表每一行后面数据跟着的按钮渲染。                                | AySearchTableField                           | -      |
| onSelectionChange | 选项改变事件                                                      | (selection: Array<Record\>): void            | -      |
| rowKey            | 列表每一行的唯一标志                                              | string                                       | 'id'   |
| selectShowKey     | 批量删除,勾选时，在表格顶部会有数字，点击数字可以看到选项的名称。 | string                                       | 'name' |
| dialogFormExtend  | dialog form 的配置。                                              | AyDialogFormProps                            | {}     |
| scrollX           | 滚动的 X 轴数值。                                                 | number                                       | -      |
| filterData        | 列表数据过滤。                                                    | (data: Object) => Object                     | -      |
| beforeSearch      | 提交前过滤。                                                      | (data: Object) => Object                     | -      |
| onExpand          | 展开事件。                                                        | (expanded: boolean, record: Record) => void  | -      |
| pagination        | 分页参数。                                                        | antd 分页一致                                | -      |
| center            | 节点插入在查询和表格之间。                                        | ReactNode                                    | -      |
| onLoad            | 表格查询完成监听。                                                | (records: Array<Record\>, data: any) => void | -      |
| searchVisible     | 查询区域是否展。                                                  | boolean                                      | true   |
| tableExtend       | table 其它属性。                                                  | Object                                       | {}     |

extra 右侧扩展按钮配置参考[此处][1]。

[1]: ./table/全局扩展按钮配置
