import { ReactNode } from 'react'
import { AnyKeyProps } from '@/types/AnyKeyProps'

export interface AyCtrlProps extends AnyKeyProps {
  max?: number
  more?: ReactNode
  children: Array<ReactNode> | ReactNode
}
