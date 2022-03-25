import React, {
  useState,
  MutableRefObject,
  useRef,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useLayoutEffect
} from 'react'
import AyForm from '../AyForm'
import AyButton from '../AyButton'
import { Form, Col, Space, Card } from 'antd'
import { AyFormField } from '../AyForm/ay-form'
import { AySearchField, AySearchProps } from './ay-search'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { SearchOutlined, ReloadOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { FORM_TYPE_DATE, FORM_TYPE_DATE_RANGE } from '../constant'
import locale from '../locale'
import './ay-search.less'

type SearchSize = 'mini' | 'small' | 'middle' | 'large'

/** 不同尺寸下，每个配置项所占用的 span */
const SizeMap = {
  large: 6,
  middle: 8,
  small: 12,
  mini: 24
}

/** 默认展示 n 行 */
let defaultVisibleRow = 2

/**
 * 设置 mini 状态下默认展示的行数
 * @param row 展示行数
 */
export const setSearchDefaultVisibleRow = (row: number) => {
  if (row > 0) {
    defaultVisibleRow = row
  }
}

/**
 * 获取 field 当前的位置，默认位置是 1，越往前越靠前
 * @param field form 配置项
 */
const getOrder = (field: any, i: number): number => {
  return field.order === undefined ? i : field.order
}

/**
 * 将查询的 field 转成 form 的field
 * @param fields 查询配置项
 * @param mini 是否缩小
 */
const getSearchFields = (
  /** 配置项 */
  fields: Array<AySearchField>,
  /** 是否收起 */
  mini: boolean,
  /** 当前尺寸 */
  size: SearchSize,
  /** 每个项所占用的 span */
  calcSpan: number,
  /** 默认展开 n 行 */
  visibleRow: number,
  /** 是否平铺展示 */
  inline: boolean
): { searchFields: Array<AyFormField>; span: number } => {
  // 累计的 span
  let spanSum: number = 0
  // 每一行占用的 span，超过 24 清 0
  let rowSpanSum: number = 0
  let newFields: Array<AySearchField | AyFormField> = fields
    // 过滤掉隐藏的
    .filter(field => field.hidden !== true)
    // 获取到排序值
    .map((field, i) => {
      return {
        ...field,
        order: getOrder(field, i)
      }
    })

  // 排序
  newFields.sort((a: any, b: any) => {
    return a.order - b.order
  })

  // 生成 AyForm 的 field
  newFields = newFields.map((field, index) => {
    // @ts-ignore
    let newField: AyFormField = {
      ...field
    }
    // 平铺展示
    if (inline) {
      // 去掉
      newField.title = ''
      if (![FORM_TYPE_DATE, FORM_TYPE_DATE_RANGE].includes(field.type || '')) {
        // 添加 props
        newField.props = {
          // @ts-ignore
          placeholder: field.title || '',
          ...field.props
        }
      }
      return newField
    }

    // 当前条默认的 span 值
    let newSpan = field.grid ? field.grid[size] : calcSpan

    // 如果这一行超过 24 格子，意味着要换行
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

    if (mini) {
      // 如果超过多行，直接隐藏
      if (spanSum > visibleRow * 24 - calcSpan && index !== 0) {
        newField.hidden = true
      }
    }

    // AyForm 的 span 值是具体数值
    newField.span = newSpan
    return newField
  })

  return {
    searchFields: newFields as Array<AyFormField>,
    span: spanSum
  }
}

const getMiniLabel = (mini: boolean) => {
  return mini ? locale.search.collapsed : locale.search.expand
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
  const {
    fields,
    onConfirm,
    onReset,
    formExtend,
    defaultOpen,
    toggleVisible,
    visibleRow = defaultVisibleRow,
    actionVisible,
    inline,
    ...otherProps
  } = props
  const wrapRef = useRef<any>()
  const timerRef = useRef<number>(0)
  // 是否是 mini 状态
  const [mini, setMini] = useState<boolean>(!defaultOpen)
  // 当前尺寸
  const [size, setSize] = useState<SearchSize>('large')
  // 计算的格子大小
  const calcSpan: number = useMemo(() => {
    return SizeMap[size]
  }, [size])
  // 显示的 fields
  const { searchFields, span: visibleSpan } = getSearchFields(fields, mini, size, calcSpan, visibleRow, inline || false)

  // 查询按钮所占的 span 值
  const actionSpan = useMemo(() => {
    if (inline) {
      return undefined
    }
    if (visibleSpan <= 18) {
      return 6
    }
    // 累计的 span
    let spanSum: number = 0
    // 每一行占用的 span，超过 24 清 0
    let rowSpanSum: number = 0
    // mini 状态下的 span 值
    let miniSpanSum: number = 0

    searchFields.forEach((field, index: number) => {
      let newSpan: number = (field.span as number) || calcSpan

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

      // 如果超过指定行数，直接隐藏
      if (spanSum + newSpan + calcSpan > visibleRow * 24 && !miniSpanSum && index !== 0) {
        miniSpanSum = spanSum
      }

      spanSum += newSpan
    })

    if (miniSpanSum === 0) {
      miniSpanSum = spanSum
    }

    let span: number = 24 - ((mini ? miniSpanSum : spanSum) % 24)

    return span
  }, [searchFields, calcSpan, mini, visibleSpan, inline])

  // 是否应该右侧
  const actionRight: boolean = useMemo(() => {
    return visibleSpan >= 24 - calcSpan
  }, [visibleSpan])

  // 查询区域样式
  const actionStyle = useMemo(() => {
    let style: AnyKeyProps = {}
    if (actionRight) {
      style.textAlign = 'right'
    } else {
      style.paddingLeft = 50
    }
    if (inline) {
      style = {}
    }
    return style
  }, [actionRight, inline])

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
    // 节流，每 100 毫秒执行一次
    let now = Date.now()
    if (now - timerRef.current > 100) {
      getSpanByWrap()
      timerRef.current = now
    }
  }

  useLayoutEffect(() => {
    // @ts-ignore 监听元素宽度变化
    let observe = new window.ResizeObserver(() => {
      handleResize()
    })
    observe.observe(wrapRef.current)
    return () => {
      observe.disconnect()
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
    <Card className={classNames('ay-search', inline ? '' : 'full-width', inline ? 'inline' : '')}>
      <div className="ay-search-content" ref={wrapRef}>
        <AyForm
          layout={{ labelCol: { flex: '100px' } }}
          ref={formRef}
          fields={searchFields}
          span={calcSpan}
          gutter={inline ? 0 : 16}
          formLayout={inline ? 'inline' : 'horizontal'}
          onConfirm={handleConfirm}
          {...otherProps}
          {...formExtend}
        >
          {actionVisible !== false && (
            <Col span={actionSpan} style={actionStyle}>
              <Form.Item>
                <Space>
                  <AyButton htmlType="submit" type="primary" icon={<SearchOutlined />}>
                    {locale.search.search}
                  </AyButton>
                  <AyButton icon={<ReloadOutlined />} onClick={handleReset}>
                    {locale.search.reset}
                  </AyButton>
                  {toggleVisible !== false && !inline
                    ? visibleSpan > visibleRow * 24 - (actionSpan || 0) && searchFields.length > 1 && <ToogleBtn />
                    : null}
                </Space>
              </Form.Item>
            </Col>
          )}
        </AyForm>
      </div>
    </Card>
  )
})
