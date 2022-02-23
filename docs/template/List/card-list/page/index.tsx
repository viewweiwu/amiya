import React, { useRef, useState } from 'react'
import { AySearchList, AyFields, AyField, Record, AnyKeyProps } from 'amiya'
import { List, Card, Image, Space, Divider } from 'antd'
import { listApi } from '../api'
import '../less/index.less'

/** 每个表单占格 */
const block = {
  large: 24,
  middle: 24,
  small: 24,
  mini: 24
}

/** 输入框最大宽度 */
let sizeStyle = {
  width: 300
}

/** 地址选项 */
const addressOptions = [
  { label: '北京', value: 1 },
  { label: '上海', value: 2 },
  { label: '广州', value: 3 },
  { label: '深圳', value: 4 },
  { label: '重庆', value: 5 },
  { label: '陕西', value: 6 }
]

/** 商品类型选项 */
const goodsTypeOptions = [
  { label: '零食', value: 1 },
  { label: '手机', value: 2 },
  { label: '茶酒', value: 3 },
  { label: '清洁', value: 4 },
  { label: '女装', value: 5 },
  { label: '内衣', value: 6 },
  { label: '家居', value: 7 },
  { label: '女鞋', value: 8 },
  { label: '男鞋', value: 9 },
  { label: '箱包', value: 10 },
  { label: '玩具', value: 11 },
  { label: '生鲜', value: 12 },
  { label: '收纳', value: 13 },
  { label: '家纺', value: 14 }
]

export default function Demo() {
  // 列表控制
  const listRef = useRef<any>()
  // 查询参数
  const [searchValue, setSearchValue] = useState({})

  /** 刷新列表 */
  const reloadList = () => {
    listRef.current.reset()
  }

  return (
    <div className="card-list">
      <AySearchList
        title="商品列表"
        api={listApi}
        searchExtend={{
          // 查询区域展示最大行数
          visibleRow: 99,
          // 不需要标点
          colon: false,
          // 隐藏查询按钮
          actionVisible: false,
          // 标签对齐方式
          labelAlign: 'left'
        }}
        listExtend={{
          grid: {
            // 网格间的距离
            gutter: 16,
            // 不同分辨率下的卡片个数
            xs: 1,
            sm: 1,
            md: 1,
            lg: 2,
            xl: 3,
            xxl: 5
          }
        }}
        pagination={{ pageSize: 20 }}
        ref={listRef}
        onParamsChange={(searchParams: AnyKeyProps) => {
          // 翻页 & 查询时，滚动到最顶部
          window.scrollTo({ behavior: 'smooth', top: 0 })
          setSearchValue(searchParams)
        }}
        renderItem={(record: Record) => {
          // 卡片渲染内容
          return (
            <List.Item key={record.id}>
              <Card cover={<Image alt="example" height={200} src={record.cover} />} bodyStyle={{ padding: 12 }}>
                <div>{record.name}</div>
                <Space>
                  <span className="price">
                    <span className="unit">¥</span>
                    {record.price}
                  </span>
                  <span className="sub">{record.buyNum}人已购买</span>
                </Space>
              </Card>
            </List.Item>
          )
        }}
      >
        {/* 查询区域设置 */}
        <AyFields>
          <AyField
            title="商品名称"
            key="keyword"
            search={{
              type: 'search',
              grid: block,
              style: sizeStyle
            }}
          />
          <AyField
            title="商品类型"
            key="goodsType"
            search={{
              type: 'tag-group',
              grid: block,
              options: goodsTypeOptions,
              onChange: reloadList
            }}
          />
          <AyField
            title="发货地区"
            key="goodsAddress"
            search={{
              type: 'tag-group',
              grid: block,
              options: addressOptions,
              multiple: true,
              onChange: reloadList
            }}
          />
          <AyField title="价格区间" key="__price" search={{ grid: block }} type="input-group">
            <AyField key="min" placeholder="最低价" className="price-input" onBlur={reloadList} />
            <AyField
              key="__gap"
              render={() => (
                <span key="gap" className="price-gap">
                  ~
                </span>
              )}
            />
            <AyField key="max" placeholder="最高价" className="price-input" onBlur={reloadList} />
          </AyField>
          <AyField
            title="销售时间"
            key="date"
            search={{ grid: block, style: sizeStyle, type: 'date-range', onChange: reloadList }}
          />
        </AyFields>
      </AySearchList>
      {/* 页面打印用，实际使用删掉即可 */}
      <Divider orientation="left">查询参数</Divider>
      {Object.keys(searchValue).length && <pre>{JSON.stringify(searchValue, null, 2)}</pre>}
    </div>
  )
}
