import React from 'react'
import { registerField } from 'amiya'
import CharaSelect from './CharaSelect'

// 注册自定义类型表单项
// 注册一个角色选择
registerField('chara-select', {
  type: 'chara-select',
  defaultValue: '',
  render: ({ field, readonly }: any) => <CharaSelect readonly={readonly} {...field.props} />
})
