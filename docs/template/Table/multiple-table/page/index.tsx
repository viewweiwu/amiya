import React, { useEffect, useMemo, useRef, useState } from 'react'
import { AyCardGroup, AySearchTable } from 'amiya'
import { auditListApi, goodsListApi, operationListApi } from '../api'
import { AppstoreOutlined, PushpinOutlined, SolutionOutlined } from '@ant-design/icons'

const options = [
  {
    label: '商品信息',
    value: 1,
    cover: <AppstoreOutlined />,
    api: goodsListApi,
    fields: [
      { title: '商品名称', key: 'goodsName', ellipsis: true },
      { title: '规格', key: 'sku', tooltip: '商品规格信息' },
      { title: '单价', key: 'price', renderType: 'unit', prefix: '¥' },
      { title: '数量', key: 'count', renderType: 'unit', prefix: 'x' }
    ]
  },
  {
    label: '审核记录',
    value: 2,
    cover: <PushpinOutlined />,
    api: auditListApi,
    fields: [
      { title: '审核人', key: 'auditName' },
      { title: '审核时间', key: 'createDate', renderType: 'datetime' },
      {
        title: '状态',
        key: 'status',
        renderType: 'status',
        options: [
          { label: '待审核', value: 1, status: 'processing' },
          { label: '已通过', value: 2, status: 'success' },
          { label: '已拒绝', value: 3, status: 'error' }
        ]
      },
      { title: '备注', key: 'memo' }
    ]
  },
  {
    label: '操作记录',
    value: 3,
    cover: <SolutionOutlined />,
    api: operationListApi,
    fields: [
      { title: '操作人', key: 'operatorName' },
      { title: '操作时间', key: 'createDate' },
      { title: '操作内容', key: 'content' },
      { title: '备注', key: 'memo' }
    ]
  }
]

export default function Demo() {
  const tableRef = useRef<any>()
  // 当前命中的选项值
  const [activeCardValue, setActiveCardValue] = useState(1)
  // 当前命中的 table 配置
  const currOption = useMemo(() => {
    let option = options.find(option => option.value === activeCardValue)
    return option
  }, [activeCardValue])

  useEffect(() => {
    // 刷新列表
    tableRef.current.reset()
  }, [activeCardValue])

  return (
    <div>
      <AySearchTable
        ref={tableRef}
        api={currOption?.api}
        autoload={false}
        title={<AyCardGroup options={options} value={activeCardValue} onChange={setActiveCardValue} />}
        fields={currOption?.fields || []}
      />
    </div>
  )
}
