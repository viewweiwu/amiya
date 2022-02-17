import React, { useState } from 'react'
import { Card, Result, Space, Steps } from 'antd'
import { AnyKeyProps, AyButton, AyField, AyFields, AyForm } from 'amiya'
import '../less/index.less'

export default function Demo() {
  // 商品选择是否可见
  const [currStep, setCurrStep] = useState(0)
  // 提交的数据
  const [submitValues, setSubmitValues] = useState<AnyKeyProps>({})
  // 提交的数据
  const [submitTagValues, setSubmitTagValues] = useState<AnyKeyProps>({})

  return (
    <Card className="step-form">
      <Steps current={currStep} className="steps">
        <Steps.Step title="基础信息" />
        <Steps.Step title="能力选择" />
        <Steps.Step title="录入完成" />
      </Steps>
      {currStep === 0 && (
        <AyForm
          formLayout="vertical"
          onConfirm={values => {
            setSubmitValues(values)
            setCurrStep(1)
          }}
        >
          <AyFields>
            <AyField title="昵称" key="nickname" required help="你在平台展示的名称。" defaultValue="一只兔子" />
            <AyField title="真实姓名" key="name" required help="仅用于认证，不会在界面展示。" defaultValue="阿米娅" />
            <AyField title="证件信息" key="__card" type="input-group" formItemProps={{ requiredMark: true }} required>
              <AyField
                type="select"
                key="cardType"
                style={{ width: 130 }}
                defaultValue={2}
                required
                options={[
                  { label: '居民身份证', value: 1 },
                  { label: '出生证', value: 2 },
                  { label: '护照', value: 3 }
                ]}
              />
              <AyField
                title="证件号码"
                key="cardNo"
                required
                style={{ width: 370 }}
                defaultValue="A1R2K3N4I5G6H7T8S9"
              />
            </AyField>
            <AyField
              title="简介"
              key="memo"
              type="textarea"
              placeholder="介绍一下自己"
              defaultValue="正在努力奋斗中..."
            />
          </AyFields>
          <AyButton htmlType="submit" type="primary">
            下一步
          </AyButton>
        </AyForm>
      )}
      {currStep === 1 && (
        <AyForm
          formLayout="vertical"
          onConfirm={values => {
            setSubmitTagValues(values)
            setCurrStep(2)
          }}
        >
          <AyFields>
            <AyField
              title="资质"
              key="type"
              type="card-group"
              options={[
                { label: '高级资深干员', value: 3 },
                { label: '资深干员', value: 2 },
                { label: '新手', value: 1 }
              ]}
              required
              defaultValue={1}
            />
            <AyField title="星级" key="level" type="rate" count={6} required defaultValue={5} />
            <AyField
              title="能力"
              key="tags"
              type="checkbox-group"
              options={[
                { label: '控场', value: 1 },
                { label: '爆发', value: 2 },
                { label: '治疗', value: 3 },
                { label: '支援', value: 4 },
                { label: '费用回复', value: 5 },
                { label: '输出', value: 6 }
              ]}
              required
              defaultValue={[2, 6]}
            />
          </AyFields>
          <Space>
            <AyButton onClick={() => setCurrStep(currStep - 1)}>上一步</AyButton>
            <AyButton htmlType="submit" type="primary">
              下一步
            </AyButton>
          </Space>
        </AyForm>
      )}
      {currStep == 2 && (
        <Result
          status="success"
          title="录入完成"
          subTitle="信息录入已完成，可以选择再次录入。"
          extra={[
            <AyButton
              type="primary"
              onClick={() => {
                setCurrStep(0)
                setSubmitValues({})
                setSubmitTagValues({})
              }}
            >
              再次录入
            </AyButton>
          ]}
        />
      )}
      {submitValues.name && <pre>{JSON.stringify(submitValues, null, 2)}</pre>}
      {submitTagValues.type && <pre>{JSON.stringify(submitTagValues, null, 2)}</pre>}
    </Card>
  )
}
