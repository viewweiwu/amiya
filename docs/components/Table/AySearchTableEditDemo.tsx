import React, { useRef } from 'react'
import { AySearchTable, AySearchTableField, AyButton } from 'amiya'
import { professionOptions } from '../api'
import { AnyKeyProps } from '@/types/AnyKeyProps'
import { Button } from 'antd'

const fields: Array<AySearchTableField> = [
  {
    title: '英文名',
    key: 'en',
    table: {
      width: 100,
      editable: true,
      renderType: 'editable-cell-input'
    }
  },
  {
    title: '复杂的姓名编辑',
    key: 'cn',
    table: {
      width: 300,
      editable: true,
      renderType: 'editable-cell-input',
      // 未编辑时的样式
      editableCellStyle: {
        width: 200,
        display: 'inline-block'
      },
      // 前置元素
      before: ({ record, field, refreshRow }: AnyKeyProps) => {
        return (
          <Button
            style={{ marginRight: 8 }}
            onClick={() => {
              record.color = record.color === 'red' ? 'blue' : 'red'
              // 覆盖 record 后，调用此方法可刷新数据
              refreshRow()
            }}
          >
            换色
          </Button>
        )
      },
      // 后置元素
      after: ({ record }: AnyKeyProps) => {
        return <div style={{ color: record.color || '#ccc' }}>可以换色：{record.cn}</div>
      },
      contentProps: {
        allowClear: true
      },
      formItemProps: {
        // 编辑中的样式
        style: {
          display: 'inline-block',
          width: 100,
          marginBottom: 0
        },
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
  }
]

const data = [
  {
    cn: '阿米娅',
    en: 'Amiya',
    class: '术师',
    sort_id: 55
  },
  {
    cn: '能天使',
    en: 'Exusiai',
    class: '狙击',
    sort_id: 73
  }
]

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
      fields={fields}
      data={data}
      editMode="col"
      rowKey="sort_id"
      title="可编辑单元格"
    >
      <AyButton type="primary" onClick={handleLog}>
        打印表格数据
      </AyButton>
    </AySearchTable>
  )
}
