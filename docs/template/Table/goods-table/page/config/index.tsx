import React from 'react'
import { Record, AySearchList, Option } from 'amiya'
import { Space, Image, DatePicker } from 'antd'

export const defaultTabOptions: Array<Option> = [
  { label: '已上架', value: 'ACTIVE' },
  { label: '已下架', value: 'DISABLED' },
  { label: '已售完', value: 'SOLD_OUT' },
  { label: '已禁卖', value: '???' },
  { label: '草稿', value: 'DRAFT' },
  { label: '发布中', value: 'IN_PROCESS' },
  { label: '发布失败', value: 'UPDATE_FAILED' }
]

export const onCell = (record: Record) => ({
  rowSpan: record.rowSpan
})

export const fields = [
  {
    title: '商品名称&店铺',
    key: 'name',
    onCell,
    width: 300,
    render: (value: string, record: Record) => {
      return (
        <div style={{ height: '100%' }}>
          <Space>
            <AySearchList.Selection record={record} />
            <Image style={{ flexShrink: 0 }} src={record.image} width={80} height={80} />
            <div>
              <div>
                <a href={record.shopUrl}>
                  {record.details.length > 0 && <span style={{ color: 'orange' }}>[多规格]</span>}
                  {value}
                </a>
              </div>
              <span className="tag">{record.shopName}</span>
            </div>
          </Space>
        </div>
      )
    },
    search: {
      title: '商品名称',
      type: 'input-group',
      key: '__group',
      children: [
        {
          type: 'select',
          key: 'keywordType',
          options: [
            { label: '商品名称', value: 1 },
            { label: 'SKU', value: 2 }
          ],
          defaultValue: 1,
          allowClear: false,
          style: {
            width: 100
          }
        },
        {
          key: 'keyword',
          style: {
            width: `calc(100% - 100px)`
          }
        }
      ]
    }
  },
  {
    title: '父规格',
    key: 'spu',
    width: 120,
    search: {
      title: '绑定主 SKU',
      key: 'sku',
      type: 'select',
      style: {
        width: 120
      },
      options: [
        { label: '商品名称', value: 1 },
        { label: 'SKU', value: 2 }
      ]
    },
    render: (value: string) => value || '-',
    onCell
  },
  {
    table: false,
    search: {
      title: '排序',
      key: 'sort',
      type: 'select',
      style: {
        width: 120
      },
      options: [
        { label: '商品名称', value: 1 },
        { label: 'SKU', value: 2 }
      ]
    }
  },
  {
    title: '规格',
    dataIndex: ['child', 'name'],
    key: 'childName'
  },
  {
    title: 'SKU',
    dataIndex: ['child', 'sku'],
    key: 'childSku'
  },
  {
    title: '价格',
    dataIndex: ['child', 'price'],
    key: 'childPrice',
    align: 'right',
    renderType: 'unit',
    prefix: '¥'
  },
  {
    title: '库存',
    dataIndex: ['child', 'stock'],
    key: 'childStock',
    align: 'right',
    renderType: 'unit',
    prefix: 'x'
  },
  {
    title: '创建时间',
    width: 120,
    key: 'createDateTime',
    renderType: 'datetime',
    onCell
  },
  {
    title: '创建时间',
    width: 120,
    key: 'updateDatetime',
    renderType: 'datetime',
    onCell
  }
]

export const extendFields = [
  {
    title: 'TikTok 类目',
    key: 'type',
    type: 'select',
    options: [
      { label: '商品名称', value: 1 },
      { label: 'SKU', value: 2 }
    ]
  },
  {
    title: '更新时间',
    key: 'date',
    type: 'custom',
    defaultValue: [],
    renderContent: () => <DatePicker.RangePicker className="max-width" />
  }
]

export const topFields = [
  {
    title: '国家/地区',
    key: 'country',
    type: 'card-group',
    options: [
      {
        label: '中国',
        value: 1,
        cover: <span className="cover">🇨🇳</span>
      },
      {
        label: '日本',
        value: 2,
        cover: <span className="cover">🇯🇵</span>
      },
      {
        label: '美国',
        value: 3,
        cover: <span className="cover">🇺🇸</span>
      },
      {
        label: '印度尼西亚',
        value: 4,
        cover: <span className="cover">🇮🇩</span>
      }
    ]
  },
  {
    title: '店铺',
    key: 'shopId',
    type: 'tag-group',
    options: [
      { label: '店铺A', value: 1 },
      { label: '店铺B', value: 2 },
      { label: '店铺C', value: 3 },
      { label: '店铺D', value: 4 }
    ]
  }
]
