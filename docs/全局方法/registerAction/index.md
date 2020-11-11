# registerAction

用于注册 AyAction 的 action 事件。

观察下面例子的 批量审批、审批 按钮，是通过全局注册的。

```tsx
/**
 * title: 备注
 * desc: 你可以写一个 amiya-init.tsx 文件，可以把它注册在全局，这样只需要引入一次。
 */
import React from 'react'
import { AySearchTable, AyAction, AyCtrl, AySearchTableField, AyTableCtrlField } from 'amiya'
import { listApi, addApi, updateApi, deleteApi, professionOptions, emptyApi } from '../../api'
import './amiya-init'
import 'antd/dist/antd.min.css'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cname',
    search: {}
  },
  {
    title: '审批备注',
    key: 'itemUsage'
  }
]

const CtrlField: AyTableCtrlField = {
  width: 200,
  render: (value, record) => {
    return (
      <AyCtrl>
        <AyAction record={record} action="approve">
          审批
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
        fields: fields,
        updateApi,
        addApi
      }}
    >
      <AyAction action="batch-approve" api={emptyApi}>
        批量审批
      </AyAction>
    </AySearchTable>
  )
}
```

## 参数详解

```js
/**
 * @param actionName action 名字，注册完之后可以在 AyAction 上 指定 action
 * @param props 当前组件的 props
 * @param record 如果是在 AyCtrl 下的 AyAction 组件，会额外获得当前行的数据
 * @param searchTable 当前 AySearchTable ref 可以调用里面一些 method 方法
 * @returns 返回一个新的 props 参数
 */
registerAction('actionName', (props, record, searchTable) => {
  return {
    onClick: () => {}
    ...props
  }
})

/**
 * @desc 使用案例
 * @param actionName 指已经注册过后的名字
 */
<AyAction action="actionName">Amiya<AyAction>
```

## 覆盖默认实现

amiya 自带 5 种 action，它们分别是：

1. view: 查看
2. update: 修改
3. add: 新增
4. delete: 删除
5. batch-delete: 批量删除

你可以注册同名的 action 来覆盖原本的实现。

自带的 5 个 action: https://github.com/viewweiwu/amiya/blob/master/src/AyAction/index.tsx

```js
/**
 * 注册【新增】事件
 */
registerAction('add', (props, _record, searchTable) => {
  return {
    // 比如你可以去掉默认的高亮
    // type: 'primary',
    icon: <PlusOutlined />,
    onClick: () => {
      searchTable.formRef?.current?.add().then(() => {
        success(props.children + '成功')
        searchTable.tableRef.current.refresh()
      })
    },
    ...props
  }
})
```
