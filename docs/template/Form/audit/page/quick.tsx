import React from 'react'
import { message, Space } from 'antd'
import { AyButton, FormValues } from 'amiya'

/** 审批通过 */
const PASS = 1
/** 审批拒绝 */
const DENIED = 2

const addApi = (values: FormValues): Promise<any> => {
  console.log(values)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({})
    }, 300)
  })
}

export default function Demo() {
  const handleAudit = (type: number) => {
    addApi({ type: PASS }).then(() => {
      message.success(type === PASS ? '已通过' : '已拒绝')
    })
  }

  return (
    <div>
      <Space>
        <AyButton type="link" danger confirm confirmMsg="确定要拒绝吗？" onConfirm={() => handleAudit(DENIED)}>
          拒绝
        </AyButton>
        <AyButton type="link" confirm confirmMsg="确定要通过吗？" onConfirm={() => handleAudit(PASS)}>
          通过
        </AyButton>
      </Space>
    </div>
  )
}
