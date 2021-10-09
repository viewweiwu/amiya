import React from 'react'
import { AyButton, registerTableRender, Option } from 'amiya'
import { RenderProps } from 'amiya/lib/AyTable/ay-table'
import { Tag, Popover, Space, Rate } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { AnyKeyProps } from '@/types/AnyKeyProps'
import 'antd/dist/antd.min.css'

// 此函数只需要注册一次，你可以放在全局
const colorMap: AnyKeyProps = {
  治疗: 'green',
  支援: 'magenta',
  爆发: 'red',
  新手: 'blue',
  费用回复: 'gold',
  输出: 'volcano',
  防护: 'purple',
  群攻: 'lime',
  生存: 'cyan'
}

registerTableRender('tag', ({ text, record, field }: RenderProps) => {
  if (!Array.isArray(text)) {
    return ''
  }
  return (
    <>
      {text.map(item => (
        <Tag color={colorMap[item] || ''} key={item}>
          {item}
        </Tag>
      ))}
    </>
  )
})

// 此函数只需要注册一次，你可以放在全局
registerTableRender('profession', ({ field, text }: RenderProps) => {
  let option = field.options.find((option: Option) => option.value === text)
  if (!option) {
    return text
  }
  return (
    <Space>
      <img src={option.icon} />
      {option.label}
    </Space>
  )
})

// 此函数只需要注册一次，你可以放在全局
registerTableRender('star', ({ text }: RenderProps) => {
  return <Rate count={Number(text + 1)} defaultValue={Number(text + 1)} disabled />
})

// 此函数只需要注册一次，你可以放在全局
registerTableRender('potentialRanks', ({ text }: RenderProps) => {
  if (!Array.isArray(text)) {
    return
  }
  return (
    <Popover
      content={text.map((item, i) => (
        <div key={i}>{item.description}</div>
      ))}
      title="潜能提升"
    >
      <AyButton>详情</AyButton>
    </Popover>
  )
})

// 此函数只需要注册一次，你可以放在全局
registerTableRender('name', ({ text, record, field }: RenderProps) => {
  return (
    <div>
      <Space>
        <span>{text}</span>
        <span>({record.name})</span>
        <Popover
          content={
            <>
              <p>{record.itemDesc}</p>
              <p>{record.itemUsage}</p>
            </>
          }
          title="干员信息"
        >
          <InfoCircleOutlined style={{ color: 'purple' }} />
        </Popover>
      </Space>
    </div>
  )
})
