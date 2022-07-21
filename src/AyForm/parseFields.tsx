import { FORM_TYPE_DATE, FORM_TYPE_DATE_RANGE } from '@/constant'
import moment from 'moment'
import { isValidElement } from 'react'
import { FormValues } from '../types/FormValues'
import { isObj } from '../utils'
import { AyFormField } from './ay-form'

/** 是否是表达式 */
export const isExpression = (value: string) => {
  if (typeof value !== 'string') {
    return false
  }
  return /^{{(.+)}}$/.test(value)
}

/** 转化表达式 */
export function parseExpression(expression: string, formValues: FormValues) {
  const func = expression.substring(2, expression.length - 2)
  const str = func.replace(/formValues/g, JSON.stringify(formValues))
  try {
    return new Function('return (' + str + ')')()
  } catch {
    console.error('fields 表达式转化错误')
  }
  return str
}

/**
 * 转化表单项了里面所有的表达式
 * @param fields 当前配置项
 * @param formatValues 表单的值
 * @returns 新的配置项
 */
export default function parseFields(fields: Array<AyFormField>, formatValues: FormValues) {
  const loop = (field: AyFormField) => {
    let newField = field
    for (let key in newField) {
      let value = newField[key]
      if (Array.isArray(value) && key === 'children') {
        // 携带子元素
        newField[key] = value.map(field => loop({ ...field }))
      } else if (isObj(value)) {
        // 过滤掉 moment 方法、ReactElement 节点
        if (moment.isMoment(value) || isValidElement(value)) {
          continue
        }
        newField[key] = loop({ ...value })
      } else if (isExpression(value)) {
        // 把表达式转化成值
        newField[key] = parseExpression(value, formatValues)
      }
    }
    return newField
  }
  return fields.map(field => {
    return loop({ ...field })
  })
}

/**
 * 获得格式化后的日期
 * @param value 当前值
 * @param field 配置项
 * @param readonly 是否只读
 * @returns
 */
export const getDateValue = (value: any, field: AyFormField, readonly?: boolean) => {
  // 获得格式化日期格式
  let formatRule: string = field?.showTime || field?.props?.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  if (field.formatRule) {
    formatRule = field.formatRule
  }
  // 只读模式下，格式化日期取 readonlyFormatRule
  if (field.readonlyFormatRule && readonly) {
    formatRule = field.readonlyFormatRule
  }
  if (field.type === FORM_TYPE_DATE) {
    // 日期格式化
    value = value ? moment(value).format(formatRule) : null
  } else if (Array.isArray(value) && field.type === FORM_TYPE_DATE_RANGE) {
    let [value0, value1] = value
    // 日期区间格式化
    value = [value0 ? moment(value0).format(formatRule) : null, value1 ? moment(value1).format(formatRule) : null]
  }
  return value
}
