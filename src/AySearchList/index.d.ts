import { AySearchListProps } from './ay-search-list'
import Selection from './Selection'
import SelectionAll from './SelectionAll'

declare const AySearchList: React.ForwardRefExoticComponent<AySearchListProps & React.RefAttributes<HTMLDivElement>> & {
  Selection?: typeof Selection
  SelectionAll?: typeof SelectionAll
}

export default AySearchList
