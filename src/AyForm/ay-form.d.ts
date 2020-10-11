import { ReactNode } from 'react'

/**
 * 可以选择下面 type 对应的类型
 * @param input 输入框
 * @param password 密码框
 * @param textarea 多行输入框
 * @param select 选择框
 * @param switch 开关
 * @param checkbox 多选框（单个）
 * @param checkbox-group 多选组
 * @param radio-group 单选组
 * @param date 日期
 * @param dadate-rangete 日期区间
 * @param empty 空白框
 */
declare type FormType =
  | 'input'
  | 'password'
  | 'number'
  | 'percent'
  | 'editor'
  | 'select'
  | 'switch'
  | 'checkbox'
  | 'checkbox-group'
  | 'radio-group'
  | 'textarea'
  | 'date'
  | 'date-range'
  | 'empty'
  | 'custom'

/**
 * 所有 field 的 最小单元，会被这些类型扩展: AyForm AySearch AyTable AySearchTable AyDialogForm
 */
declare interface Field {
  /** 标题 */
  title?: string
  /** 相应的 key */
  key?: string
  /** 对应类型 */
  type?: FormType
  /**
   * 配置项，是一个数组，数组每个对象可以配置[{ label; value; disable? }]
   * @param {Array} 选项
   * @param label 页面展示的值
   * @param value 实际所取到的值
   * @param disable 是否禁用
   */
  options?: Array<Option>
}

declare interface Option {
  /** 页面展示的值 */
  label: string | number

  /** 实际所取到的值 */
  value: any

  /** 是否禁用 */
  disabled?: boolean
}

declare interface AyFormField extends Field {
  /** 相应的 key，会跟最后表单取到的项目相关; form 的 key 值必填 */
  key: string
  /** Grid Col 占位 [0 - 24] */
  span?: number
  /** Grid Col 偏移 */
  offset?: number
  /** 默认值 */
  defaultValue?: any
  /** 是否默认必填 */
  required?: boolean
  /** 权限配置 */
  rules?: Array<AnyKeyProps>
  /** 是否展示，保留占位; 保留默认值 */
  visible?: boolean | Function
  /** 是否展示，不会占位; 保留默认值 */
  hidden?: boolean | Function
  /** 默认的属性 */
  props?: {
    /** 输入框、选择框未输入文字时的提示 */
    placeholder?: string
    [key: string]: any
  }
  formItemProps?: AnyKeyProps
  /** 多选框后面跟随的文字 */
  checkboxChildren?: string | ReactNode
  /** 自定义 content 内容 */
  renderContent?(field: AyFormField, record: AnyKeyProps): ReactNode
  /** 自定义 render */
  render?(field: AyFormField, record: AnyKeyProps): ReactNode
  /** 数据变化监听 */
  onChange?(value: ReactNode, values: AnyKeyProps, setFieldsValue: (params: AnyKeyProps) => void): void
  /** 提示文字 */
  help?: string | ReactNode

  replaceReg?: RegExp
  /** 时间格式化的开始时间 */
  startKey?: string
  /** 时间格式化的结束时间 */
  endKey?: string

  _field?: any
  /** 重新渲染 */
  reSetting?(params: AyFormField, mode: string): AyFormField
  /** 初始化参数 */
  _values?: AnyKeyProps
  /** 默认排序 */
  order?: number
  [key: string]: any
}
