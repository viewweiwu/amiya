import { AyFormProps, RegisterFieldProps } from './ay-form'

// 自定义表单类型
export declare function registerField(
  /** 表单类型 */
  fieldType: string,
  /** field 具体实现 */
  field: RegisterFieldProps
): void

declare const AyForm: React.ForwardRefExoticComponent<AyFormProps & React.RefAttributes<HTMLDivElement>>

export default AyForm
