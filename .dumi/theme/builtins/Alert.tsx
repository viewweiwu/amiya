import React from 'react'
import { InfoCircleFilled } from '@ant-design/icons'

export default function MyAlert(props: any) {
  return (
    <span
      style={{
        display: 'block',
        backgroundColor: '#e6f7ff',
        border: '1px solid #91d5ff',
        borderRadius: 2,
        padding: '8px 15px'
      }}
    >
      <InfoCircleFilled style={{ color: '#1890ff', marginRight: 8 }} />
      {props.children}
    </span>
  )
}
