import React from 'react'
import { registerField } from 'amiya'
import CharaSelect from './CharaSelect'
import JobSelect from './JobSelect'

// 注册自定义类型表单项
// 注册一个角色选择
registerField('chara-select', {
  type: 'chara-select',
  defaultValue: '',
  render: ({ field, readonly }: any) => <CharaSelect readonly={readonly} {...field.props} />
})

// 注册联动类型表单项
// 注册职业选择
registerField('job-select', {
  type: 'job-select',
  defaultValue: null,
  render: ({ field, readonly, addFieldListener, removeFiledListener }: any) => {
    return (
      <JobSelect
        readonly={readonly}
        addFieldListener={addFieldListener}
        removeFiledListener={removeFiledListener}
        placeholder={`请选择${field.title || ''}`}
        {...field.props}
      />
    )
  }
})
