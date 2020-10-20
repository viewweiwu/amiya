export interface AyActionProps {
  /** 子元素 */
  children: string
  action?: 'add' | 'update' | 'delete' | 'batch-delete' | 'view' | string
  record?: AnyKeyProps
  [key: string]: any
}
