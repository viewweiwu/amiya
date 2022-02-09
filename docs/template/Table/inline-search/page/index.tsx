import React from 'react'
import { AyField, AyFields, AySearchTable } from 'amiya'
import { listApi } from '../api'

export default function Demo() {
  return (
    <AySearchTable api={listApi} searchExtend={{ inline: true }} extraVisible={false}>
      <AyFields>
        <AyField title="商品名称" key="name" search />
        <AyField
          title="商品类型"
          key="type"
          type="select"
          search
          options={[
            { label: '普通商品', value: 1 },
            { label: '活动商品', value: 2 },
            { label: '优惠商品', value: 3 }
          ]}
        />
        <AyField
          title="审核状态"
          key="status"
          renderType="status"
          search={{
            type: 'select'
          }}
          options={[
            { label: '申请中', value: 1, status: 'processing' },
            { label: '已通过', value: 2, status: 'success' },
            { label: '已拒绝', value: 3, status: 'error' }
          ]}
        />
        <AyField title="申请时间" key="applyTime" renderType="datetime" type="date-range" search />
      </AyFields>
    </AySearchTable>
  )
}
