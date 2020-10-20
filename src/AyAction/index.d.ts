import { AyActionProps } from './ay-action'
import { AnyKeyProps } from '../types/AnyKeyProps'

// 自定义指令
export declare function registerAction(
  /** 指令名称 */
  actionName: string,
  /** 指令内容 */
  action: (
    /** 当前对象属性 */
    props: AnyKeyProps,
    /** 当前行数据 */
    record: AnyKeyProps,
    /** searchTable 对象 */
    searchTable: AnyKeyProps
  ) => AnyKeyProps
): void

declare const AyAction: React.ForwardRefExoticComponent<AyActionProps & React.RefAttributes<HTMLDivElement>>

export default AyAction
