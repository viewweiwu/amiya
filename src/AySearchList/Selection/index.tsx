import { AnyKeyProps } from '@/types/AnyKeyProps'
import { Record } from '@/types/Record'
import { getKey, getRowKey } from '../../utils'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import React, { useContext, useEffect } from 'react'
import { AySearchTableContext } from '../../AySearchTable/context'
import { AyListContext } from '../../AyList/context'

interface SelectionProps {
  record: AnyKeyProps
  disabled?: boolean
}

export default function Selection(props: SelectionProps) {
  // @ts-ignorese
  const { selection, rowKey, addSelection, removeSelection } = useContext(AySearchTableContext)
  const { disabledKeys, setDisabledKeys } = useContext(AyListContext)
  const { record, disabled, ...extendProps } = props

  const isChecked = selection.some((row: Record) => getKey(record, rowKey) === getKey(row, rowKey))
  const toggleChecked = (checked: boolean) => {
    if (checked) {
      addSelection([record])
    } else {
      removeSelection(null, record)
    }
  }

  useEffect(() => {
    if (disabled) {
      // 如果禁用了，没有注册过就补一个
      if (!disabledKeys.includes(getKey(record, rowKey))) {
        setDisabledKeys([...disabledKeys, getKey(record, rowKey)])
      }
    } else {
      // 如果没有禁用，注册过就删掉
      if (disabledKeys.includes(getKey(record, rowKey))) {
        setDisabledKeys(disabledKeys.filter((key: string) => key !== getKey(record, rowKey)))
      }
    }
  }, [disabled, disabledKeys])

  return (
    <Checkbox
      {...extendProps}
      disabled={disabled}
      checked={isChecked}
      onChange={e => toggleChecked(e.target.checked)}
    />
  )
}
