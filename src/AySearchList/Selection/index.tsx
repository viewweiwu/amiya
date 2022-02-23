import { AnyKeyProps } from '@/types/AnyKeyProps'
import { Record } from '@/types/Record'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import React, { useContext } from 'react'
import { AySearchTableContext } from '../../AySearchTable/context'

interface SelectionProps {
  record: AnyKeyProps
}

export default function Selection(props: SelectionProps) {
  // @ts-ignore
  const { selection, rowKey, addSelection, removeSelection } = useContext(AySearchTableContext)
  const { record, ...extendProps } = props

  const isChecked = selection.some((row: Record) => record[rowKey] === row[rowKey])
  const toggleChecked = (checked: boolean) => {
    if (checked) {
      addSelection([record])
    } else {
      removeSelection(null, record)
    }
  }
  return <Checkbox {...extendProps} checked={isChecked} onChange={e => toggleChecked(e.target.checked)} />
}
