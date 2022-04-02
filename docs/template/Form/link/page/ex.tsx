import React, { useRef, useState } from 'react'
import { Card } from 'antd'
import { AnyKeyProps, AyButton, AyField, AyFields, AyForm } from 'amiya'
import '../less/index.less'

export default function Demo() {
  const formRef = useRef<any>()
  // 提交的数据
  const [submitValues, setSubmitValues] = useState<AnyKeyProps>({})

  const handleChange = () => {
    // requestAnimationFrame(() => {
    //   console.log(1)
    formRef.current.setFieldsValue({ test: '' })
    // })
  }

  return (
    <Card className="step-form">
      <AyForm ref={formRef} formLayout="vertical" onConfirm={values => setSubmitValues(values)}>
        <AyFields>
          <AyField title="切换展示" key="toggle" help="尝试点击开关。" type="switch" onChange={handleChange} />
          <AyField
            title="隐藏的输入框"
            required
            key="test"
            help="切换显示时，值可被 setFieldsValue 设置清空"
            hidden="{{ !formValues.toggle }}"
          />
        </AyFields>
        <AyButton htmlType="submit" type="primary">
          提交
        </AyButton>
      </AyForm>
      {Object.keys(submitValues).length > 0 && <pre>{JSON.stringify(submitValues, null, 2)}</pre>}
    </Card>
  )
}
