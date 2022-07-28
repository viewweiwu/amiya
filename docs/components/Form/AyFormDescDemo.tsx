import React, { useState, MutableRefObject, useEffect, useRef } from 'react'
import { AyForm, AyButton, AyFormField, AyCardGroup } from 'amiya'
import { Switch, Form, Space, Col, Card } from 'antd'

const fields: Array<AyFormField> = [
  {
    title: '姓名',
    key: 'cn'
  },
  {
    title: '英文名',
    key: 'en'
  },
  {
    title: '初始HP',
    key: 'oriHp',
    type: 'number'
  },
  {
    title: '初始攻击',
    key: 'oriAtk',
    type: 'number'
  },
  {
    title: '职业',
    key: 'class',
    type: 'radio-group',
    defaultValue: '1',
    options: [
      { label: '狙击干员', value: '1' },
      { label: '医疗干员', value: '2' },
      { label: '术师干员', value: '3' }
    ]
  },
  {
    title: '上线时间',
    key: 'createDate',
    type: 'date',
    showTime: true
  },
  {
    title: '简介',
    type: 'textarea',
    key: 'desc',
    span: 24,
    rows: 6
  }
]

const formLayoutOptions = [
  { label: 'horizontal', value: 'horizontal' },
  { label: 'vertical', value: 'vertical' }
]

export default function Demo() {
  const [readonly, setReadonly] = useState<boolean>(true)
  const [desc, setDesc] = useState<boolean>(true)
  const [formLayout, setFormLayout] = useState<string>('vertical')
  const formRef: MutableRefObject<any> = useRef()

  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  useEffect(() => {
    formRef.current.setFieldsValue({
      cn: '阿米娅',
      en: 'Amiya',
      oriHp: 720,
      oriAtk: 100,
      class: '3',
      rarity: 4,
      createDate: '2019-04-30 10:00:00',
      desc: `
初始开放
【物理强度】普通
【战场机动】标准
【生理耐受】普通
【战术规划】优良
【战斗技巧】标准
【源石技艺适应性】■■

客观履历

初始开放
罗德岛的公开领袖，在内部拥有最高执行权。虽然，从外表上看起来仅仅是个不成熟的少女，实际上，她却是深受大家信任的合格的领袖。
现在，阿米娅正带领着罗德岛，为了感染者的未来，为了让这片大地挣脱矿石病的阴霾而不懈努力。
      `.trim()
    })
  }, [])

  return (
    <Card>
      <Space style={{ marginBottom: 12 }}>
        <label style={{ marginRight: 4 }}>只读模式</label>
        <Switch defaultChecked={readonly} onChange={value => setReadonly(value)} />
        <label style={{ marginRight: 4, marginLeft: 10 }}>Desc</label>
        <Switch defaultChecked={desc} onChange={value => setDesc(value)} />
        <label style={{ marginRight: 4, marginLeft: 10 }}>布局方式</label>
        <AyCardGroup value={formLayout} onChange={setFormLayout} cancelable={false} options={formLayoutOptions} />

        {/* <AyButton style={{ marginLeft: 10 }} onClick={() => formRef.current.setFieldsValue({ createDate: new Date() })}>
          填充上线时间
        </AyButton> */}
      </Space>
      <AyForm
        ref={formRef}
        readonly={readonly}
        desc={desc}
        fields={fields}
        span={12}
        gutter={desc ? 0 : 12}
        onConfirm={handleConfirm}
        formLayout={formLayout}
      >
        {!readonly && (
          <Col span={24}>
            <Form.Item>
              <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
                提交
              </AyButton>
            </Form.Item>
          </Col>
        )}
      </AyForm>
    </Card>
  )
}
