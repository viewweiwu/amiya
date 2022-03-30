import React, { useMemo } from 'react'
import { Tag } from 'antd'
import { FormValues, Option, AnyKeyProps, AySearchTableField, AyFormField, AyButton } from 'amiya'

interface IProps {
  /** 查询数据 */
  searchValues: FormValues
  /** 扩展顺序 */
  extendValues: FormValues
  /** 不展示的 keys */
  noVisibleKeys: Array<string>
  /** label 的翻译字典 */
  keyMap: AnyKeyProps
  /** 查询的配置 */
  searchFields: Array<AySearchTableField>
  /** 扩展的配置 */
  extendFields: Array<AyFormField>
  /** 删除查询数据 */
  onRemoveSearchValue: (key: string) => void
  /** 删除扩展数据 */
  onRemoveExtendValue: (key: string) => void
  /** 清除全部 */
  clearAll: () => void
}

/** 获取值 */
const getValue = (value: string | [moment.Moment, moment.Moment]) => {
  if (Array.isArray(value)) {
    if (value[0]) {
      return (
        <span>
          {value[0].format('YYYY-MM-DD')}~{value[1].format('YYYY-MM-DD')}
        </span>
      )
    }
    return '-'
  }
  return value
}

/** 获取标题  */
const getLabel = (
  key: string,
  keyMap: AnyKeyProps,
  searchFields: Array<AySearchTableField>,
  extendFields: Array<AyFormField>
) => {
  let label: string = ''
  if (keyMap[key]) {
    return keyMap[key]
  }

  let loop = (fields: Array<AySearchTableField | AyFormField>) => {
    fields.forEach(field => {
      if (label) {
        return
      }
      if (field.search && field.search.key === key) {
        label = field.search.title as string
      } else if (field.key === key) {
        label = field.title as string
      }
      if (field.children && field.children.length) {
        loop(field.children as Array<AySearchTableField | AyFormField>)
      }
    })
  }

  loop(searchFields)

  if (!label) {
    loop(extendFields)
  }

  return label || key
}

/** 值是否存在 */
const hasValue = (value: any) => {
  if (value === undefined || value === null) {
    return false
  } else if (Array.isArray(value) && !value[0]) {
    return false
  }
  return true
}

export default function SearchData(props: IProps) {
  const {
    searchValues,
    noVisibleKeys,
    extendValues,
    searchFields,
    extendFields,
    keyMap,
    onRemoveSearchValue,
    onRemoveExtendValue,
    clearAll
  } = props

  // 获取选项
  const options = useMemo(() => {
    let options: Array<Option> = []
    Object.entries(searchValues).forEach((option: any) => {
      if (noVisibleKeys.includes(option[0])) {
        return false
      }

      if (hasValue(option[1])) {
        options.push({
          label: getLabel(option[0], keyMap, searchFields, extendFields),
          value: getValue(option[1]),
          type: 'search'
        })
      }
    })
    return options
  }, [searchValues, extendValues, noVisibleKeys])

  /** 删除标签 */
  const onTagClose = (option: Option) => {
    if (option.key in extendValues) {
      onRemoveExtendValue(option.key)
    } else {
      onRemoveSearchValue(option.key)
    }
  }

  return (
    <div>
      {options.map(option => (
        <Tag key={option.type + option.label} closable onClose={() => onTagClose(option)}>
          {option.label}:{option.value}
        </Tag>
      ))}
      {options.length > 0 && (
        <AyButton type="link" onClick={() => clearAll()}>
          清除
        </AyButton>
      )}
    </div>
  )
}
