import React from 'react'
import { registerField } from 'amiya'
import CharaSelect from './CharaSelect'

// 注册一个角色选择
registerField('chara-select', {
  type: '角色选择',
  defaultValue: '',
  render: ({ field, setFieldsValue, readonly }: any) => <CharaSelect {...field.props} />
})
