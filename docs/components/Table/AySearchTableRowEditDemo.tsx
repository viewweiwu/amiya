import React, { useRef } from 'react'
import { AySearchTable, AySearchTableField, AyButton, AyTableCtrlField, AyAction, AyCtrl } from 'amiya'
import { listApi, professionOptions } from '../api'
import 'antd/dist/antd.min.css'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    table: {
      width: 200,
      editable: true,
      renderType: 'editable-cell-input',
      contentProps: {
        allowClear: true
      },
      formItemProps: {
        rules: [{ required: true, message: '请输入姓名' }]
      }
    }
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: professionOptions,
    table: {
      width: 200,
      editable: true,
      renderType: 'editable-cell-select',
      contentProps: {
        allowClear: true
      },
      formItemProps: {
        rules: [{ required: true, message: '请选择职业' }]
      }
    }
  },
  {
    title: '英文名',
    key: 'en',
    table: {
      editable: true
    }
  }
]

const CtrlField: AyTableCtrlField = {
  width: 200,
  render: (_, record) => {
    let actions = []
    if (record.editing) {
      actions = [
        <AyAction key="editable-confirm" action="editable-confirm" record={record}>
          确定
        </AyAction>,
        <AyAction key="editable-cancel" action="editable-cancel" record={record}>
          取消
        </AyAction>
      ]
    } else {
      actions = [
        <AyAction key="editable-update" action="editable-update" record={record}>
          编辑
        </AyAction>,
        <AyAction key="editable-delete" action="editable-delete" record={record}>
          删除
        </AyAction>
      ]
    }
    return <AyCtrl>{actions}</AyCtrl>
  }
}

export default function Demo() {
  const tableRef = useRef<any>(null)

  const handleLog = () => {
    alert('请在 console 查看打印的数据')
    console.log(tableRef.current.getTableData())
  }

  return (
    <AySearchTable
      ref={tableRef}
      searchVisible={false}
      pagination={false}
      api={listApi}
      fields={fields}
      ctrl={CtrlField}
      editMode="row"
      rowKey="en"
      title="可编辑行"
      after={<AyAction action="editable-add">新增</AyAction>}
    >
      <AyButton type="primary" onClick={handleLog}>
        打印表格数据
      </AyButton>
    </AySearchTable>
  )
}
