import React, { CSSProperties } from 'react'
import { Option } from '../AyForm/ay-form'
import classNames from 'classnames'
import { FORM_DEFAULT_VALUE_CARD_GROUP } from '../constant'
import './index.less'

type ValueType = Array<string | number> | string | number | undefined

export interface AyCardGroupProps {
  value?: any
  onChange?: (values: ValueType) => void
  /** 是否支持选择多个 */
  multiple?: boolean
  /** 选项 */
  options?: Array<Option>
  /** 是否只读 */
  readonly?: boolean
  /** 尺寸 */
  size?: 'default' | 'large'
  /** 卡片样式 */
  cardStyle?: CSSProperties
  /** 是否可以取消 */
  cancelable: boolean
  className?: string
  style?: CSSProperties
}

const classPrefix = 'ay-card-group'

const getCoverNode = (option: Option, props: AyCardGroupProps) => {
  const { size } = props
  return option.cover ? (
    <div
      className={classNames(`${classPrefix}-cover`, !option.label && !option.description && `${classPrefix}-no-info`)}
    >
      {typeof option.cover === 'string' ? (
        <img
          src={option.cover}
          width={size === 'large' ? 48 : 24}
          height={size === 'large' ? 48 : 24}
          alt=""
          draggable={false}
        />
      ) : (
        option.cover
      )}
    </div>
  ) : null
}

export default function AyCardGroup(props: AyCardGroupProps) {
  const {
    value = [],
    onChange,
    options,
    size = 'default',
    readonly,
    multiple = false,
    cardStyle,
    cancelable = true,
    className,
    style
  } = props

  const handleSelect = (option: Option) => {
    // 禁用和只读不处理
    if (option.disabled || readonly) {
      return
    }
    if (multiple && Array.isArray(value)) {
      // 多选
      if (value.includes(option.value)) {
        triggerChange(value.filter(v => v !== option.value))
      } else {
        triggerChange([...value, option.value])
      }
    } else {
      // 单选
      if (option.value === value) {
        if (cancelable) {
          triggerChange(FORM_DEFAULT_VALUE_CARD_GROUP)
        }
      } else {
        triggerChange(option.value)
      }
    }
  }

  const triggerChange = (value: any) => {
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <ul
      className={classNames(
        className,
        classPrefix,
        classPrefix + '-' + size,
        readonly && `${classPrefix}-readonly`,
        multiple && `${classPrefix}-multiple`
      )}
      style={style}
    >
      {(options || []).map(option => (
        <li
          className={classNames(
            `${classPrefix}-option`,
            (multiple ? value.includes(option.value) : value === option.value) && `${classPrefix}-option-active`,
            option.description && `${classPrefix}-option-has-desc`,
            option.disabled === true && `${classPrefix}-option-disabled`
          )}
          key={option.value}
          style={cardStyle}
          onClick={() => handleSelect(option)}
        >
          {getCoverNode(option, props)}
          {(!!option.label || !!option.description) && (
            <div className={`${classPrefix}-info`}>
              {!!option.label && <div className={`${classPrefix}-title`}>{option.label}</div>}
              {!!option.description && <div className={`${classPrefix}-desc`}>{option.description}</div>}
            </div>
          )}
        </li>
      ))}
    </ul>
  )
}
