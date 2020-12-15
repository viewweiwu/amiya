import React, { useRef } from 'react'
import { AySearchTable, AySearchTableField, AyButton } from 'amiya'
import { listApi, professionOptions } from '../api'
import 'antd/dist/antd.min.css'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cname',
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
    key: 'profession',
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
    key: 'name'
  }
]

export default function Demo() {
  const tableRef = useRef<any>(null)

  const handleLog = () => {
    alert('请在 console 查看打印的数据')
    console.log(tableRef.current.getTableData())
  }

  return (
    <AySearchTable ref={tableRef} searchVisible={false} api={listApi} fields={fields}>
      <AyButton type="primary" onClick={handleLog}>
        打印表格数据
      </AyButton>
    </AySearchTable>
  )
}
