import React from 'react'
import { AySearchTable, AyAction, AyCtrl, AyTableCtrlField, Record, AyFields, AyField } from 'amiya'
import { listApi, addApi, updateApi, deleteApi, professionOptions, detailApi } from '../api'

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
      title="JSX 增删改查"
      selectionType="checkbox"
      api={listApi}
      ctrl={ctrl}
      rowKey="sort_id"
      selectShowKey="cn"
      deleteApi={deleteApi}
      dialogFormExtend={{
        updateApi,
        addApi
      }}
    >
      <AyFields>
        <AyField
          title="头像"
          key="icon"
          table={{
            width: 80,
            align: 'center',
            renderType: 'image',
            props: {
              width: 70
            }
          }}
        />
        <AyField
          title="姓名"
          key="cn"
          search
          table={{
            render: (text, record) => {
              return (
                <div>
                  <div>{record.cn}</div>
                  <div>{record.en}</div>
                  <div>{record.jp}</div>
                </div>
              )
            }
          }}
        />
        <AyField title="英文名" key="en" search dialog table={false} />
        <AyField title="日文名" key="jp" search dialog table={false} />
        <AyField title="初始HP" key="ori-hp" search dialog />
        <AyField
          title="职业"
          key="class"
          type="select"
          search
          dialog
          options={professionOptions}
          table={{ filter: true }}
        />
        <AyField title="初始攻击" key="ori-atk" search dialog />
        <AyField
          title="标签"
          key="tags"
          table={{
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
          }}
        />
        <AyField
          title="描述"
          key="feature"
          table={{
            width: 200,
            renderType: 'html'
          }}
        />
      </AyFields>
      <AyAction action="batch-delete">批量删除</AyAction>
      <AyAction action="add">新增</AyAction>
    </AySearchTable>
  )
}
