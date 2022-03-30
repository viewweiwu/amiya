import React, { ReactNode, useRef, useEffect } from 'react'
import { Option } from '../AyForm/ay-form'
import moment from 'moment'
import { Tooltip, Input, Image, Tag } from 'antd'
import { RenderProps } from './ay-table'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { FORM_READONLY_EMPTY } from '../constant'
import { getValueByOptions, renderStatus } from '../utils'
import AySelect from '../AySelect'

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
      console.log('render')
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
    let label = ''
    if (Array.isArray(text)) {
      if (!text.length) {
        text = FORM_READONLY_EMPTY
      }
      label = text.map((item: any) => getValueByOptions(item, field.options)).join(field.splitText || '、')
    } else {
      label = getValueByOptions(text, field.options)
    }

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
    return text.map((item: string) => (
      <Tag key={item} color={field.colorMap[item]}>
        {item}
      </Tag>
    ))
  })

  registerTableRender('unit', ({ text, field }: RenderProps) => {
    return (
      <div>
        {field.prefix}
        {text}
        {field.suffix}
      </div>
    )
  })

  /**
   * 5
   * @decs 状态加文字
   *
   * @returns ReactNode
   */
  registerTableRender('status', ({ text, field }: AnyKeyProps) => {
    const { options = [] } = field
    return renderStatus(text, options, field.type)
  })
}

export default {
  install
}
