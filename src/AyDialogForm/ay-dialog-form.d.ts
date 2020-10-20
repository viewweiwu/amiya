import { ExtendField } from '../AySearchTable/ay-search-table'
import { ModalProps } from 'antd/lib/modal'

declare type ModeType = 'add' | 'update' | 'view' | 'custom'

export interface AyDialogFormProps extends ModalProps {
  /** 弹窗标题 */
  title?: string
  /** 表单项 */
  fields: Array<AyDialogFormField>
  /** form 的 span */
  span?: number
  /** 新增 api */
  addApi?(params?: AnyKeyProps): Promise<AnyKeyProps>
  /** 修改 api */
  updateApi?(params?: AnyKeyProps): Promise<AnyKeyProps>
  /** 弹窗宽度 */
  width?: number
  /** 表单名字 */
  name?: string
  /** 提交前校验 */
  beforeSubmit?(params?: AnyKeyProps, mode?: string): boolean | AnyKeyProps
}

export interface AyDialogFormField extends Field {
  /** 弹窗选项 */
  dialog?: ExtendField

  /** table 参数 (写了也没用) */
  table?: any

  /** search 参数 (写了也没用) */
  search?: any
}

export interface AydialogFormRef {
  /**
   * 弹窗新增模式
   * @param params 初始表单数据
   * @param title 弹窗标题，默认“新增”
   */
  add(params?: AnyKeyProps, title?: ReactNode): Promise<any>
  /**
   * 弹窗修改模式
   * @param params 初始表单数据
   * @param title 弹窗标题，默认“修改”
   */
  update(params?: AnyKeyProps, title?: ReactNode): Promise<any>
  /**
   * 弹窗详情模式
   * @param params 初始表单数据
   * @param title 弹窗标题，默认“详情”
   */
  view(params?: AnyKeyProps, title?: ReactNode): void
}
