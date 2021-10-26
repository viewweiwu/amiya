import React, { ReactNode, useRef, useEffect } from 'react'
import { Option } from '../AyForm/ay-form'
import moment from 'moment'
import { Tooltip, Input, Image, Tag } from 'antd'
import { RenderProps } from './ay-table'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { AySelect } from 'amiya'

export const install = (registerTableRender: (key: string, render: (props: RenderProps) => ReactNode) => void) => {
  registerTableRender('__options', ({ field, text }: RenderProps) => {
    let option = field.options.find((option: Option) => option.value === text)
    return option ? option.label : text
  })

  registerTableRender('__ellipsis', ({ text, field }: RenderProps) => {
    return (
      <Tooltip placement={field.placement || 'topLeft'} title={text}>
        <span>{text || ''}</span>
      </Tooltip>
    )
  })

  registerTableRender('datetime', ({ text, field }: RenderProps) => {
    if (!text) {
      return ''
    }
    return moment(text).format(field.format || 'YYYY-MM-DD HH:mm:ss')
  })

  registerTableRender('editable-cell-input', ({ text, field }: RenderProps) => {
    const inputRef = useRef<any>(null)

    return ({ editing, mode, save }: AnyKeyProps) => {
      useEffect(() => {
        if (editing && mode === 'col') {
          inputRef.current.focus()
        }
      }, [editing])
      return !editing ? (
        text
      ) : (
        <Input placeholder="请输入" {...field.contentProps} ref={inputRef} onBlur={save} onPressEnter={save} />
      )
    }
  })

  registerTableRender('editable-cell-select', ({ text, field }: RenderProps) => {
    const selectRef = useRef<any>(null)
    const options = field.options || []
    const label = options.find((option: Option) => option.value === text)?.label || ''

    return ({ editing, save, mode }: AnyKeyProps) => {
      useEffect(() => {
        if (editing && mode === 'col') {
          selectRef.current.focus()
        }
      }, [editing])
      return !editing ? (
        label
      ) : (
        <AySelect
          placeholder="请选择"
          style={{ width: '100%' }}
          {...field.contentProps}
          ref={selectRef}
          options={options}
          onBlur={save}
        />
      )
    }
  })

  registerTableRender('image', ({ text, field }: RenderProps) => {
    return <Image width={100} {...field.props} src={text} />
  })

  registerTableRender('html', ({ text, field }: RenderProps) => {
    return <div dangerouslySetInnerHTML={{ __html: text }}></div>
  })

  registerTableRender('tags', ({ text, field }: RenderProps) => {
    if (!Array.isArray(text) || !field.colorMap) {
      return text
    }
    return text.map((item: string) => <Tag color={field.colorMap[item]}>{item}</Tag>)
  })
}

export default {
  install
}
