import React from 'react'
import { AySearchList, AyAction, AyCtrl, AyTableCtrlField, AnyKeyProps, AyFields, AyField } from 'amiya'
import { List, Space, Avatar } from 'antd'
import { listApi, addApi, updateApi, deleteApi, professionOptions } from '../api'

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

export default function AySearchDemo() {
  return (
    <AySearchList
      title="列表标题"
      selectionType="checkbox"
      api={listApi}
      ctrl={ctrl}
      rowKey="sort_id"
      deleteApi={deleteApi}
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
        return (
          <List.Item
            key={record.sort_id}
            actions={[
              <AyCtrl>
                <AyAction record={record} action="view">
                  详情
                </AyAction>
                <AyAction record={record} action="update">
                  编辑
                </AyAction>
                <AyAction record={record} action="delete">
                  删除
                </AyAction>
              </AyCtrl>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={record.icon} size="large" />}
              title={
                <Space>
                  {record.cn} {starMap[record.rarity]}
                </Space>
              }
              description={record.des || '暂时没有描述。'}
            />
            <div>{record.moredes || '暂时没有干员信息。'}</div>
          </List.Item>
        )
      }}
      dialogFormExtend={{
        updateApi,
        addApi
      }}
    >
      <AyFields>
        <AyField
          title="英文名"
          key="en"
          search
          dialog={{ required: true, rules: [{ pattern: /^[a-z|A-Z|0-9]{1,}$/, message: '请输入字母或者数字' }] }}
        />
        <AyField title="中文名" key="cn" search dialog={{ required: true }} />
        <AyField title="职业" key="class" type="select" search dialog options={professionOptions} />
        <AyField title="职描述业" key="des" type="textarea" dialog />
      </AyFields>
    </AySearchList>
  )
}
