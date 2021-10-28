import React from 'react'
import { AySearchTable, AyAction, AyCtrl, AyTableCtrlField, AySearchTableField, Record } from 'amiya'
import { listApi, addApi, updateApi, deleteApi, professionOptions, detailApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '头像',
    key: 'icon',
    table: {
      width: 80,
      align: 'center',
      renderType: 'image',
      props: {
        width: 70
      }
    }
  },
  {
    title: '姓名',
    key: 'cn',
    search: {},
    dialog: {
      required: true
    },
    table: {
      render: (text, record) => {
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
    search: {},
    dialog: {
      required: true
    },
    table: {
      hidden: true
    }
  },
  {
    title: '日文名',
    key: 'jp',
    search: {},
    dialog: {
      required: true
    },
    table: {
      hidden: true
    }
  },
  {
    title: (
      <div>
        <div>势力</div>
        <div>出身地</div>
        <div>种族</div>
      </div>
    ),
    table: {
      render: (text, record: Record) => {
        return (
          <div>
            <div>{record.camp}</div>
            <div>{record.birthplace}</div>
            <div>{record.race}</div>
          </div>
        )
      }
    },
    search: {
      title: '职业',
      key: 'class',
      type: 'select',
      options: professionOptions
    },
    dialog: {
      title: '职业',
      key: 'class',
      type: 'select',
      options: professionOptions
    }
  },
  {
    title: '初始HP',
    key: 'ori-hp',
    dialog: {}
  },
  {
    title: '初始攻击',
    key: 'ori-atk',
    dialog: {}
  },
  {
    title: '标签',
    key: 'tags',
    table: {
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
    }
  },
  {
    title: '描述',
    key: 'feature',
    table: {
      width: 200,
      renderType: 'html'
    }
  }
]

const ctrl: AyTableCtrlField = {
  width: 220,
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
