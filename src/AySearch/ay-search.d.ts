import { AnyKeyProps } from '@/types/AnyKeyProps'
import { AyFormField } from '../AyForm/ay-form'
import { ExtendField } from '../AySearchTable/ay-search-table'

export interface AySearchProps {
  fields: Array<AySearchField>
  onConfirm?(values: AnyKeyProps): void
  onReset?(): void
  formExtend?: AnyKeyProps
  /** 是否默认打开 */
  defaultOpen?: boolean
  /** 是否展示切换开关 */
  toggleVisible?: boolean
  /** 查询占用的格数 */
  actionSpan?: number
}

export interface AySearchField extends AyFormField {
  search?: ExtendField
  span?: {
    large: number
    middle: number
    small: number
    mini: number
  }
  [key: string]: any
}
