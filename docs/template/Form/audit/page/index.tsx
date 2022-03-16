import React, { useState } from 'react'
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

  const beforeSubmit = (values: FormValues) => {
    values.type = type
    return values
  }

  return (
    <div>
      <Space>
        <AyButton
          type="link"
          danger
          onClick={() => {
            setVisible(true)
            setType(DENIED)
          }}
        >
          拒绝
        </AyButton>
        <AyButton
          type="link"
          onClick={() => {
            setVisible(true)
            setType(PASS)
          }}
        >
          通过
        </AyButton>
      </Space>
      <AyDialogForm
        title={type === PASS ? '审批通过' : '审批不通过'}
        visible={visible}
        onClose={() => setVisible(false)}
        addApi={addApi}
        beforeSubmit={beforeSubmit}
        formExtend={{ formLayout: 'vertical' }}
        onSuccess={() => message.success(type === PASS ? '已通过' : '已拒绝')}
        dialogExtend={{
          confirmText: type === PASS ? '确定通过' : '确定拒绝'
        }}
      >
        <AyFields>
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
