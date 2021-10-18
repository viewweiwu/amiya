import React from 'react'
import { AySearchList, AyAction, AyCtrl, AySearchTableField, AyTableCtrlField } from 'amiya'
import { Card, List, Tag, Image, Space } from 'antd'
import { listApi, addApi, updateApi, deleteApi, professionOptions } from '../api'

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
      key: 'en',
      search: {},
      dialog: {
        required: true,
        rules: [{ pattern: /^[a-z|A-Z|0-9]{1,}$/, message: '请输入字母或者数字' }]
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
      title: '职业',
      key: 'class',
      type: 'select',
      search: {},
      dialog: {},
      options: professionOptions
    }
  ]

  return (
    <AySearchList
      title="列表标题"
      selectionType="checkbox"
      api={listApi}
      fields={fields}
      ctrl={CtrlField}
      rowKey="sort_id"
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
          防护: 'purple',
          新手: 'geekblue'
        }
        return (
          <List.Item key={record.sort_id}>
            <Card
              key={record.sort_id}
              title={
                <Space style={{ display: 'flex', alignItems: 'center' }}>
                  <Image preview={false} width={30} src={record.icon} />
                  {record.cn}
                </Space>
              }
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
              <div style={{ padding: 16, display: 'flex' }}>
                <img src={record.half.replace('110', '170')} width={100} height={200} />
                <div style={{ marginLeft: 12 }}>
                  <p>
                    {record.tags.map((item: string) => (
                      <Tag color={colorMap[item]}>{item}</Tag>
                    ))}
                  </p>
                  <p>{record.des}</p>
                  <p dangerouslySetInnerHTML={{ __html: record.feature }}></p>
                </div>
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
