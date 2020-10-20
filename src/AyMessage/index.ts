import { ReactNode } from 'react'
import { message } from 'antd'

export const success = (msg: ReactNode, duration?: number) => {
  return message.success(msg, duration)
}

export const error = (msg: ReactNode, duration?: number) => {
  return message.error(msg, duration)
}

export const info = (msg: ReactNode, duration?: number) => {
  return message.info(msg, duration)
}

export default {
  success,
  error,
  info
}
