import React, { useEffect, useState } from 'react'
import { message, Space } from 'antd'
import { AyButton, AyDialogForm, AyField, AyFields, FormValues } from 'amiya'

/** 审批通过 */
const PASS = 1
/** 审批拒绝 */
const DENIED = 2

const addApi = (values: FormValues): Promise<any> => {
  console.log(values)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({})
    }, 300)
  })
}

export default function Demo() {
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<number>(PASS)

  useEffect(() => {
    if (visible) {
      setType(PASS)
    }
  }, [visible])

  return (
    <div>
      <Space>
        <AyButton
          type="link"
          onClick={() => {
            setVisible(true)
            setType(DENIED)
          }}
        >
          审批
        </AyButton>
      </Space>
      <AyDialogForm
        title="审批"
        visible={visible}
        onClose={() => setVisible(false)}
        addApi={addApi}
        formExtend={{ formLayout: 'vertical' }}
        onSuccess={() => message.success(type === PASS ? '已通过' : '已拒绝')}
      >
        <AyFields>
          <AyField
            title="审批意见:"
            key="type"
            type="card-group"
            required
            options={[
              { label: '通过', value: PASS },
              { label: '拒绝', value: DENIED }
            ]}
            defaultValue={PASS}
            onChange={setType}
          />
          <AyField
            rules={type === DENIED ? [{ required: true, message: '拒绝时请填写审批意见' }] : undefined}
            title="请说明原因:"
            key="reason"
            type="textarea"
            placeholder="还可以输入 256 个字..."
            rows={5}
            span={24}
          />
        </AyFields>
      </AyDialogForm>
    </div>
  )
}
