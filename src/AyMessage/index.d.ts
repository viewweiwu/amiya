import { ReactNode } from 'react'
import { MessageType } from 'antd/lib/message'

/**
 * 成功消息框
 */
type success = (msg: ReactNode, duration?: number) => MessageType

/**
 * 普通消息框
 */
type info = (msg: ReactNode, duration?: number) => MessageType

/**
 * 失败消息框
 */
type error = (msg: ReactNode, duration?: number) => MessageType

export { success, info, error }
