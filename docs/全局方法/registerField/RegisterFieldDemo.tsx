import React from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'
import './amiya-init.tsx'
import 'antd/dist/antd.min.css'

const fields: Array<AyFormField> = [
  {
    title: '姓名',
    key: 'input'
  },
  {
    title: '选择人物',
    // 自定义 FormType，具体实现，请切换到 amiya-init.tsx 查看
    type: 'chara-select',
    key: 'chara',
    required: true
  }
]

export default function RegisterFieldDemo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm span={24} fields={fields} style={{ width: 400, margin: '0 auto' }} onConfirm={handleConfirm}>
      <AyButton type="primary" htmlType="submit" style={{ marginLeft: 120 }}>
        提交
      </AyButton>
    </AyForm>
  )
}
