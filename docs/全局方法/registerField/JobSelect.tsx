import React, { useState, useEffect } from 'react'
import { AySelect, Option } from 'amiya'
import { FieldListener } from 'amiya/lib/AyForm/ay-form'

interface JobSelectProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  readonly?: boolean
  /** 添加 field 监听 */
  addFieldListener?: (key: string, fieldListener: FieldListener) => void
  /** 删除 field 监听 */
  removeFiledListener?: (key: string, fieldListener: FieldListener) => void
}

const getValueByOptions = (value: any, options: Array<Option>) => {
  let option = options.find((option) => option.value === value)
  return option ? option.label : value
}

// 【模拟】延迟一秒获取职业列表
const getOptions = (value): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let options = []
      if (value === 'amiya') {
        // amiya 的可选职业
        options = [
          { label: '近卫干员', value: 'jinwei' },
          { label: '术师干员', value: 'shushi' }
        ]
      } else if (value === 'exusiai') {
        // exusiai 的可选职业
        options = [
          { label: '狙击干员', value: 'juji' },
          { label: '抛光干员', value: 'paoguang' }
        ]
      }
      resolve(options)
    }, 1000)
  })
}

// 职业选择
export default function JobSelect(props: JobSelectProps) {
  const { value, onChange, placeholder, readonly, addFieldListener, removeFiledListener } = props
  // 选项
  const [options, setOptions] = useState<Array<Option>>([])
  // 是否正在请求中
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    // 声明角色选择变化事件
    const handleCharaChange = (value: any) => {
      setLoading(true)
      getOptions(value)
        .then((options: any) => {
          setOptions(options)
        })
        .finally(() => {
          setLoading(false)
        })
      if (onChange) {
        onChange(null)
      }
    }
    // 添加监听事件
    if (addFieldListener) {
      addFieldListener('chara', handleCharaChange)
    }
    // 记得销毁
    return () => {
      if (removeFiledListener) {
        removeFiledListener('chara', handleCharaChange)
      }
    }
  }, [])

  if (readonly) {
    return <span className="ay-form-text">{getValueByOptions(value, options) || '-'}</span>
  }

  return <AySelect loading={loading} value={value} onChange={onChange} options={options} placeholder={placeholder} />
}
