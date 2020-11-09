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
