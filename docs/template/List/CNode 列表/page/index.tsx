import React, { useRef, useState } from 'react'
import moment from 'moment'
import { AySearchList, AyFields, AyField, AyAction, Record, AyDialog, AnyKeyProps } from 'amiya'
import { List, Avatar, Tabs, Space, Tag, Comment, Tooltip } from 'antd'
import { MessageOutlined, EyeOutlined } from '@ant-design/icons'
import { detailApi, listApi } from '../api'
import '../less/index.less'

const options = [
  {
    label: '全部',
    value: ''
  },
  {
    label: '精华',
    value: 'good'
  },
  {
    label: '问答',
    value: 'ask'
  },
  {
    label: '分享',
    value: 'share'
  },
  {
    label: '招聘',
    value: 'job'
  }
]

export default function Demo() {
  // 列表控制
  const listRef = useRef<any>()
  // 当前激活的 tab
  const [activeTab, setActiveTab] = useState<string>('')
  // 弹窗详情
  const [detail, setDetail] = useState<AnyKeyProps>({
    visible: false,
    data: {}
  })

  /**
   * 切换 tab 事件
   * @param value 当前 tab 值
   */
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    listRef.current.reset()
  }

  /**
   * 查看详情
   * @param record 当前行数据
   */
  const goDetail = (record: Record) => {
    detailApi({ id: record.id }).then(res => {
      setDetail({
        visible: true,
        data: res.data
      })
    })
  }

  return (
    <div className="cnode-list">
      {/* tab 区域 */}
      <Tabs activeKey={activeTab} onChange={handleTabChange} type="card">
        {options.map(option => (
          <Tabs.TabPane tab={option.label} key={option.value} />
        ))}
      </Tabs>
      {/* 列表区域 */}
      <AySearchList
        api={listApi}
        extraVisible={false}
        listExtend={{ itemLayout: 'horizontal' }}
        extendSearchParams={{ tab: activeTab }}
        listHeader={<div style={{ height: 16 }}>{/* 占位空间 */}</div>}
        ref={listRef}
        onParamsChange={() => window.scrollTo({ behavior: 'smooth', top: 0 })}
        renderItem={(record: Record) => {
          return (
            <List.Item
              key={record.id}
              actions={[
                <AyAction icon={<MessageOutlined />} sub tooltip="最后回复时间">
                  <span>{moment(record.last_reply_at).fromNow()}</span>
                </AyAction>,
                <AyAction icon={<MessageOutlined />} sub tooltip="回复数">
                  <span>{record.reply_count}</span>
                </AyAction>,
                <AyAction icon={<EyeOutlined />} sub tooltip="阅读数">
                  <span>{record.visit_count}</span>
                </AyAction>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={record.author.avatar_url} />}
                title={
                  <Space>
                    <a onClick={() => goDetail(record)}>{record.title}</a>
                    <span>
                      {record.good && <Tag color="green">精品</Tag>}
                      {record.top && <Tag color="blue">置顶</Tag>}
                    </span>
                  </Space>
                }
                description={moment(record.create_at).fromNow()}
              />
            </List.Item>
          )
        }}
      >
        <AyFields>
          <AyField title="ID" key="id" />
          <AyField title="标题" key="title" />
        </AyFields>
      </AySearchList>
      {/* 弹窗详情 */}
      <AyDialog
        drawer
        width={800}
        footer={false}
        destroyOnClose
        visible={detail.visible}
        setVisible={() => setDetail({ ...detail, visible: false })}
        title="文章详情"
      >
        <div dangerouslySetInnerHTML={{ __html: detail.data.content }}></div>
        <List
          itemLayout="horizontal"
          header={`${detail?.data?.replies?.length || 0} 条回复`}
          dataSource={detail?.data?.replies || []}
          renderItem={(comment: Record) => (
            <Comment
              key={comment.id}
              author={comment.author.loginname}
              avatar={<Avatar src={comment.author.avatar_url} alt={comment.author.avatar_url} />}
              content={<div dangerouslySetInnerHTML={{ __html: comment.content }}></div>}
              datetime={
                <Tooltip title={moment(comment.create_at).format('YYYY-MM-DD HH:mm:ss')}>
                  <span>{moment(comment.create_at).fromNow()}</span>
                </Tooltip>
              }
            />
          )}
        />
      </AyDialog>
    </div>
  )
}
