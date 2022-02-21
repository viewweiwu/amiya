import React from 'react'
import { AySearchTable, AyAction, AyCtrl, AyTableCtrlField, AySearchTableField, Record } from 'amiya'
import { listApi, addApi, updateApi, deleteApi, professionOptions, detailApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '头像',
    key: 'icon',
    width: 80,
    align: 'center',
    renderType: 'image',
    props: {
      width: 70
    }
  },
  {
    title: '姓名',
    key: 'cn',
    search: true,
    dialog: {
      required: true
    },
    table: {
      render: (text: string, record: Record) => {
        return (
          <div>
            <div>{record.cn}</div>
            <div>{record.en}</div>
            <div>{record.jp}</div>
          </div>
        )
      }
    }
  },
  {
    title: '英文名',
    key: 'en',
    table: false,
    search: true,
    dialog: {
      required: true
    }
  },
  {
    title: '日文名',
    key: 'jp',
    table: false,
    search: true,
    dialog: {
      required: true
    }
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: professionOptions,
    dialog: true,
    search: true
  },
  {
    title: '初始HP',
    key: 'ori-hp',
    search: true,
    dialog: true
  },
  {
    title: '标签',
    key: 'tags',
    renderType: 'tags',
    colorMap: {
      治疗: 'green',
      输出: 'red',
      爆发: 'orange',
      群攻: 'blue',
      生存: 'cyan',
      费用回复: 'gold',
      防护: 'purple',
      新手: 'geekblue',
      减速: 'lime',
      控场: 'red'
    }
  },
  {
    title: '描述',
    key: 'feature',
    dialog: {
      type: 'textarea'
    },
    width: 200,
    renderType: 'html'
  }
]

const ctrl: AyTableCtrlField = {
  render: (value: string, record: Record) => {
    return (
      <AyCtrl>
        <AyAction detailParams={record.sort_id} detailApi={detailApi} action="view">
          详情
        </AyAction>
        <AyAction record={record} action="update">
          编辑
        </AyAction>
        <AyAction record={record} action="delete">
          删除
        </AyAction>
      </AyCtrl>
    )
  }
}

export default function Demo() {
  return (
    <AySearchTable
      title="Amiya 增删改查"
      selectionType="checkbox"
      api={listApi}
      fields={fields}
      ctrl={ctrl}
      rowKey="sort_id"
      selectShowKey="cn"
      deleteApi={deleteApi}
      dialogFormExtend={{
        fields: fields,
        updateApi,
        addApi
      }}
    >
      <AyAction action="batch-delete">批量删除</AyAction>
      <AyAction action="add">新增</AyAction>
    </AySearchTable>
  )
}
