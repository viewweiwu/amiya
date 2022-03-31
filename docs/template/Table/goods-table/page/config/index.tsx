import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Record, AySearchList, Option, useOptions, AyFormField, AnyKeyProps } from 'amiya'
import { Space, Image, DatePicker } from 'antd'
import { apiGetCountryOptions, apiGetShopOptions } from '../api'

export const defaultTabOptions: Array<Option> = [
  { label: '已上架', value: '1' },
  { label: '已下架', value: '2' },
  { label: '已售完', value: '3' },
  { label: '已禁卖', value: '4' },
  { label: '草稿', value: '5' }
]

export const onCell = (record: Record) => ({
  rowSpan: record.rowSpan
})

export const fields = [
  {
    title: <AySearchList.SelectionAll />,
    key: 'selection',
    width: 50,
    onCell,
    render: (value: string, record: Record) => (
      <AySearchList.Selection record={record} disabled={record.rowSpan === 0} />
    )
  },
  {
    title: '商品名称&店铺',
    key: 'name',
    onCell,
    width: 300,
    render: (value: string, record: Record) => {
      return (
        <div style={{ height: '100%' }}>
          <Space>
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
            { label: '规格名称', value: 2 }
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
      title: '规格',
      key: 'sku',
      type: 'select',
      style: {
        width: 120
      },
      options: [
        { label: '规格选项A', value: 1 },
        { label: '规格选项B', value: 2 }
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
        { label: '排序A', value: 1 },
        { label: '排序B', value: 2 }
      ]
    }
  },
  {
    title: '规格',
    dataIndex: ['child', 'name'],
    key: 'childName',
    render: (value: string, record: Record) => (
      <span>
        {value}
        <AySearchList.Selection style={{ display: 'none' }} record={record} disabled={record.rowSpan === 0} />
      </span>
    )
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
    title: '类目',
    key: 'type',
    type: 'select',
    options: [
      { label: '类目1', value: 1 },
      { label: '类目2', value: 2 },
      { label: '类目3', value: 3 },
      { label: '类目4', value: 4 }
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

// 顶部查询区域配置
export const useTopFields = () => {
  const [firstLoad, setFirstLoad] = useState(true)
  // 国家选项
  const { options: countryOptions } = useOptions(apiGetCountryOptions, {
    transform: (option: Option) => {
      return {
        ...option,
        cover: <span className="cover">{option.cover}</span>
      }
    },
    // 加载国家后设置默认国家ID
    onLoad: ({ options }: AnyKeyProps) => {
      setCountryId(options[0].value)
    }
  })
  // 国家 ID
  const [countryId, setCountryId] = useState<string | undefined>('')
  // 店铺选项
  const { options: shopOptions, load: loadShopOptions } = useOptions(apiGetShopOptions, {
    autoload: false,
    params: { countryId },
    onLoad: ({ options }: AnyKeyProps) => {
      setFirstLoad(false)
      setShopId(undefined)
    }
  })
  // 店铺 ID
  const [shopId, setShopId] = useState<string | undefined>(undefined)
  // 扩展查询参数
  const searchValues = useMemo(() => {
    return {
      shopId,
      countryId
    }
  }, [shopId, countryId])

  useEffect(() => {
    if (countryId) {
      loadShopOptions()
    }
  }, [countryId])

  const topFields: Array<AyFormField> = useMemo(() => {
    return [
      {
        title: '国家/地区',
        key: 'countryId',
        type: 'card-group',
        options: countryOptions,
        cancelable: false,
        onChange: (value: string) => {
          setCountryId(value)
        }
      },
      {
        title: '店铺',
        key: 'shopId',
        type: 'tag-group',
        options: shopOptions,
        cancelable: false,
        onChange: (value: string) => {
          setShopId(value)
        }
      }
    ]
  }, [countryOptions, shopOptions])

  return {
    topFields,
    searchValues,
    firstLoad
  }
}
