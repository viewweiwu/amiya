import React, { useState } from 'react'
import { AyForm, AyButton, AyFormField, registerField } from 'amiya'
import { Switch } from 'antd'
import CharaSelect from './CharaSelect'

// 注册自定义类型表单项
// 注册一个角色选择
// 这段代码放在 /src/amiya/config 下面
registerField('chara-select', {
  type: 'chara-select',
  defaultValue: '',
  render: ({ field, readonly }: any) => <CharaSelect readonly={readonly} {...field.props} />
})

const fields: Array<AyFormField> = [
  {
    title: '姓名',
    key: 'input'
  },
  {
    title: '选择人物',
    // 自定义 FormType，具体实现，请切换到 config.tsx 查看
    type: 'chara-select',
    key: 'chara',
    required: true
  }
]

export default function RegisterFieldDemo() {
  const [readonly, setReadonly] = useState<boolean>(false)
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <>
      <p>
        <label style={{ marginRight: 4 }}>只读模式</label>
        <Switch defaultChecked={readonly} onChange={value => setReadonly(value)} />
      </p>
      <AyForm
        readonly={readonly}
        span={24}
        fields={fields}
        style={{ width: 400, margin: '0 auto' }}
        onConfirm={handleConfirm}
      >
        <AyButton type="primary" htmlType="submit" style={{ marginLeft: 120 }}>
          提交
        </AyButton>
      </AyForm>
    </>
  )
}
