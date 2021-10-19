import React from 'react'
import { Alert } from 'antd'

export default function MyAlert(props: any) {
  return <Alert style={{ marginBottom: 16 }} showIcon type={props.type} message={props.children} />
}
