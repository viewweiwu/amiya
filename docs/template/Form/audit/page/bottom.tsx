import React, { useEffect, useRef, useState } from 'react'
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
  const formRef = useRef<any>()
  const [visible, setVisible] = useState(false)
  const [type, setType] = useState<number>(PASS)

  useEffect(() => {
    if (visible) {
      setType(PASS)
    }
  }, [visible])

  const handleDenied = () => {
    if (!formRef.current.getFieldValue('reason').trim()) {
      message.error('拒绝时请填写审批意见')
      return
    }
    setType(DENIED)
    formRef.current.submit()
  }

  const beforeSubmit = (values: FormValues) => {
    values.type = type
    return values
  }

  return (
    <div>
      <Space>
        <AyButton type="link" onClick={() => setVisible(true)}>
          审批
        </AyButton>
      </Space>
      <AyDialogForm
        ref={formRef}
        title="审批"
        visible={visible}
        beforeSubmit={beforeSubmit}
        onClose={() => setVisible(false)}
        addApi={addApi}
        formExtend={{ formLayout: 'vertical' }}
        dialogExtend={{
          confirmText: '通过',
          confirmBefore: (
            <AyButton danger onClick={handleDenied}>
              拒绝
            </AyButton>
          )
        }}
        onSuccess={() => message.success(type === PASS ? '已通过' : '已拒绝')}
      >
        <AyFields>
          <AyField
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
