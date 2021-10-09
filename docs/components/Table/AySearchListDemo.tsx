import React from 'react'
import { AySearchList, AyAction, AyCtrl, AySearchTableField, AyTableCtrlField } from 'amiya'
import { Card, List, Tag } from 'antd'
import { listApi, addApi, updateApi, deleteApi, professionOptions } from '../api'
import 'antd/dist/antd.min.css'
import { AnyKeyProps } from 'es/types/AnyKeyProps'

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

export default function AySearchDemo() {
  const fields: Array<AySearchTableField> = [
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
      title: '上线开始时间',
      key: 'startDate',
      type: 'date',
      search: {}
    },
    {
      title: '上线结束时间',
      key: 'endDate',
      type: 'date',
      search: {}
    }
  ]

  return (
    <AySearchList
      title="列表标题"
      selectionType="checkbox"
      api={listApi}
      fields={fields}
      ctrl={CtrlField}
      deleteApi={deleteApi}
      listExtend={{
        grid: { gutter: 16, column: 3 }
      }}
      pagination={{
        pageSize: 20
      }}
      renderItem={(record: AnyKeyProps, index: number) => {
        let starMap: AnyKeyProps = {
          5: '⭐️⭐️⭐️⭐️⭐️⭐️',
          4: '⭐️⭐️⭐️⭐️⭐️',
          3: '⭐️⭐️⭐️⭐️',
          2: '⭐️⭐️⭐️',
          1: '⭐️⭐️',
          0: '⭐️'
        }
        const colorMap: AnyKeyProps = {
          治疗: 'green',
          输出: 'red',
          爆发: 'orange',
          群攻: 'blue',
          生存: 'cyan',
          费用回复: 'gold',
          防护: 'purple'
        }
        return (
          <List.Item key={record.id}>
            <Card
              key={record.id}
              title={record.cname}
              extra={starMap[record.rarity]}
              actions={[
                <AyAction type="text" record={record} action="view">
                  详情
                </AyAction>,
                <AyAction type="text" record={record} action="update">
                  编辑
                </AyAction>,
                <AyAction type="text" record={record} action="delete">
                  删除
                </AyAction>
              ]}
            >
              <div style={{ padding: 16 }}>
                <p>{record.itemDesc}</p>
                <p>{record.itemUsage}</p>
                <p>
                  {record.tagList.map((item: string) => (
                    <Tag color={colorMap[item]}>{item}</Tag>
                  ))}
                </p>
              </div>
            </Card>
          </List.Item>
        )
      }}
      dialogFormExtend={{
        fields: fields,
        updateApi,
        addApi
      }}
    >
      <AyAction action="batch-delete">批量删除</AyAction>
      <AyAction action="add">新增</AyAction>
    </AySearchList>
  )
}
