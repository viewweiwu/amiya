import React, { useEffect, useRef, useState } from 'react'
import { AySearchList, AyAction, AyCtrl, AySearchTableField, AyTableCtrlField, AnyKeyProps } from 'amiya'
import { Card, List, Tag, Image, Space } from 'antd'
import { listApi, addApi, updateApi, deleteApi, professionOptions } from '../../api'
import './index.less'

const ctrl: AyTableCtrlField = {
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

const block = {
  large: 24,
  middle: 24,
  small: 24,
  mini: 24
}

const starMap: AnyKeyProps = {
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

export default function AySearchDemo() {
  // 职业
  const [tag, setTag] = useState<string | undefined>(undefined)
  // 等级
  const [rarity, setRarity] = useState<number | undefined>(undefined)
  const listRef = useRef<any>()

  const fields: Array<AySearchTableField> = [
    {
      title: '英文名',
      key: 'en',
      search: {
        title: '',
        type: 'search',
        grid: block,
        placeholder: '请输入关键字',
        style: {
          width: 500
        }
      },
      dialog: {
        required: true,
        rules: [{ pattern: /^[a-z|A-Z|0-9]{1,}$/, message: '请输入字母或者数字' }]
      }
    },
    {
      title: '初始HP',
      key: 'ori-hp',
      dialog: true
    },
    {
      title: '初始攻击',
      key: 'ori-atk',
      dialog: true
    },
    {
      title: '角色职业',
      key: 'class',
      search: {
        type: 'tag-group',
        tooltip: '选择一个职业',
        grid: block,
        defaultValue: tag,
        onChange: (value: string) => setTag(value)
      },
      dialog: {
        type: 'select'
      },
      options: professionOptions
    },
    {
      title: '角色等级',
      key: 'rarity',
      search: {
        type: 'tag-group',
        grid: block,
        defaultValue: rarity,
        onChange: (value: number) => setRarity(value)
      },
      dialog: {
        type: 'select'
      },
      options: [
        { label: '一星', value: '0' },
        { label: '二星', value: '1' },
        { label: '三星', value: '2' },
        { label: '四星', value: '3' },
        { label: '五星', value: '4' },
        { label: '六星', value: '5' }
      ],
      table: false
    }
  ]

  useEffect(() => {
    listRef.current.reset()
  }, [tag, rarity])

  return (
    <div className="list-card-demo">
      <AySearchList
        title="列表标题"
        api={listApi}
        fields={fields}
        ref={listRef}
        ctrl={ctrl}
        rowKey="sort_id"
        deleteApi={deleteApi}
        autoload={false}
        extendSearchParams={{ class: tag, rarity }}
        searchExtend={{
          actionVisible: false,
          visibleRow: 99,
          colon: false,
          labelAlign: 'left'
        }}
        listExtend={{
          grid: { gutter: 16, column: 3 }
        }}
        pagination={{
          pageSize: 20
        }}
        renderItem={(record: AnyKeyProps, index: number) => {
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
                  <AyAction type="text" sub record={record} action="view">
                    详情
                  </AyAction>,
                  <AyAction type="text" sub record={record} action="update">
                    编辑
                  </AyAction>,
                  <AyAction type="text" sub record={record} action="delete">
                    删除
                  </AyAction>
                ]}
              >
                <div style={{ padding: 16, display: 'flex' }}>
                  <img src={record.half?.replace('110', '170')} width={100} height={200} />
                  <div style={{ marginLeft: 12 }}>
                    <p>
                      {record.tags?.map((item: string) => (
                        <Tag key={item} color={colorMap[item]}>
                          {item}
                        </Tag>
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
        <AyAction action="add">新增</AyAction>
      </AySearchList>
    </div>
  )
}
