import { AnyKeyProps } from '../types/AnyKeyProps'
import { registerAction } from './index'

export interface AyActionProps {
  /** 子元素 */
  children: string
  action?: 'add' | 'update' | 'delete' | 'batch-delete' | 'view' | string
  record?: AnyKeyProps
  [key: string]: any
}
