import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AySearchList, Record, AyFields, AyField, AyTagGroup, AnyKeyProps, AyButton } from 'amiya'
import { List, Row, Col, Space, Select, Typography, Avatar, Image, Tabs, Button, Alert, Divider } from 'antd'
import {
  SmileOutlined,
  DownOutlined,
  UpOutlined,
  AppstoreAddOutlined,
  RightOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import '../less/index.less'
import classNames from 'classnames'
const orange = require('../image/orange.jpg')

const { Text, Paragraph } = Typography

const yearOptions = [
  { label: '近三个月的订单', value: 1 },
  { label: '今年的订单', value: 2 },
  { label: '2021年的订单', value: 3 },
  { label: '2020年的订单', value: 4 },
  { label: '2019年的订单', value: 5 },
  { label: '2018年的订单', value: 6 },
  { label: '2017年的订单', value: 7 },
  { label: '2016年的订单', value: 8 },
  { label: '2015年的订单', value: 9 },
  { label: '2014年的订单', value: 10 },
  { label: '2014年以前的订单', value: 11 }
]

const statusOptions = [
  { label: '全部状态', value: 1 },
  { label: '等待付款', value: 2 },
  { label: '等待收货', value: 3 },
  { label: '已完成', value: 4 },
  { label: '已取消', value: 5 }
]

const tabOptions = [
  { label: '全部订单', value: 1 },
  { label: '待付款', value: 2 },
  { label: '待收货', value: 3 },
  { label: '待评价', value: 4 },
  { label: '我常购的商品', value: 5 },
  { label: '订单回收站', value: 6 }
]

const tagOptions = [
  { label: '实物商品', value: 1 },
  { label: '机票', value: 2 },
  { label: '酒店', value: 3 },
  { label: '租车', value: 4 },
  { label: '度假', value: 5 },
  { label: '门票', value: 6 },
  { label: '火车', value: 7 },
  { label: '游戏', value: 8 },
  { label: '手机充值', value: 9 },
  { label: '电影票', value: 10 },
  { label: '演出票', value: 11 },
  { label: '电子书', value: 12 },
  { label: '数字音乐', value: 13 },
  { label: '应用商店', value: 14 },
  { label: '保险', value: 15 },
  { label: '夺宝岛', value: 16 },
  { label: '加油卡', value: 17 },
  { label: '一元抢宝', value: 18 }
]

// 表格数据
const data = [
  {
    id: 1,
    message: '只有一个商品只有一个商品只有一个商品只有一个商品只有一个商品只有一个商品只有一个商品',
    groups: [
      {
        id: 'g1',
        goods: [{ id: 1 }]
      }
    ]
  },
  {
    id: 2,
    message: '多个商品多个商品多个商品多个商品多个商品多个商品多个商品多个商品多个商品多个商品多个商品',
    groups: [
      {
        id: 'g1',
        goods: [{ id: 1 }, { id: 2 }]
      }
    ]
  },
  {
    id: 3,
    message: '拆分订单后变成多组商品拆分订单后变成多组商品拆分订单后变成多组商品拆分订单后变成多组商品',
    groups: [
      {
        id: 'g1',
        goods: [{ id: 1 }, { id: 2 }]
      },
      {
        id: 'g2',
        goods: [{ id: 1 }]
      }
    ],
    splitInfo: {}
  },
  {
    id: 4,
    message: '分阶段支付分阶段支付分阶段支付分阶段支付分阶段支付分阶段支付分阶段支付分阶段支付',
    groups: [
      {
        id: 'g1',
        goods: [{ id: 1 }]
      }
    ],
    steps: [
      {
        id: 's1',
        price: 20,
        label: '付定金'
      },
      {
        id: 's2',
        price: 900,
        label: '付尾款(含运费和服务费)'
      }
    ]
  },
  {
    id: 4,
    message: '拆分了订单，同时又分阶段支付',
    groups: [
      {
        id: 'g1',
        goods: [{ id: 1 }, { id: 2 }]
      },
      {
        id: 'g2',
        goods: [{ id: 1 }]
      }
    ],
    splitInfo: {},
    steps: [
      {
        id: 's1',
        price: 20,
        label: '付定金'
      },
      {
        id: 's2',
        price: 900,
        label: '付尾款(含运费和服务费)'
      }
    ]
  }
]

export default function Demo() {
  // 列表控制
  const listRef = useRef<any>()
  // 选中的年份
  const [activeYear, setActiveYear] = useState(1)
  // 选中的状态
  const [activeStatus, setActiveStatus] = useState(1)
  // 选中的 tab
  const [activeTab, setActiveTab] = useState(1)
  // 选中的标签
  const [activeTag, setActiveTag] = useState(undefined)
  // 标签是否可见
  const [tagVisible, setTagVisible] = useState(false)
  // 查询参数 打印用
  const [searchValue, setSearchValue] = useState({})
  // 查询区域是否可见
  const searchVisible = useMemo(() => {
    return activeTab !== 6
  }, [activeTab])
  // 查询参数
  const searchParams = useMemo(() => {
    return {
      activeYear,
      activeStatus,
      activeTab,
      activeTag
    }
  }, [activeTab, activeYear, activeStatus, activeTag])

  useEffect(() => {
    // 查询参数改变，刷新列表
    listRef.current.reset()
  }, [searchParams])

  useEffect(() => {
    // 如果不显示标签，则把标签值值设置为空
    if (!tagVisible) {
      setActiveTag(undefined)
    }
  }, [tagVisible])

  useEffect(() => {
    // 查询区域不显示时，清空它的值
    if (!searchVisible) {
      setActiveTag(undefined)
      setTagVisible(false)
    }
  }, [searchVisible])

  return (
    <div className="space-list">
      <AySearchList
        ref={listRef}
        title={
          <Space size={24}>
            <Tabs activeKey={activeTab + ''} onChange={key => setActiveTab(Number(key))}>
              {tabOptions.map(option => (
                <Tabs.TabPane key={option.value} className="goods" tab={option.label} />
              ))}
            </Tabs>
          </Space>
        }
        api={(searchValues: AnyKeyProps) =>
          new Promise(resolve => {
            setSearchValue(searchValues)
            setTimeout(() => {
              resolve({
                content: data,
                totalCount: data.length
              })
            }, 500)
          })
        }
        extendSearchParams={searchParams}
        extraVisible={false}
        autoload={false}
        listExtend={{
          itemLayout: 'vertical'
        }}
        onParamsChange={(values: AnyKeyProps) => {
          // 翻页 & 查询时，滚动到最顶部
          window.scrollTo({ behavior: 'smooth', top: 0 })
        }}
        listHeader={
          <div>
            {tagVisible && (
              <div>
                <div className="space-list-search-tags">
                  <label>订单类型：</label>
                  <AyTagGroup value={activeTag} onChange={setActiveTag} options={tagOptions} />
                </div>
                <div className="space-list-search-row">
                  <Button onClick={() => setTagVisible(false)}>返回</Button>
                </div>
              </div>
            )}
            {!searchVisible && (
              <div className="space-list-search-row">
                <Alert
                  showIcon
                  message="说明"
                  description={
                    <ul>
                      <li>1. 只有已取消和已完成的订单可以删除；</li>
                      <li>
                        2.
                        被删除的订单将无法进行评价、晒单和申请售后等操作；如果想继续这些操作，可以先将被删除的订单还原；
                      </li>
                      <li>3. 订单被永久删除后无法还原。</li>
                    </ul>
                  }
                />
              </div>
            )}
            <Row className="space-list-header">
              <Col flex="150px">
                <Select
                  style={{ minWidth: 200 }}
                  options={yearOptions}
                  bordered={false}
                  value={activeYear}
                  onChange={setActiveYear}
                />
              </Col>
              <Col flex="1" style={{ paddingLeft: 8 }}>
                订单详情
              </Col>
              <Col span={3} className="space-list-center">
                收货人
              </Col>
              <Col span={3} className="space-list-center">
                金额
              </Col>
              <Col span={3} className="space-list-center">
                <Select
                  style={{ width: '100%' }}
                  options={statusOptions}
                  bordered={false}
                  value={activeStatus}
                  onChange={setActiveStatus}
                />
              </Col>
              <Col span={3} className="space-list-center">
                操作
              </Col>
            </Row>
          </div>
        }
        renderItem={(record: Record) => {
          // 卡片渲染内容
          return (
            <List.Item key={record.id}>
              <div className="space-list-card">
                {record.splitInfo && (
                  <>
                    <div className="space-list-card-header light">
                      <Space size="large">
                        <Text>2020-05-06 23:59:59</Text>
                        <span>
                          <Text type="secondary">订单号：</Text>78074445382
                        </span>
                      </Space>
                      <Text type="secondary">
                        您订单中的商品在不同库房或属不同商家，故拆分为以下订单分开配送，给您带来的不便敬请谅解。
                      </Text>
                    </div>
                    <div className="space-list-card-header gray">
                      <Space size="large">
                        <span>
                          <Text type="secondary">收货人：</Text>123
                        </span>
                        <span>
                          <Text type="secondary">订单金额：</Text>¥123
                        </span>
                        <span>
                          <Text type="secondary">支付方式：</Text>在线支付
                        </span>
                        <span>
                          <Text type="secondary">订单状态：</Text>已拆分
                        </span>
                      </Space>
                      <AyButton sub>
                        查看拆分详情
                        <RightOutlined />
                      </AyButton>
                    </div>
                  </>
                )}
                {record.groups?.map((group: Record, index: number) => (
                  <div className="space-list-card-group">
                    <div
                      className={classNames('space-list-card-header', !record.splitInfo && index === 0 ? 'light' : '')}
                    >
                      <Space size="large">
                        <Text>2020-05-06 23:59:59</Text>
                        <span>
                          <Text type="secondary">订单号：</Text> 78074445382
                        </span>
                        <a>
                          <Space size="small">
                            <SmileOutlined />
                            卖橘子的商家
                          </Space>
                        </a>
                      </Space>
                      <AyButton
                        className="space-list-card-delete"
                        confirm
                        confirmMsg="确定要删除吗？删除后，您可以在订单回收站还原该订单，也可以做永久删除。"
                        size="small"
                        icon={<DeleteOutlined />}
                      />
                    </div>
                    <Row className="space-list-card-info">
                      <Col span={12} className="space-list-card-left">
                        {group.goods?.map((goods: Record) => (
                          <Row key={goods.id} wrap={false} gutter={8} className="space-list-card-goods">
                            <Col flex="90px">
                              <Image src={orange} width={80} height={80} />
                            </Col>
                            <Col flex="1">
                              <Paragraph ellipsis={{ rows: 2, tooltip: '好吃的橘子', symbol: '...' }}>
                                {record.message || '商品名称'}
                              </Paragraph>
                              <a>
                                <Space size="small">
                                  <AppstoreAddOutlined />
                                  找搭配
                                </Space>
                              </a>
                            </Col>
                            <Col flex="50px" className="space-list-center">
                              x1
                            </Col>
                            <Col flex="100px" className="space-list-center">
                              <a>申请售后</a>
                            </Col>
                          </Row>
                        ))}
                      </Col>
                      <Col span={3} className="space-list-center space-list-cell">
                        <Space>
                          <Avatar src="购买者头像" />
                          购买者
                        </Space>
                      </Col>
                      <Col span={3} className="space-list-center space-list-cell">
                        <div>¥25.55</div>
                        <div>
                          <Text type="secondary">在线支付</Text>
                        </div>
                      </Col>
                      <Col span={3} className="space-list-center space-list-cell">
                        <div>已完成</div>
                        <div>
                          <a>订单详情</a>
                        </div>
                      </Col>
                      <Col span={3} className="space-list-center space-list-cell">
                        <div>
                          <a>查看发票</a>
                        </div>
                        <div>
                          <a>立即购买</a>
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
                {record.steps?.map((step: Record, index: number) => (
                  <Row className="space-list-card-footer gray" key={step.id}>
                    <Col span={15}>
                      阶段{index + 1}：{step.label}
                    </Col>
                    <Col span={3} className="space-list-center">
                      ¥50
                    </Col>
                    <Col span={3} className="space-list-center">
                      已完成
                    </Col>
                    <Col span={3} className="space-list-center">
                      2
                    </Col>
                  </Row>
                ))}
              </div>
            </List.Item>
          )
        }}
      >
        <AyFields>
          <AyField key="__search" type="input-group" search={{ position: 'more', hidden: !searchVisible }}>
            <AyField
              key="keyword"
              type="search"
              placeholder="商品名称/商品编号/订单号"
              enterButton={false}
              style={{ width: 300 }}
            />
            <AyField
              key="__btn"
              type="custom"
              renderContent={() => (
                <Button className="space-list-toggle" onClick={() => setTagVisible(!tagVisible)}>
                  高级
                  {tagVisible ? <UpOutlined /> : <DownOutlined />}
                </Button>
              )}
            />
          </AyField>
        </AyFields>
      </AySearchList>
      {/* 页面打印用，实际使用删掉即可 */}
      <Divider orientation="left">查询参数</Divider>
      {Object.keys(searchValue).length && <pre>{JSON.stringify(searchValue, null, 2)}</pre>}
    </div>
  )
}
