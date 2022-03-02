import { AySearchTableField } from '../AySearchTable/ay-search-table'
import { AyFormField } from '../AyForm/ay-form'

declare const AyField: React.ForwardRefExoticComponent<(AySearchTableField | AyFormField) &
  React.RefAttributes<HTMLDivElement>>

export default AyField
