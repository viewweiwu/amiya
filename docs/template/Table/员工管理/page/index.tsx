import React, { useState } from 'react'
import { AyAction, AyCtrl, AyField, AyFields, AySearchTable, AyTableCtrlField, Record } from 'amiya'
import { addApi, deleteApi, listApi, updateApi } from '../api'
import { WeiboCircleOutlined, QqOutlined, WechatOutlined, TwitterOutlined } from '@ant-design/icons'
import { message, Space, Typography } from 'antd'
import { EditOutlined, PlusSquareFilled } from '@ant-design/icons'
import '../amiya/index.tsx'
import AyButton from '@/AyButton'

const { Text } = Typography

const ctrl: AyTableCtrlField = {
  render: (key: string, record: Record) => {
    return (
      <AyCtrl>
        <AyAction record={record} action="update">
          编辑
        </AyAction>
        {record.status === 1 && (
          <AyAction confirm confirmMsg="确定要重置该用户的密码吗？" onConfirm={() => message.info('未实现')}>
            重置密码
          </AyAction>
        )}
        <AyAction record={record} action="delete" confirmMsg="你确定要删除此员工吗？">
          删除
        </AyAction>
      </AyCtrl>
    )
  }
}

export default function Demo() {
  return (
    <AySearchTable
      api={listApi}
      rowKey="id"
      title="员工列表"
      dialogFormExtend={{ addApi, updateApi }}
      deleteApi={deleteApi}
      ctrl={ctrl}
    >
      <AyFields>
        <AyField
          title="头像"
          key="avatar"
          dialog={{
            title: '选择头像',
            type: 'radio-group',
            tooltip: '选择一个喜欢的头像',
            required: true,
            options: [
              require('../images/avatar1.jpg'),
              require('../images/avatar2.jpg'),
              require('../images/avatar3.jpg'),
              require('../images/avatar4.jpg'),
              require('../images/avatar5.jpg')
            ].map(src => {
              return {
                label: <img src={src} width="50" height="50" style={{ marginBottom: 8 }} />,
                value: src
              }
            })
          }}
          table={{ width: 70, renderType: 'image', props: { width: 60, height: 60 } }}
        />
        <AyField title="用户名称" key="nickname" search dialog={{ required: true }} />
        <AyField title="登录账号" key="username" search dialog={{ required: true }} />
        <AyField
          title="所属角色"
          key="character"
          type="select"
          search
          table={{
            renderType: 'group',
            split: '、',
            size: 0,
            tooltip: '当前绑定的角色',
            after: (
              <AyButton tooltip="编辑角色" type="link" icon={<EditOutlined />} onClick={() => message.info('未实现')} />
            )
          }}
          options={[
            { label: '超级管理员', value: 1 },
            { label: '财务', value: 2 },
            { label: '运营', value: 3 }
          ]}
        />
        <AyField title="邮箱地址" key="email" dialog />
        <AyField
          title="第三方绑定"
          key="linkAccount"
          table={{
            renderType: 'group',
            after: (
              <div>
                <a>添加绑定</a>
              </div>
            )
          }}
          options={[
            { label: <WeiboCircleOutlined style={{ color: '#d52c2b', fontSize: 20 }} />, value: 'weibo' },
            { label: <QqOutlined style={{ color: '#333', fontSize: 20 }} />, value: 'qq' },
            { label: <WechatOutlined style={{ color: '#03dc6c', fontSize: 20 }} />, value: 'wechat' },
            { label: <TwitterOutlined style={{ color: '#1d9bf0', fontSize: 20 }} />, value: 'twitter' }
          ]}
        />
        <AyField
          title="在职状态"
          key="status"
          type="select"
          search
          dialog={{
            type: 'radio-group',
            required: true,
            defaultValue: 1,
            props: {
              optionType: 'button'
            }
          }}
          table={{
            renderType: 'status'
          }}
          options={[
            { label: '在职', value: 1, color: 'green' },
            { label: '离职', value: 2, color: 'red' },
            { label: '退休', value: 3, color: 'cyan' },
            { label: '停薪', value: 4, color: 'purple' }
          ]}
        />
      </AyFields>
      <Space size="large">
        <Text type="secondary">初始登录密码：111111</Text>
        <AyAction action="add">新增员工</AyAction>
      </Space>
    </AySearchTable>
  )
}
