import { AyButton, AySelect, Option } from 'amiya'
import { InputNumber, Popover, Space } from 'antd'
import React, { ReactNode, useEffect } from 'react'
import { useState } from 'react'
import { CheckOutlined } from '@ant-design/icons'

interface IProps {
  title?: string
  options?: Array<Option>
  hidden?: boolean
  onChange?: (value: number | undefined, unit?: number) => void
  children: ReactNode
}

export default function PopoverEdit(props: IProps) {
  const { onChange, children, title, options, hidden } = props
  // 是否可见
  const [visible, setVisible] = useState(false)
  // 当前输入值
  const [text, setText] = useState<number | undefined>()
  // 单位
  const [unit, setUnit] = useState<number | undefined>()

  useEffect(() => {
    if (visible === false) {
      setText(undefined)
      setUnit(undefined)
    } else {
      setUnitDefaultValue()
    }
  }, [visible])

  useEffect(() => setUnitDefaultValue(), [options])

  /** 设置单位默认值 */
  const setUnitDefaultValue = () => {
    if (options && options.length) {
      setUnit(options[0].value)
    }
  }

  /** 确定更改 */
  const handleConfirm = () => {
    setVisible(false)
    if (onChange) {
      onChange(text, unit)
    }
  }

  if (hidden === true) {
    return <div>{children}</div>
  }

  return (
    <Popover
      visible={visible}
      onVisibleChange={setVisible}
      title={title}
      trigger="click"
      content={
        <Space>
          <InputNumber
            value={text}
            onChange={(value: number) => setText(value)}
            addonBefore={options ? <AySelect value={unit} onChange={setUnit} options={options} /> : undefined}
          />
          <AyButton type="primary" icon={<CheckOutlined />} onClick={handleConfirm} />
        </Space>
      }
    >
      {children}
      <AyButton type="link">批量</AyButton>
    </Popover>
  )
}
