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
import { AyFormField, AyFormProps, FieldListener, RegisterFieldProps } from './ay-form'
import { copy } from '../utils'
import { AySearchField } from '../AySearch/ay-search'
moment.locale('zh-cn')

const defaultLayout = {
  labelCol: { flex: '120px' },
  wrapperCol: { flex: '1' }
}

const fieldMap: AnyKeyProps = {}

export const registerField = (field: RegisterFieldProps) => {
  fieldMap[field.type] = field
}

// 注册输入框
registerField({
  type: FORM_TYPE_INPUT,
  defaultValue: FORM_DEFAULT_VALUE_INPUT,
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
    <Input
      placeholder={`请输入${field.title}`}
      disabled={readonly}
      maxLength={INPUT_DEFAULT_MAXLENGTH}
      allowClear={FORM_DEFAULT_ALLOW_CLEAR}
      {...field.props}
    />
  )
})

// 注册数字框
registerField({
  type: FORM_TYPE_NUMBER,
  defaultValue: FORM_DEFAULT_VALUE_NUMBER,
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
    <InputNumber
      placeholder={`请输入${field.title}`}
      className="max-width"
      disabled={readonly}
      min={NUMBER_DEFAULT_MIN}
      max={NUMBER_DEFAULT_MAX}
      {...field.props}
    />
  )
})

// 注册百分比数字框
registerField({
  type: FORM_TYPE_PERCENT,
  defaultValue: FORM_DEFAULT_VALUE_PERCENT,
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
    <InputNumber
      placeholder={`请输入${field.title}`}
      className="max-width"
      disabled={readonly}
      min={NUMBER_DEFAULT_MIN}
      max={PERCENT_DEFAULT_MAX}
      formatter={(value?: string | number) => (value !== '' ? `${value}%` : '')}
      parser={(value?: string) => (value || '').replace('%', '')}
      {...field.props}
    />
  )
})

// 注册密码框
registerField({
  type: FORM_TYPE_PASSWORD,
  defaultValue: FORM_DEFAULT_VALUE_PASSWORD,
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
    <Input.Password placeholder={`请输入${field.title}`} disabled={readonly} allowClear={FORM_DEFAULT_ALLOW_CLEAR} {...field.props} />
  )
})

// 注册富文本框
registerField({
  type: FORM_TYPE_EDITOR,
  defaultValue: FORM_DEFAULT_VALUE_EDITOR,
  render: (
    field: AyFormField,
    setFieldsValue: (params: AnyKeyProps) => void,
    readonly: boolean,
    addFieldListener: (key: string, fieldListener: FieldListener) => void
  ) => {
    return <AyEditor placeholder={`请输入${field.title}`} disabled={readonly} {...field.props} />
  }
})

// 注册多行文本框
registerField({
  type: FORM_TYPE_TEXTAREA,
  defaultValue: FORM_DEFAULT_VALUE_TEXTAREA,
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
    <Input.TextArea
      placeholder={`请输入${field.title}`}
      disabled={readonly}
      allowClear={FORM_DEFAULT_ALLOW_CLEAR}
      maxLength={TEXTAREA_DEFAULT_MAXLENGTH}
      {...field.props}
    />
  )
})

// 注册选择框
registerField({
  type: FORM_TYPE_SELECT,
  defaultValue: FORM_DEFAULT_VALUE_SELECT,
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
    <AySelect
      placeholder={`请选择${field.title}`}
      disabled={readonly}
      allowClear={FORM_DEFAULT_ALLOW_CLEAR}
      options={field.options}
      {...field.props}
    />
  )
})

// 注册开关
registerField({
  type: FORM_TYPE_SWITCH,
  defaultValue: FORM_DEFAULT_VALUE_SWITCH,
  valuePropName: 'checked',
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => <Switch disabled={readonly} {...field.props} />
})

// 注册单个选择框
registerField({
  type: FORM_TYPE_CHECKBOX,
  defaultValue: FORM_DEFAULT_VALUE_CHECKBOX,
  valuePropName: 'checked',
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => <Checkbox disabled={readonly} {...field.props} />
})

// 注册多个选择框
registerField({
  type: FORM_TYPE_CHECKBOX_GROUP,
  defaultValue: FORM_DEFAULT_VALUE_CHECKBOX_GROUP,
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
    <Checkbox.Group disabled={readonly} options={field.options} {...field.props} />
  )
})

// 注册多个单选框
registerField({
  type: FORM_TYPE_RADIO_GROUP,
  defaultValue: FORM_DEFAULT_VALUE_RADIO_GROUP,
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
    <Radio.Group disabled={readonly} options={field.options} {...field.props} />
  )
})

const renderExtraFooter = (setFieldsValue: (params: AnyKeyProps) => void, field: AnyKeyProps) => {
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

// 注册日期
registerField({
  type: FORM_TYPE_DATE,
  defaultValue: FORM_DEFAULT_VALUE_DATE,
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
    <DatePicker disabled={readonly} className="max-width" renderExtraFooter={() => renderExtraFooter(setFieldsValue, field)} {...field.props} />
  )
})

// 区间日期快捷选项
const ranges: any = {
  今天: [moment().startOf('day'), moment().endOf('day')],
  昨天: [moment().subtract(1, 'day'), moment().subtract(1, 'day').endOf('day')],
  本周: [moment().startOf('week'), moment().endOf('day')],
  上周: [moment().startOf('week').subtract(7, 'day'), moment().endOf('week').subtract(7, 'day')],
  本月: [moment().startOf('month'), moment().endOf('day')],
  上月: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
}

// 注册区间日期
registerField({
  type: FORM_TYPE_DATE_RANGE,
  defaultValue: FORM_DEFAULT_VALUE_DATE_RANGE,
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => (
    <DatePicker.RangePicker disabled={readonly} className="max-width" ranges={ranges} {...(field.props as any)} />
  )
})

// 注册空节点
registerField({
  type: FORM_TYPE_EMPTY,
  defaultValue: FORM_DEFAULT_VALUE_EMPTY,
  render: (field: AyFormField, setFieldsValue: (params: AnyKeyProps) => void, readonly: boolean) => <input hidden type="text" />
})

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
      if (fieldMap[field.type]) {
        const fieldItem = fieldMap[field.type]
        let defaultValue = fieldItem.defaultValue
        defaultValue = typeof defaultValue === 'object' ? copy(defaultValue) : defaultValue
        form[field.key] = defaultValue
      } else {
        form[field.key] = undefined
      }
    }
  })
  return form
}

/**
 * 根据不同的 type 生成不同种类的标签 Tag
 * @param field 配置项
 */
const getTag = (
  field: AyFormField,
  fields: Array<AyFormField>,
  setFieldsValue: (params: AnyKeyProps) => void,
  addFieldListener: (key: string, fieldListener: FieldListener) => void,
  readonly?: boolean
) => {
  let { type } = field
  type = type || 'input'
  let tag: ReactNode = null
  if (fieldMap[type || '']) {
    let fieldItem = fieldMap[type || '']
    tag = fieldItem.render(field, setFieldsValue, readonly || false, addFieldListener)
  } else {
    switch (type) {
      case FORM_TYPE_CUSTOM:
        if (typeof field.renderContent === 'function') {
          tag = field.renderContent(field, field._values || getDefaultValue(fields))
        }
        break
    }
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
const getFormItem = (
  fields: Array<AyFormField>,
  setFieldsValue: (params: AnyKeyProps) => void,
  addFieldListener: (key: string, fieldListener: FieldListener) => void,
  span?: number,
  readonly?: boolean
) => {
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

    // 设定 开关、多选框 等的值类型 （这是 ant design form 的限制）
    if (field.type && fieldMap[field.type]) {
      props.valuePropName = fieldMap[field.type].valuePropName || 'value'
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

    let tag: ReactNode = getTag(field, fields, setFieldsValue, addFieldListener, readonly)

    return (
      <Col {...colProps}>
        {field.render ? field.render(field, field._values || getDefaultValue(fields)) : <Form.Item {...props}>{tag}</Form.Item>}
      </Col>
    )
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
const handleChange = (
  changedValues: AnyKeyProps,
  allValues: AnyKeyProps,
  fields: Array<AyFormField>,
  setFieldsValue: (params: AnyKeyProps) => void,
  listnerList: Array<{ key: string; fieldListener: FieldListener }>
) => {
  for (let key in changedValues) {
    let field: AyFormField | undefined = fields.find((field) => field.key === key)
    if (field) {
      let value = changedValues[key]
      if (field.onChange) {
        field.onChange(value, allValues, setFieldsValue)
      }
      // 如果监听器里命中目标，则触发目标事件
      listnerList.forEach((item: { key: string; fieldListener: FieldListener }) => {
        if (item.key === key && field) {
          item.fieldListener(value, field)
        }
      })
    }
  }
}

/**
 * antd form 原生支持的方法尽数暴露出去
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

export default forwardRef(function AyForm(props: AyFormProps, ref: Ref<any>) {
  const { fields, onConfirm, span, children, props: defaultProps, readonly, layout } = props

  /** 控制 any form 的实例 */
  const formRef: MutableRefObject<any> = useRef()
  const [listnerList, setListnerList] = useState<Array<any>>([])
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
  /** 暴露方法 */
  useImperativeHandle(ref, () => formInstans)

  const addFieldListener = (key: string, fieldListener: FieldListener) => {
    let newListner = [...listnerList]
    newListner.push({
      key,
      fieldListener
    })
    setListnerList(newListner)
  }

  return (
    <div className="ay-form">
      <Form
        ref={formRef}
        {...defaultLayout}
        {...layout}
        name={props.name || 'ay-form'}
        initialValues={getDefaultValue(fields)}
        onFinish={(values) => handleConfirm(values, fields, onConfirm)}
        onValuesChange={(changedValues, allValues) => handleChange(changedValues, allValues, fields, formInstans.setFieldsValue, listnerList)}
        {...defaultProps}
      >
        <Row>
          {getFormItem(fields, formInstans.setFieldsValue, addFieldListener, span, readonly)}
          {children}
        </Row>
      </Form>
    </div>
  )
})
