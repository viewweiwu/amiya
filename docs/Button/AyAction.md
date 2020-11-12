# AyAction

## 基础示例

AyAction 继承了 AyButton 所有属性。

```tsx
import React, { useState } from 'react'
import { AyAction } from 'amiya'
import 'antd/dist/antd.min.css'

export default function Demo() {
  return <AyAction onClick={() => alert('按钮')}>修改</AyAction>
}
```

## 配合 AySearchTable

在 AySearchTable 下，AyAction 的 action 会发挥作用，接下来的流程会托管给 action 对应的流程。

<code src="../Table/AySearchTableDemo.tsx" />

## 参数

| 参数名   | 说明                            | 参数类型   | 默认值 |
| -------- | ------------------------------- | ---------- | ------ |
| action   | action 名称，具体查看下方注释。 | string     | -      |
| onFinish | 接口完成事件，具体查看下方注释  | Function() | -      |

### action

- Type: string
- Default: -
- 可选值: `view`、`add`、`update`、`delete`、`batch-delete`
  - `view`: 查看表单详情，一般用于查看某一行数据的详情，触发 `AyDialogForm` `view` 事件。
  - `add`: 新增表单，打开新增表单的弹窗，触发 `AyDialogForm` `add` 事件，完成后会刷新列表。
  - `update`: 修改表单，打开修改表单的弹窗，触发 `AyDialogForm` `update` 事件，完成后会刷新列表。
  - `delete`: 删除行，会触发确认删除事件，会根据 `AySearchTable` 的 `deleteApi` 来删除数据，完成后会刷新列表。
  - `batch-delete`: 批量删除，会触发确认批量删除事件，会根据 `AySearchTable` 的 `deleteApi` 来删除数据，完成后会刷新列表。

### onFinish

- Type: Function
- Default: -

接口请求完成事件，不同状态下会获得不同数据。

```js
// 无。view 没有 onFinish 事件，写了也没有效果。
<AyAction action="view" onFinish={() => {}}>详情</AyAction>


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
      required: true,
      rules: [{ pattern: /^[a-z|A-Z|0-9]{1,}$/, message: '请输入字母或者数字' }]
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
        <AyAction record={record} action="update" onFinish={(result) => console.info('编辑完成', result)}>
          编辑
        </AyAction>
        <AyAction record={record} action="delete" onFinish={(result) => console.info('删除完成', result)}>
          删除
        </AyAction>
        <AyAction record={record} action="view">
          详情
        </AyAction>
      </AyCtrl>
    )
  }
}

export default function AySearchTableDemo() {
  return (
    <AySearchTable
      title="表格标题"
      selectionType="checkbox"
      api={listApi}
      fields={fields}
      ctrl={CtrlField}
      deleteApi={deleteApi}
      dialogFormExtend={{
        fields: fields,
        updateApi,
        addApi
      }}
    >
      <AyAction action="batch-delete" onFinish={(result) => console.info('批量删除完成', result)}>
        批量删除
      </AyAction>
      <AyAction action="add" onFinish={(result) => console.info('新增完成', result)}>
        新增
      </AyAction>
    </AySearchTable>
  )
}
```

`action` 是可以被注册的，请查看[注册方式][注册方式]

[注册方式]: http://localhost:8000/amiya/%E5%85%A8%E5%B1%80%E6%96%B9%E6%B3%95/register-action
