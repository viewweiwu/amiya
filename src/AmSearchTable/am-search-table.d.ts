export interface ExtendField extends Field, AmFormField {
  key?: string
  /**
   * 是否必填
   * 请(输入|选择)${label}
   * 例如，请输入用户名
   * */
  required?: boolean
  /** 默认值 */
  defaultValue?: any
  /** 属性 */
  props?: AnyKeyProps
  /** date-range 时有用，是否在提交时拆解多个属性并且转化成字符串 */
  startKey?: string
  /** date-range 时有用，是否在提交时拆解多个属性并且转化成字符串 */
  endKey?: string
  /** 隐藏列 */
  hiddenMode?: Array<ModeType>
}

export interface AmSearchTableField extends Field {
  /** AmSearch 需要的扩展参数，里面的属性比外面的属性优先级更高 */
  search?: ExtendField
  /** AmDialogForm 需要的扩展参数，里面的属性比外面的属性优先级更高 */
  dialog?: ExtendField
  /** AmTable 需要的扩展参数，里面的属性比外面的属性优先级更高 */
  table?: AmTableField
  [key: string]: any
}

export interface TableRefProps {
  refresh(): void
  reset(search: AnyKeyProps): void
}

export interface FormRefProps {
  add: (params?: AnyKeyProps | undefined) => Promise<AnyKeyProps>
  view: (params?: AnyKeyProps | undefined) => Promise<AnyKeyProps>
  update: (params?: AnyKeyProps | undefined) => Promise<AnyKeyProps>
}

export interface Row extends AnyKeyProps {}
