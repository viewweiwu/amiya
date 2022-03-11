import React from 'react'
import { AnyKeyProps } from './types/AnyKeyProps'
import { Option } from './AyForm/ay-form'
import { Badge, Tag } from 'antd'
import { TABLE_DEFAULT_ROW_KEY } from './constant'

/**
 * 拷贝对象
 * @param obj
 */
export const copy = (obj: AnyKeyProps) => {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * 获取随机数
 * @param min 最小随机数
 * @param max 最大随机数
 */
export const getRandom = (min: number, max: number) => {
  return min + Math.random() * (max - min)
}

/**
 * 获取随机数（带小数）
 * @param min 最小随机数
 * @param max 最大随机数
 */
export const getRandomFloor = (min: number, max: number) => {
  return min + Math.floor(Math.random() * (max - min + 1))
}

/**
 * 是否是对象
 * @param obj 判断对象
 */
export const isObj = (obj: any): boolean => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * 是否是方法
 * @param func 判断对象
 */
export const isFunc = (func: any): boolean => {
  return typeof func === 'function'
}

/**
 * 清空对象的 undefined 和 null
 * @param params 要清空的对象
 */
export const clearEmpty = (params: AnyKeyProps): AnyKeyProps => {
  let result: AnyKeyProps = {}

  for (let key in params) {
    if (params[key] === 0 || params[key]) {
      result[key] = params[key]
    }
  }
  return result
}

interface ListToTreeProps {
  /** 数据源 */
  data: Array<AnyKeyProps>
  /** 父节点 key */
  parentKey?: string
  /** 标题 key */
  labelKey?: string
  /** 子节点 key */
  childrenKey?: string
  /** 值 key */
  valueKey?: string
  /** 跟节点值 */
  rootValue?: string | null
  /** 是否拥有 children */
  keepLeaf?: boolean
}

/**
 * 列表转树结构
 * @param props 配置参数
 */
export const listToTree = (props: ListToTreeProps) => {
  const {
    data = [],
    parentKey = 'parentId',
    childrenKey = 'children',
    valueKey = 'id',
    rootValue = null,
    keepLeaf = false
  } = props
  let list = copy(data)
  let map: AnyKeyProps = {}
  let roots: Array<AnyKeyProps> = []
  list.forEach((item: any, i: number) => {
    map[item[valueKey]] = i
    item[childrenKey] = []
  })
  list.forEach((node: AnyKeyProps) => {
    let target = node[parentKey]
    if (target === rootValue) {
      roots.push(node)
    } else {
      if (map[target] !== undefined) {
        list[map[target]].children.push(node)
      } else {
        roots.push(node)
      }
    }
  })
  if (!keepLeaf) {
    list.forEach((item: AnyKeyProps) => {
      if (!item.children.length) {
        delete item.children
      }
    })
  }
  return roots
}

// 根据充值类型 id 获取对应的中文描述
export const getLabelByValue = (type: number = 1, options: AnyKeyProps) => {
  return options.find((option: AnyKeyProps) => option.value === type).label
}

/**
 * 数字转金额
 * @param value 金额
 */
export const getCurrencyValue = (value: any) => {
  if (typeof value !== 'number') {
    return '0'
  }
  return value.toLocaleString()
}

/**
 * 通过选项列表把 value 变成 label
 * @param value 当前值
 * @param options 选项列表
 */
export const getValueByOptions = (value: any, options: Array<Option>) => {
  let option = options.find(option => option.value === value)
  return option ? option.label : value
}

/**
 * 输出 YYYY-MM-DD 格式
 * @param value
 */
// export const getDate = (value: any) => {
//   return value ? moment(value).format('YYYY-MM-DD') : value
// }

/**
 * @desc渲染一个带颜色的状态
 *
 * @param status 状态值
 * @param options 选项
 *
 * @returns ReactNode
 */
export const renderStatus = (status: string | number, options: Option[], type: 'badge' | 'tag' = 'badge') => {
  const selectOption: Option | undefined = options.find(({ value }: AnyKeyProps) => value === status)

  if (!selectOption || !selectOption.label) {
    return status
  }

  if (!selectOption.color && !selectOption.status) {
    return selectOption.label
  }

  return (
    <div>
      {type === 'badge' ? (
        <Badge color={selectOption.color} status={selectOption.status} text={selectOption.label} />
      ) : (
        <Tag color={selectOption.color}>{selectOption.label}</Tag>
      )}
    </div>
  )
}

/**
 * 复制一个对象，只选择其中某些 key
 * @param obj 复制对象
 * @param key 要保留的 key，可以是数组
 * @returns 保留了 key 的对象
 */
export const optionObj = (obj: AnyKeyProps, key: string | Array<string>) => {
  let result: AnyKeyProps = {}
  if (typeof key === 'string') {
    result[key] = obj[key]
  } else if (Array.isArray(key)) {
    key.forEach(k => (result[k] = obj[k]))
  }
  return result
}

/**
 * 复制一个对象，并删除某些 key
 * @param obj 复制对象
 * @param key 要删除的 key，可以是数组
 * @returns 删除了 key 的对象
 */
export const omitObj = (obj: AnyKeyProps, key: string | Array<string>) => {
  let result = { ...obj }
  if (typeof key === 'string') {
    delete result[key]
  } else if (Array.isArray(key)) {
    key.forEach(k => delete result[k])
  }
  return result
}

/**
 * 根据行获取 rowKey，默认取 id
 * @param record 当前行
 * @param rowKey
 * @returns
 */
export const getRowKey = (record: AnyKeyProps, rowKey?: ((item: AnyKeyProps) => React.Key) | string) => {
  try {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    } else if (typeof rowKey === 'string') {
      return rowKey
    } else {
      return TABLE_DEFAULT_ROW_KEY
    }
  } catch {
    return TABLE_DEFAULT_ROW_KEY
  }
}

/**
 * 根据 rowKey 获取行的 key
 * @param record 当前行
 * @param rowKey
 * @returns
 */
export const getKey = (record: AnyKeyProps, rowKey?: ((item: AnyKeyProps) => React.Key) | string) => {
  return record[getRowKey(record, rowKey)]
}

export default {}
