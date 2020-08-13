import { ReactNode } from 'react'
import { message } from 'antd'

export const success = (msg: ReactNode, duration?: number) => {
  return message.success(msg, duration)
}

export const error = (msg: ReactNode) => {
  return message.error(msg)
}

export const info = (msg: ReactNode) => {
  return message.info(msg)
}
