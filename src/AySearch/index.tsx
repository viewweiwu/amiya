import React, {
  useState,
  MutableRefObject,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
  useLayoutEffect
} from 'react'
import AyForm from '../AyForm'
import AyButton from '../AyButton'
import { Form, Col, Space, Card } from 'antd'
import './ay-search.less'
import { AyFormField } from '../AyForm/ay-form'
import { AySearchField, AySearchProps } from './ay-search'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { SearchOutlined, ReloadOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'

type SearchSize = 'mini' | 'small' | 'middle' | 'large'

const SizeMap = {
  large: 6,
  middle: 8,
  small: 12,
  mini: 24
}

/**
 * 获取 field 当前的位置，默认位置是 1，越往前越靠前
 * @param field form 配置项
 */
const getOrder = (field: any, i: number): number => {
  return field.order === undefined ? 1 : field.order
}

/**
 * 将查询的 field 转成 form 的field
 * @param fields 查询配置项
 * @param mini 是否缩小
 */
const getSearchFields = (
  fields: Array<AySearchField>,
  mini: boolean,
  size: SearchSize,
  calcSpan: number
): Array<AyFormField> => {
  // 累计的 span
  let spanSum: number = 0
  // 每一行占用的 span，超过 24 清 0
  let rowSpanSum: number = 0
  let newFields: Array<AyFormField> = fields
    // 过滤掉隐藏的
    .filter(field => field.hidden !== true)
    // 生成 AyForm 的 field
    .map((field, i) => {
      // @ts-ignore
      let newField: AyFormField = {
        ...field,
        // 生成 order
        order: getOrder(field, i)
      }
      // 当前条默认的 span 值
      let newSpan = field.grid ? field.grid[size] : calcSpan

      if (mini) {
        // 如果这一行超过 24 格子，意味着会这行
        if (newSpan + rowSpanSum > 24) {
          // 填补折行的空白空间
          spanSum += 24 - rowSpanSum
          // 重新调整 rowSpanSum 的值，保证值 < 24
          rowSpanSum = 24 - newSpan
        } else {
          // 累计 这一行的 span 值
          rowSpanSum += newSpan
        }
        // 如果刚好 = 24，意味则换行，清 0
        if (rowSpanSum === 24) {
          rowSpanSum = 0
        }

        spanSum += newSpan

        // 如果超过两行，直接隐藏
        if (spanSum > 48 - calcSpan) {
          newField.hidden = true
        }
      }

      // AyForm 的 span 值是具体数值
      newField.span = newSpan
      return newField
    })
  // 排序
  newFields.sort((a: any, b: any) => {
    return b.order - a.order
  })
  return newFields
}

const getMiniLabel = (mini: boolean) => {
  return mini ? '展开' : '收缩'
}

/**
 * ant form 原生支持的方法尽数暴露出去
 */
const funcs = [
  'getFieldValue',
  'getFieldsValue',
  'getFieldError',
  'getFieldsError',
  'isFieldTouched',
  'isFieldsTouched',
  'isFieldValidating',
  'resetFields',
  'scrollToField',
  'setFields',
  'setFieldsValue',
  'submit',
  'validateFields'
]

export default forwardRef(function AySearch(props: AySearchProps, ref) {
  const { fields, onConfirm, onReset, formExtend, defaultOpen, toggleVisible } = props
  const wrapRef = useRef<any>()
  const timerRef = useRef<NodeJS.Timer>()
  // 是否是 mini 状态
  const [mini, setMini] = useState<boolean>(!defaultOpen)
  // 当前尺寸
  const [size, setSize] = useState<SearchSize>('large')
  // 计算的格子大小
  const calcSpan: number = useMemo(() => {
    return SizeMap[size]
  }, [size])
  // 显示的 fields
  const searchFields: Array<AyFormField> = getSearchFields(fields, mini, size, calcSpan)
  // 显示的 span 总数
  const visibleSpan = searchFields.reduce((sum, field) => {
    sum += field.span || calcSpan
    return sum
  }, 0)

  // 查询按钮所占的 span 值
  const actionSpan = useMemo(() => {
    if (visibleSpan <= 18) {
      return 6
    }
    // 累计的 span
    let spanSum: number = 0
    // 每一行占用的 span，超过 24 清 0
    let rowSpanSum: number = 0
    // mini 状态下的 span 值
    let miniSpanSum: number = 0

    searchFields.forEach(field => {
      let newSpan = field.span || calcSpan

      // 如果这一行超过 24 格子，意味着会这行
      if (newSpan + rowSpanSum > 24) {
        // 填补折行的空白空间
        spanSum += 24 - rowSpanSum
        // 重新调整 rowSpanSum 的值，保证值 < 24
        rowSpanSum = 24 - newSpan
      } else {
        // 累计 这一行的 span 值
        rowSpanSum += newSpan
      }
      // 如果刚好 = 24，意味则换行，清 0
      if (rowSpanSum === 24) {
        rowSpanSum = 0
      }

      // 如果超过两行，直接隐藏
      if (spanSum + newSpan + calcSpan > 48 && !miniSpanSum) {
        miniSpanSum = spanSum
      }

      spanSum += newSpan
    })

    if (miniSpanSum === 0) {
      miniSpanSum = spanSum
    }

    let span: number = 24 - ((mini ? miniSpanSum : spanSum) % 24)

    return span
  }, [searchFields, calcSpan, mini, visibleSpan])

  // 是否应该右侧
  const actionRight: boolean = useMemo(() => {
    return visibleSpan >= 24 - calcSpan
  }, [visibleSpan])

  /** 控制 any form 的实例 */
  const formRef: MutableRefObject<any> = useRef()

  /** 暴露出去的 form 的实例，允许父组件通过 ref 调用方法 */
  const formInstans: AnyKeyProps = {
    resize: () => handleResize()
  }

  /** 填充方法 */
  funcs.forEach(func => {
    formInstans[func] = (...args: any) => formRef.current[func](...args)
  })

  useImperativeHandle(ref, () => formInstans)

  /**
   * 切换展开
   */
  const toggleMini = () => {
    setMini(!mini)
  }

  /**
   * 获取每个 field 的 span
   */
  const getSpanByWrap = () => {
    try {
      let width: number = wrapRef.current.offsetWidth
      let size: SearchSize = 'large'

      if (width > 1300) {
        size = 'large'
      } else if (width > 900) {
        size = 'middle'
      } else if (width > 700) {
        size = 'small'
      } else {
        size = 'mini'
      }

      setSize(size)
    } catch {}
  }

  /**
   * 监听大小变化事件
   */
  const handleResize = () => {
    // 防抖
    timerRef.current && clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      getSpanByWrap()
    }, 100)
  }

  useLayoutEffect(() => {
    getSpanByWrap()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      timerRef.current && clearTimeout(timerRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  /**
   * 重置
   */
  const handleReset = () => {
    formRef.current.resetFields()
    formRef.current.submit()
    onReset && onReset()
  }

  /**
   * 提交查询
   * @param values 返回参数
   */
  const handleConfirm = (values: AnyKeyProps) => {
    if (onConfirm) {
      onConfirm(values)
    }
  }

  /**
   * 展开缩小切换
   */
  const ToogleBtn = () => (
    <AyButton type="link" onClick={toggleMini}>
      {getMiniLabel(mini)}
      {mini ? <DownOutlined /> : <UpOutlined />}
    </AyButton>
  )

  return (
    <Card className="ay-search">
      <div className="ay-search-content" ref={wrapRef}>
        <AyForm
          layout={{ labelCol: { flex: '100px' } }}
          ref={formRef}
          fields={searchFields}
          span={calcSpan}
          gutter={16}
          onConfirm={handleConfirm}
          {...formExtend}
        >
          <Col span={actionSpan} style={actionRight ? { textAlign: 'right' } : { paddingLeft: 50 }}>
            <Form.Item>
              <Space>
                <AyButton htmlType="submit" type="primary" icon={<SearchOutlined />}>
                  查询
                </AyButton>
                <AyButton icon={<ReloadOutlined />} onClick={handleReset}>
                  重置
                </AyButton>
                {toggleVisible !== false ? visibleSpan > 48 - calcSpan && <ToogleBtn /> : null}
              </Space>
            </Form.Item>
          </Col>
        </AyForm>
      </div>
    </Card>
  )
})
