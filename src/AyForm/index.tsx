import React, { ReactNode, useImperativeHandle, Ref, forwardRef, useRef, MutableRefObject, useState } from 'react'
import { Form, Input, Switch, Checkbox, Radio, DatePicker, Row, Col, InputNumber } from 'antd'
import AyEditor from '../AyEditor'
import AySelect from '../AySelect'
import './ay-form.less'
import moment from 'moment'
import 'moment/locale/zh-cn'
import {
  FORM_DEFAULT_ALLOW_CLEAR,
  FORM_DEFAULT_VALUE_NUMBER,
  FORM_DEFAULT_VALUE_INPUT,
  FORM_DEFAULT_VALUE_PASSWORD,
  FORM_DEFAULT_VALUE_SELECT,
  FORM_DEFAULT_VALUE_SWITCH,
  FORM_DEFAULT_VALUE_CHECKBOX,
  FORM_DEFAULT_VALUE_CHECKBOX_GROUP,
  FORM_DEFAULT_VALUE_RADIO_GROUP,
  FORM_DEFAULT_VALUE_TEXTAREA,
  FORM_DEFAULT_VALUE_DATE,
  FORM_DEFAULT_VALUE_DATE_RANGE,
  FORM_DEFAULT_VALUE_EMPTY,
  FORM_DEFAULT_VALUE_EDITOR,
  FORM_DEFAULT_VALUE_PERCENT,
  FORM_TYPE_SWITCH,
  FORM_TYPE_CHECKBOX,
  FORM_TYPE_CHECKBOX_GROUP,
  FORM_TYPE_SELECT,
  FORM_TYPE_PASSWORD,
  FORM_TYPE_INPUT,
  FORM_TYPE_RADIO_GROUP,
  FORM_TYPE_CUSTOM,
  FORM_TYPE_DATE,
  FORM_TYPE_TEXTAREA,
  FORM_TYPE_DATE_RANGE,
  FORM_TYPE_EMPTY,
  FORM_TYPE_NUMBER,
  FORM_TYPE_PERCENT,
  FORM_TYPE_EDITOR,
  TEXTAREA_DEFAULT_MAXLENGTH,
  INPUT_DEFAULT_MAXLENGTH,
  NUMBER_DEFAULT_MIN,
  NUMBER_DEFAULT_MAX,
  PERCENT_DEFAULT_MAX
} from '../constant'
import { AyFormField } from './ay-form'
moment.locale('zh-cn')

interface DpFormProps {
  /** 配置项 */
  fields: Array<AyFormField>
  /** form 名称 */
  name?: string
  /** 子元素 */
  children?: ReactNode
  /** 控制元素 */
  ref: any
  /** 提交事件 */
  onConfirm?(form: any): any
  /** 默认 span 值 */
  span?: number
  /** form 的其它属性 */
  props?: AnyKeyProps
  /** 是否只读 */
  readonly?: boolean
  /** 布局 */
  layout?: {
    labelCol: AnyKeyProps
    wrapperCol: AnyKeyProps
  }
}

const defaultLayout = {
  labelCol: { flex: '120px' },
  wrapperCol: { flex: '1' }
}

// 默认值表
const defaultValueMap: AnyKeyProps = {
  [FORM_TYPE_INPUT]: FORM_DEFAULT_VALUE_INPUT, // 输入框
  [FORM_TYPE_NUMBER]: FORM_DEFAULT_VALUE_NUMBER, // 数字框
  [FORM_TYPE_PERCENT]: FORM_DEFAULT_VALUE_PERCENT, // 数字框
  [FORM_TYPE_PASSWORD]: FORM_DEFAULT_VALUE_PASSWORD, // 密码框
  [FORM_TYPE_EDITOR]: FORM_DEFAULT_VALUE_EDITOR, // 富文本框
  [FORM_TYPE_TEXTAREA]: FORM_DEFAULT_VALUE_TEXTAREA, // 多行文本框
  [FORM_TYPE_SELECT]: FORM_DEFAULT_VALUE_SELECT, // 选择框
  [FORM_TYPE_SWITCH]: FORM_DEFAULT_VALUE_SWITCH, // 开关
  [FORM_TYPE_CHECKBOX]: FORM_DEFAULT_VALUE_CHECKBOX, // 多选框
  [FORM_TYPE_CHECKBOX_GROUP]: FORM_DEFAULT_VALUE_CHECKBOX_GROUP, // 多选组
  [FORM_TYPE_RADIO_GROUP]: FORM_DEFAULT_VALUE_RADIO_GROUP, // 单选组
  [FORM_TYPE_DATE]: FORM_DEFAULT_VALUE_DATE, // 日期
  [FORM_TYPE_DATE_RANGE]: FORM_DEFAULT_VALUE_DATE_RANGE, // 日期区间
  [FORM_TYPE_EMPTY]: FORM_DEFAULT_VALUE_EMPTY // 空白框
}

/**
 * 获取隐藏配置项
 * @param field 配置项
 */
const getNoVisibleField = (field: AyFormField): AyFormField => {
  return {
    ...field,
    title: '',
    type: 'empty'
  }
}

/**
 * 获得配置列表
 * @param fields 配置列表
 */
export const getDefaultValue = (fields: Array<AyFormField | AySearchField>) => {
  let form: AnyKeyProps = {}
  fields.forEach((field: AyFormField | AySearchField) => {
    // 如果配置项里存在默认值，直接返回默认值，否则从默认值表里获取
    if (field.hasOwnProperty('defaultValue')) {
      // 日期类型的需要通过 moment 转一遍
      if (field.type === FORM_TYPE_DATE && field.defaultValue) {
        form[field.key] = moment(field.defaultValue)
      } else {
        form[field.key] = field.defaultValue
      }
    } else if (field.type) {
      form[field.key] = defaultValueMap[field.type]
    }
  })
  return form
}

/**
 * 生成 placeholder
 * @param field 配置项
 */
const getPlaceholder = (field: AyFormField): string => {
  const defaultProps = field.props

  if (defaultProps && defaultProps.placeholder) {
    return defaultProps.placeholder
  }

  if (!field.type) {
    return `请输入${field.title}`
  }

  if ([FORM_TYPE_INPUT, FORM_TYPE_NUMBER, FORM_TYPE_PERCENT, FORM_TYPE_PASSWORD, FORM_TYPE_TEXTAREA].includes(field.type)) {
    return `请输入${field.title}`
  } else if ([FORM_TYPE_SELECT, FORM_TYPE_DATE].includes(field.type)) {
    return `请选择${field.title}`
  }

  return field.title || ''
}

/**
 * 根据配置项生成 props
 * @param field 配置项
 */
const getTagProps = (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly?: boolean) => {
  let type = field.type || FORM_TYPE_INPUT
  let props: AnyKeyProps = {
    disabled: readonly,
    placeholder: getPlaceholder(field) // 生成 placeholder
  }

  if (!type) {
    return props
  }

  switch (type) {
    case FORM_TYPE_INPUT:
    case FORM_TYPE_PASSWORD:
      // 字符最大长度 输入框、密码框
      props.maxLength = INPUT_DEFAULT_MAXLENGTH
      break

    case FORM_TYPE_TEXTAREA:
      // 字符最大长度 多行文本框
      props.maxLength = TEXTAREA_DEFAULT_MAXLENGTH
      break

    case FORM_TYPE_NUMBER:
      // 填充数字框的最大最小
      props.min = NUMBER_DEFAULT_MIN
      props.max = NUMBER_DEFAULT_MAX
      break

    case FORM_TYPE_PERCENT:
      // 填充数字框的最大最小
      props.min = NUMBER_DEFAULT_MIN
      props.max = PERCENT_DEFAULT_MAX
      props.formatter = (value: string) => (value !== '' ? `${value}%` : '')
      props.parser = (value: string) => value.replace('%', '')
      break

    case FORM_TYPE_DATE:
      // 填充日期的快捷选项
      props.renderExtraFooter = (mode: string) => {
        /**
         * 填充日期
         * @param value 日期
         */
        const setValue = (value: moment.Moment) => {
          setFieldsValue({
            [field.key]: value
          })
        }
        return (
          <>
            <a className="ant-picker-now-btn mr" onClick={() => setValue(moment().startOf('day'))}>
              今天凌晨
            </a>
            <a className="ant-picker-now-btn mr" onClick={() => setValue(moment().endOf('day'))}>
              今天晚上
            </a>
            <a className="ant-picker-now-btn mr" onClick={() => setValue(moment().subtract(1, 'day').startOf('day'))}>
              昨天凌晨
            </a>
            <a className="ant-picker-now-btn mr" onClick={() => setValue(moment().subtract(1, 'day').endOf('day'))}>
              昨天晚上
            </a>
            <a className="ant-picker-now-btn mr" onClick={() => setValue(moment().startOf('week'))}>
              周一
            </a>
            <a className="ant-picker-now-btn mr" onClick={() => setValue(moment().endOf('week'))}>
              周末
            </a>
            <a className="ant-picker-now-btn mr" onClick={() => setValue(moment().startOf('month'))}>
              月初
            </a>
            <a className="ant-picker-now-btn mr" onClick={() => setValue(moment().endOf('month'))}>
              月底
            </a>
            <a className="ant-picker-now-btn mr" onClick={() => setValue(moment().subtract(1, 'month').startOf('month'))}>
              上月初
            </a>
            <a className="ant-picker-now-btn mr" onClick={() => setValue(moment().subtract(1, 'month').endOf('month'))}>
              上月底
            </a>
          </>
        )
      }
      break

    case FORM_TYPE_DATE_RANGE:
      // 填充日期的快捷选项
      props.ranges = {
        今天: [moment().startOf('day'), moment().endOf('day')],
        昨天: [moment().subtract(1, 'day'), moment().subtract(1, 'day').endOf('day')],
        本周: [moment().startOf('week'), moment().endOf('day')],
        上周: [moment().startOf('week').subtract(7, 'day'), moment().endOf('week').subtract(7, 'day')],
        本月: [moment().startOf('month'), moment().endOf('day')],
        上月: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
      }
      break

    case FORM_TYPE_CHECKBOX_GROUP:
    case FORM_TYPE_RADIO_GROUP:
      // 填充选项 选择框、多选组、单选组
      props.options = field.options
      break
  }

  // 是否带清空按钮 选择框、输入框
  if ([FORM_TYPE_SELECT, FORM_TYPE_INPUT, FORM_TYPE_PASSWORD].includes(type)) {
    props.allowClear = FORM_DEFAULT_ALLOW_CLEAR
  }

  // 填充选项 选择框、多选组、单选组
  if ([FORM_TYPE_SELECT, FORM_TYPE_CHECKBOX_GROUP, FORM_TYPE_RADIO_GROUP].includes(type)) {
    props.options = field.options
  }

  props = {
    ...props,
    ...field.props
  }

  return props
}

/**
 * 根据不同的 type 生成不同种类的标签 Tag
 * @param field 配置项
 */
const getTag = (field: AyFormField, fields: Array<AyFormField>, setFieldsValue: (params: AnyKeyProps) => void, readonly?: boolean) => {
  const { type } = field

  let tag: ReactNode = null
  const tagProps = getTagProps(field, setFieldsValue, readonly)

  switch (type) {
    default:
    case FORM_TYPE_INPUT:
      tag = <Input {...tagProps} />
      break

    case FORM_TYPE_NUMBER:
    case FORM_TYPE_PERCENT:
      tag = <InputNumber className="max-width" {...tagProps} />
      break

    case FORM_TYPE_PASSWORD:
      tag = <Input.Password {...tagProps} />
      break

    case FORM_TYPE_TEXTAREA:
      tag = <Input.TextArea {...tagProps} />
      break

    case FORM_TYPE_EDITOR:
      tag = <AyEditor {...tagProps} />
      break

    case FORM_TYPE_SELECT:
      tag = <AySelect {...tagProps} />
      break

    case FORM_TYPE_SWITCH:
      tag = <Switch {...tagProps} />
      break

    case FORM_TYPE_CHECKBOX:
      tag = <Checkbox {...tagProps}>{field.checkboxChildren}</Checkbox>
      break

    case FORM_TYPE_CHECKBOX_GROUP:
      tag = <Checkbox.Group {...tagProps} />
      break

    case FORM_TYPE_RADIO_GROUP:
      tag = <Radio.Group {...tagProps} />
      break

    case FORM_TYPE_DATE:
      tag = <DatePicker className="max-width" {...tagProps} />
      break

    case FORM_TYPE_DATE_RANGE:
      tag = <DatePicker.RangePicker className="max-width" {...tagProps} />
      break

    case FORM_TYPE_EMPTY:
      tag = <input hidden type="text" />
      break

    case FORM_TYPE_CUSTOM:
      if (typeof field.renderContent === 'function') {
        tag = field.renderContent(field, field._values || getDefaultValue(fields))
      }
      break
  }
  return tag
}

/**
 * 通过配置列表转 Form.Item
 * @step 1、判断是否隐藏、保留占位 (visible)
 * @step 2、判断是否隐藏、不保留占位 (hidden)
 * @step 3、计算 Form.Item props 的默认基础属性
 * @step 4、设置特殊标签特殊属性
 * @step 5、设置隐藏占位 (hidden)
 * @step 6、填充 rules 属性
 * @step 7、使用 required 填充 rules
 * @param fields 配置列表
 * @param span Col 占位 0 ～ 24
 */
const getFormItem = (fields: Array<AyFormField>, setFieldsValue: (params: AnyKeyProps) => void, span?: number, readonly?: boolean) => {
  return fields.map((field: AyFormField) => {
    let visible = true

    // 隐藏该项目，保留占位，但是保留值
    if (field.visible !== undefined) {
      visible = typeof field.visible === 'function' ? field.visible() : field.visible
    }

    let hidden = false

    // 隐藏该项目，不保留占位，但是保留值
    if (field.hidden !== undefined) {
      hidden = typeof field.hidden === 'function' ? field.hidden() : field.hidden
    }

    // 隐藏该项，只显示占位，保留 form 值
    if (!visible || hidden) {
      field = getNoVisibleField(field)
    }

    // 设置 Form.Item 的属性
    let props: AnyKeyProps = {
      ...field.formItemProps,
      label: field.title,
      name: field.key,
      extra: field.help
    }

    // 设定 开关、多选框 的值类型 （这是 ant design form 的限制）
    if (field.type && [FORM_TYPE_SWITCH, FORM_TYPE_CHECKBOX].includes(field.type)) {
      props.valuePropNaye = 'checked'
    }

    // 设置每个【表单项】的占位
    const colProps = {
      span: field.span !== 0 ? field.span || span || 12 : span || 12,
      offset: field.offset,
      key: field.key
    }

    // 不保留占位
    if (hidden) {
      colProps.span = 0
    }

    // 填充 rules 属性
    if (field.rules) {
      props.rules = [...field.rules]
    }

    // 填充快捷 required 属性
    if (field.required) {
      let rule = { required: true, message: getPlaceholder(field) }
      if (props.rules) {
        props.rules.push(rule)
      } else {
        props.rules = [rule]
      }
    }

    let tag: ReactNode = getTag(field, fields, setFieldsValue, readonly)

    return <Col {...colProps}>{field.render ? field.render(field, field._values || getDefaultValue(fields)) : <Form.Item {...props}>{tag}</Form.Item>}</Col>
  })
}

/**
 * 格式化 日期
 * @param values 格式化的数据
 * @param fields 配置项
 */
const formatValues = (values: AnyKeyProps, fields: Array<AyFormField>): AnyKeyProps => {
  let result: AnyKeyProps = {}
  for (let key in values) {
    let value = values[key]
    let field = fields.find((field) => field.key === key)
    if (value && field) {
      if (value.length && field.type === FORM_TYPE_DATE_RANGE) {
        // 区间类型取 startKey 与 endKey
        result[field.startKey || 'startKey'] = value[0].format('YYYY-MM-DD HH:mm:ss')
        result[field.endKey || 'endKey'] = value[0].format('YYYY-MM-DD HH:mm:ss')
      } else if (field.type === FORM_TYPE_DATE) {
        // 单值类型直接转
        result[key] = value.format('YYYY-MM-DD HH:mm:ss')
      } else {
        result[key] = value
      }
    } else {
      result[key] = value
    }
  }
  return result
}

/**
 * 提交表单，如果有 onConfirm 事件传入，则触发一次
 * @param values 表单值
 * @param onConfirm 提交表单事件
 */
const handleConfirm = (values: AnyKeyProps, fields: Array<AyFormField>, onConfirm?: (values: AnyKeyProps) => void) => {
  if (onConfirm) {
    onConfirm(formatValues(values, fields))
  }
}

/**
 * 支持表单改变事件监听
 * @param changedValues 改变的值
 * @param allValues 表单所有的值
 * @param fields 所有的饿配置项
 * @param setFieldsValue 设置表单值的方法
 */
const handleChange = (changedValues: AnyKeyProps, allValues: AnyKeyProps, fields: Array<AyFormField>, setFieldsValue: (params: AnyKeyProps) => void, setRefresh: any) => {
  for (let key in changedValues) {
    let field = fields.find((field) => field.key === key)
    if (field) {
      let value = changedValues[key]
      if (field.onChange) {
        field.onChange(value, allValues, setFieldsValue)
      }
    }
  }
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

export default forwardRef(function AyForm(props: DpFormProps, ref: Ref<any>) {
  const { fields, onConfirm, span, children, props: defaultProps, readonly, layout } = props
  const [, setRefresh] = useState<number>(0)

  /** 控制 any form 的实例 */
  const formRef: MutableRefObject<any> = useRef()
  /** 暴露出去的 form 的实例，允许父组件通过 ref 调用方法 */
  const formInstans: AnyKeyProps = {}
  /** 填充方法 */
  funcs.forEach((func) => {
    formInstans[func] = (...args: any) => formRef.current[func](...args)
  })
  formInstans.setFieldsValue = (values: AnyKeyProps) => {
    fields.forEach((field) => {
      if (field.type === FORM_TYPE_DATE) {
        if (values[field.key]) {
          values[field.key] = moment(values[field.key])
        }
      }
    })
    formRef.current.setFieldsValue(values)
  }
  formInstans.setRefresh = setRefresh
  /** 暴露方法 */
  useImperativeHandle(ref, () => formInstans)

  return (
    <div className="ay-form">
      <Form
        ref={formRef}
        {...defaultLayout}
        {...layout}
        name={props.name || 'ay-form'}
        initialValues={getDefaultValue(fields)}
        onFinish={(values) => handleConfirm(values, fields, onConfirm)}
        onValuesChange={(changedValues, allValues) => handleChange(changedValues, allValues, fields, formInstans.setFieldsValue, setRefresh)}
        {...defaultProps}
      >
        <Row>
          {getFormItem(fields, formInstans.setFieldsValue, span, readonly)}
          {children}
        </Row>
      </Form>
    </div>
  )
})
