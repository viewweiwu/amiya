import React from 'react'
import { Tag } from 'antd'
import { Option } from '../AyForm/ay-form'
import locale from '../locale'

const { CheckableTag } = Tag

type ValueType = Array<string | number> | string | number | undefined

interface AyTagGroupProps {
  value?: any
  onChange?: (values: ValueType) => void
  /** 是否支持选择多个 */
  multiple?: boolean
  /** 选项 */
  options?: Array<Option>
  /** 是否展示全部 */
  showAllChecked?: boolean
  /** 全部文字类型 */
  allCheckedText?: string
  /** 是否只读 */
  readonly?: boolean
}

export default function AyTagGroup(props: AyTagGroupProps) {
  let { value, multiple, onChange, options, showAllChecked, allCheckedText, readonly } = props
  // 如果是多选，且没有默认值，则默认值视为空数组
  if (multiple && value === undefined) {
    value = []
  }
  // 是否是多选
  const isMultiple = multiple && Array.isArray(value)
  // 是否是空值
  const isEmpty = isMultiple ? value.length === 0 : value === undefined

  /** 全选 */
  const handleAllSelect = () => {
    if (readonly) {
      return
    }
    let newValue: any

    if (isMultiple) {
      newValue = []
    } else {
      newValue = undefined
    }

    if (onChange) {
      onChange(newValue)
    }
  }

  /**
   * 切换选中
   * @param checked 是否选中
   * @param option 当前选项
   * @param i 当前选项 id
   */
  const handleTagSelect = (checked: boolean, option: Option, i: number) => {
    if (readonly) {
      return
    }
    let newValue: ValueType
    if (checked) {
      if (isMultiple) {
        newValue = [...value, option.value]
      } else {
        newValue = option.value
      }
    } else {
      if (isMultiple) {
        newValue = value.filter((v: ValueType) => v !== option.value)
      } else {
        newValue = undefined
      }
    }
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div>
      {showAllChecked !== false && (
        <CheckableTag key="all" checked={isEmpty} onChange={handleAllSelect}>
          {allCheckedText || locale.tagGroup.all}
        </CheckableTag>
      )}
      {(options || []).map((option: Option, i: number) => (
        <CheckableTag
          key={option.value}
          checked={isMultiple ? value.includes(option.value) : value === option.value}
          onChange={checked => handleTagSelect(checked, option, i)}
        >
          {option.label}
        </CheckableTag>
      ))}
    </div>
  )
}
