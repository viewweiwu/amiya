import React, { useRef } from 'react'
import { AySearchTable, AySearchTableField, AyButton, AyTableCtrlField, AyAction, AyCtrl } from 'amiya'
import { professionOptions } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    width: 200,
    editable: true,
    renderType: 'editable-cell-input',
    contentProps: {
      allowClear: true
    },
    formItemProps: {
      rules: [{ required: true, message: '请输入姓名' }]
    }
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: professionOptions,
    width: 200,
    editable: true,
    renderType: 'editable-cell-select',
    contentProps: {
      allowClear: true
    },
    formItemProps: {
      rules: [{ required: true, message: '请选择职业' }]
    }
  },
  {
    title: '编号',
    key: 'code',
    editable: true,
    formItemProps: {
      rules: [
        { required: true, message: '请输入编号' },
        { message: '必须包含数字', pattern: /[0-9]/ },
        { max: 16, whitespace: true, message: '最长为 16 位' },
        { min: 6, whitespace: true, message: '最小为 6 位' }
      ]
    }
  }
]

const data = [
  {
    cn: '阿米娅',
    en: 'Amiya',
    class: '术师',
    code: '1',
    sort_id: 55
  },
  {
    cn: '能天使',
    en: 'Exusiai',
    class: '狙击',
    code: '2',
    sort_id: 73
  }
]

const ctrl: AyTableCtrlField = {
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
      data={data}
      fields={fields}
      ctrl={ctrl}
      editMode="row"
      rowKey="sort_id"
      title="可编辑行"
      after={<AyAction action="editable-add">新增</AyAction>}
    >
      <AyButton type="primary" onClick={handleLog}>
        打印表格数据
      </AyButton>
    </AySearchTable>
  )
}
