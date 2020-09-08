import { render } from 'react-dom'
import React from 'react'
import AyCtrl from '../../src/AyCtrl'
import AyAction, { registerAction } from '../../src/AyAction'
import AySearchTable from '../../src/AySearchTable'
import 'antd/dist/antd.css'

export const emptyApi = (): any => {
  console.info('接口被调用')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 300)
  })
}

export const listApi = (): any => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let data = {
        content: [
          {
            id: 'hello',
            name: '王二'
          }
        ]
      }
      resolve(data)
    })
  })
}

const finishFields = [
  {
    title: '你好',
    key: 'hello',
    dialog: []
  }
]

registerAction('test', (props, record, searchTable) => {
  return {
    children: 'hello',
    onClick: () => {
      searchTable.formRef.current.open(record, { title: '测试', fields: finishFields, api: emptyApi })
    },
    ...props
  }
})

const fields = [
  {
    title: '账号',
    key: 'username'
  },
  {
    title: '昵称',
    key: 'name',
    search: {},
    dialog: {}
  },
  {
    title: '用户类型',
    key: 'type',
    search: {},
    dialog: {}
  },
  {
    title: '证件号',
    key: 'card',
    search: {},
    dialog: {}
  },
  {
    title: '创建时间',
    key: 'date',
    type: 'date',
    search: {},
    dialog: {}
  }
]
const CtrlField = {
  render: (value: any, record: any) => {
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
        <AyAction record={record} action="test">
          结算
        </AyAction>
      </AyCtrl>
    )
  }
}

export default function Demo() {
  const meta = {
    title: '测试表格'
  }
  return (
    <div className="App">
      <AySearchTable
        selectionType="checkbox"
        api={listApi}
        fields={fields}
        meta={meta}
        deleteApi={emptyApi}
        dialogFormExtend={{
          fields: fields,
          updateApi: emptyApi,
          addApi: emptyApi
        }}
        ctrl={CtrlField}
      >
        <AyAction action="batch-delete">批量删除</AyAction>
        <AyAction action="add">新增</AyAction>
      </AySearchTable>
    </div>
  )
}

render(<Demo />, document.querySelector('#demo'))
