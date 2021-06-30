import { AnyKeyProps } from '@/types/AnyKeyProps'
import { AyFormField } from '../AyForm/ay-form'
import { ExtendField } from '../AySearchTable/ay-search-table'

export interface AySearchProps {
  fields: Array<AySearchField>
  onConfirm?(values: AnyKeyProps): void
  onReset?(): void
  span?: number
}

export interface AySearchField extends AyFormField {
  search?: ExtendField
  [key: string]: any
}
