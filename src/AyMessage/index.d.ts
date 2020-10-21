import { ReactNode } from 'react'
import { MessageType } from 'antd/lib/message'

/**
 * 成功消息框
 */
export declare function success(msg: ReactNode, duration?: number): MessageType

/**
 * 普通消息框
 */
export declare function info(msg: ReactNode, duration?: number): MessageType

/**
 * 失败消息框
 */
export declare function error(msg: ReactNode, duration?: number): MessageType

/**
 * 警告消息框
 */
export declare function warning(msg: ReactNode, duration?: number): MessageType

declare const AyMessage: React.ForwardRefExoticComponent<{} & React.RefAttributes<HTMLDivElement>>

export default AyMessage
