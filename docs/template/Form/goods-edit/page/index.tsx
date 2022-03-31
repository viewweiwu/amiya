import React, { useState } from 'react'
import { Card } from 'antd'
import { AnyKeyProps, AyButton, AyField, AyFields, AyForm } from 'amiya'

export default function Demo() {
  // 商品选择是否可见
  const [goodsVisible, setGoodsVisible] = useState(false)
  // 优惠方式
  const [offType, setOffType] = useState(1)
  // 提交的数据
  const [submitValues, setSubmitValues] = useState<AnyKeyProps>({})

  return (
    <Card style={{ maxWidth: 600, margin: '0 auto' }}>
      <AyForm formLayout="vertical" onConfirm={values => setSubmitValues(values)}>
        <AyFields>
          <AyField title="优惠券名称" key="name" required />
          <AyField title="优惠力度" key="__name" type="input-group" required>
            <AyField key="__title" readonly defaultValue="满" />
            <AyField key="price" type="number" defaultValue={100} rules={[{ required: true, message: '请输入金额' }]} />
            <AyField key="__title2" readonly defaultValue="元，" />
            <AyField key="__title3" readonly hidden={offType !== 1} defaultValue="打" />
            <AyField key="__title4" readonly hidden={offType !== 2} defaultValue="减" />
            <AyField key="off" type="number" defaultValue={9} rules={[{ required: true, message: '请输入折扣' }]} />
            <AyField
              key="offType"
              type="select"
              defaultValue={offType}
              onChange={(value: number) => setOffType(value)}
              allowClear={false}
              options={[
                { label: '折', value: 1 },
                { label: '元', value: 2 }
              ]}
            />
          </AyField>
          <AyField
            title="领取方式"
            key="receiveType"
            type="radio-group"
            defaultValue={1}
            required
            options={[
              { label: '自动领取', value: 1 },
              { label: '手动领取', value: 2 }
            ]}
          />
          <AyField
            title="适用范围"
            key="type"
            type="radio-group"
            defaultValue={1}
            required
            onChange={(value: number) => setGoodsVisible(value === 2)}
            options={[
              { label: '全平台', value: 1 },
              { label: '指定商品', value: 2 }
            ]}
          />
          <AyField
            title="商品"
            key="goodsId"
            type="select"
            required
            hidden={!goodsVisible}
            options={[
              { label: '火腿肠', value: 1 },
              { label: '面包', value: 2 },
              { label: '泡面', value: 3 },
              { label: '瓜子', value: 4 },
              { label: '橘子', value: 5 }
            ]}
          />
          <AyField title="有效日期" key="time" required type="date-range" showTime />
          <AyField title="备注" key="desc" type="textarea" placeholder="请描述使用用途" />
        </AyFields>
        <AyButton htmlType="submit" type="primary">
          创建
        </AyButton>
      </AyForm>
      {submitValues.name && <pre>{JSON.stringify(submitValues, null, 2)}</pre>}
    </Card>
  )
}
