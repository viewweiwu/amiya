# AyAction

让表格按钮的复杂流程变简单。

在 AySearchTable 下，AyAction 的 action 会发挥作用，接下来的流程会托管给 action 对应的流程。

## 基础示例

<Alert>点击示例的【新增】按钮，可触发完成的新增逻辑</Alert>

```tsx
import React from 'react'
import { AySearchTable, AyAction, AySearchTableField } from 'amiya'
import { listApi, addApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    dialog: {
      required: true
    }
  }
]

export default function AySearchTableDemo() {
  return (
    <AySearchTable
      title="新增 Action"
      api={listApi}
      fields={fields}
      rowKey="sort_id"
      searchVisible={false}
      pagination={{ pageSize: 2 }}
      dialogFormExtend={{
        fields: fields,
        addApi
      }}
    >
      <AyAction action="add">新增</AyAction>
    </AySearchTable>
  )
}
```

```diff
<AySearchTable
  dialogFormExtend={{
+   addApi: Promise // 表单提交时会请求此方法，一般是个接口，保证此参数是个 Promise
  }}
>
+ <AyAction action="add">新增</AyAction>
</AySearchTable>
```

## 详情

<Alert>点击列表的【详情】按钮，可打开弹窗查看详情</Alert>

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField, AyCtrl, AyAction, Record } from 'amiya'
import { listApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    dialog: {
      required: true
    }
  },
  {
    title: '英文名',
    key: 'en',
    search: true,
    dialog: {
      required: true
    },
    table: false
  },
  {
    title: '日文名',
    key: 'jp',
    search: true,
    dialog: {
      required: true
    },
    table: false
  },
  {
    title: '初始HP',
    key: 'ori-hp',
    dialog: true
  },
  {
    title: '初始攻击',
    key: 'ori-atk',
    dialog: true
  }
]

const ctrl = {
  render: (_: any, record: Record) => (
    <AyCtrl>
      <AyAction record={record} action="view">
        详情
      </AyAction>
    </AyCtrl>
  )
}

export default function AySearchTableDemo() {
  return (
    <AySearchTable
      title="详情 Action"
      api={listApi}
      fields={fields}
      rowKey="sort_id"
      ctrl={ctrl}
      searchVisible={false}
      pagination={{ pageSize: 2 }}
      dialogFormExtend={{
        fields: fields
      }}
    />
  )
}
```

```diff
const ctrl = {
  render: (_, record) => (
    <AyCtrl>
+     <AyAction record={record} action="view">
+       详情
+     </AyAction>
    </AyCtrl>
  )
}
<AySearchTable ctrl={ctrl} />
```

## 批量删除

<Alert>
尝试勾选第一条数据，然后点击屏幕右下方【批量删除】按钮，可触发完成的批量删除逻辑。
</br>
此操作可以分页勾选，可以尝试第一页勾选第一个，第二页勾选第二个，再点击屏幕右下方【批量删除】按钮。
</Alert>

```tsx
/**
 * title: 'batch-delete' action
 * desc:
 */
import React from 'react'
import { AySearchTable, AyAction, AySearchTableField } from 'amiya'
import { listApi, deleteApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn'
  }
]

export default function AySearchTableDemo() {
  return (
    <AySearchTable
      title="删除 Action，尝试勾选第一条数据，然后点击屏幕右下方【批量删除】按钮"
      selectionType="checkbox"
      api={listApi}
      fields={fields}
      rowKey="sort_id"
      selectShowKey="cn"
      deleteApi={deleteApi}
      searchVisible={false}
      pagination={{ pageSize: 5 }}
    >
      <AyAction action="batch-delete">批量删除</AyAction>
    </AySearchTable>
  )
}
```

```diff
<AySearchTable
+ selectionType="checkbox" // 指定为批量勾选
  rowKey="sort_id" // 可不写，默认为 id，每一行的唯一标志
  selectShowKey="cn" // 可不写，默认为 name，勾选后悬浮在数字上显示的 Tag
+ deleteApi={deleteApi} // Promise Api, 勾选完点击【批量删除】请求的结偶
>
+ <AyAction action="batch-delete">批量删除</AyAction>
</AySearchTable>
```

## 参数

| 参数名       | 说明                                                  | 参数类型   | 默认值 |
| ------------ | ----------------------------------------------------- | ---------- | ------ |
| action       | action 名称，具体查看下方注释。                       | string     | -      |
| onFinish     | 接口完成事件，具体查看下方注释                        | Function() | -      |
| detailApi    | `action="view"` `action="update"` 打开前请求的接口    | Promise()  | -      |
| detailParams | `detailApi` 请求的参数                                | object     | -      |
| params       | 打开弹窗前，添加的默认值，只有 add、view、update 有效 | object     | -      |
| successMsg   | 请求成功后的消息提示                                  | string     | -      |

### action

- Type: string
- Default: -
- 可选值: `view`、`add`、`update`、`delete`、`batch-delete`

  - `view`: 查看表单详情，一般用于查看某一行数据的详情，触发 `AyDialogForm` `view` 事件。
  - `add`: 新增表单，打开新增表单的弹窗，触发 `AyDialogForm` `add` 事件，完成后会刷新列表。
  - `update`: 修改表单，打开修改表单的弹窗，触发 `AyDialogForm` `update` 事件，完成后会刷新列表。
  - `delete`: 删除行，会触发确认删除事件，会根据 `AySearchTable` 的 `deleteApi` 来删除数据，完成后会刷新列表。
  - `batch-delete`: 批量删除，会触发确认批量删除事件，会根据 `AySearchTable` 的 `deleteApi` 来删除数据，完成后会刷新列表。

- 可编辑表格可选值: `editable-add`、`editable-update`、`editable-delete`、`editable-confirm`、`editable-cancel`
  - `editable-add`: 新增一行数据。
  - `editable-update`: 此行进入编辑状态。
  - `editable-delete`: 删除此行数据。
  - `editable-confirm`: 表单会进入校验，校验通过则会保存。
  - `editable-cancel`: 取消编辑。

[可编辑表格](../table/edit-table)

### onFinish

- Type: Function
- Default: -

接口请求完成事件，不同状态下会获得不同数据。

```js

/**
 * @param data 接口返回数据
 * @param values 表单的数据
 * @param parmas 请求前的数据
 * @param record 新增时为空对象
*/
<AyAction action="add" onFinish={({ data, values, params, record }) => {}}>新增</AyAction>

/**
 * @param data 接口返回数据
 * @param values 表单的数据
 * @param parmas 请求前的数据
 * @param record 没有编辑时的数据
*/
<AyAction action="update" onFinish={({ data, values, params, record }) => {}}>新增</AyAction>

/**
 * @param data 接口返回数据
 * @param params 请求前的数据
*/
<AyAction action="delete" onFinish={({ data, params }) => {}}>删除</AyAction>

/**
 * @param data 接口返回数据
 * @param params 请求前的数据
*/
<AyAction action="batch-delete" onFinish={({ data, params }) => {}}>批量删除</AyAction>
```

```tsx
/**
 * title: action onFinish 事件监听
 * desc: 打开 Console 框，点击按钮，可以看到打印回调成功的数据。
 */
import React from 'react'
import { AySearchTable, AyAction, AyCtrl, AySearchTableField, AyTableCtrlField } from 'amiya'
import { listApi, addApi, updateApi, deleteApi, professionOptions } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    dialog: {
      required: true
    }
  }
]

const ctrl: AyTableCtrlField = {
  width: 220,
  render: (value, record) => {
    return (
      <AyCtrl>
        <AyAction record={record} action="update" onFinish={result => console.info('编辑完成', result)}>
          编辑
        </AyAction>
        <AyAction record={record} action="delete" onFinish={result => console.info('删除完成', result)}>
          删除
        </AyAction>
      </AyCtrl>
    )
  }
}

export default function AySearchTableDemo() {
  return (
    <AySearchTable
      title="点击完 新增、编辑、删除、批量删除按钮后，看 console 打印数据。"
      selectionType="checkbox"
      api={listApi}
      fields={fields}
      ctrl={ctrl}
      rowKey="sort_id"
      selectShowKey="cn"
      deleteApi={deleteApi}
      searchVisible={false}
      dialogFormExtend={{
        fields: fields,
        updateApi,
        addApi
      }}
    >
      <AyAction action="batch-delete" onFinish={result => console.info('批量删除完成', result)}>
        批量删除
      </AyAction>
      <AyAction action="add" onFinish={result => console.info('新增完成', result)}>
        新增
      </AyAction>
    </AySearchTable>
  )
}
```

### params

目前支持 add、update、view 3 个 action 设置弹窗默认值。

```js
/**
 * pamras 支持打开弹窗的默认值，如果跟 record 同 key，则会取 record 的值。
*/
<AyAction action="add" params={{ test: 123 }}}>新增</AyAction>

/**
 * pamras 支持打开弹窗的默认值，如果跟 record 同 key，则会取 record 的值。
*/
<AyAction action="update" params={{ test: 123 }}>新增</AyAction>

/**
 * pamras 支持打开弹窗的默认值，如果跟 record 同 key，则会取 record 的值。
*/
<AyAction action="view" params={{ test: 123 }}>详情</AyAction>
```

`action` 是可以被注册的，请查看[注册方式][注册方式]

[注册方式]: ../global/register-action
