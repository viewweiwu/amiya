import { AnyKeyProps } from './types/AnyKeyProps'

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

// 向右移位
function shiftRight(number: number, digit: any) {
  digit = parseInt(digit, 10)
  let value = number.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? +value[1] + digit : digit))
}
// 向左移位
function shiftLeft(number: number, digit: any) {
  digit = parseInt(digit, 10)
  let value = number.toString().split('e')
  return +(value[0] + 'e' + (value[1] ? +value[1] - digit : -digit))
}

/** 数字转大写 */
export const digitUppercase = (n: number) => {
  let fraction = ['角', '分']
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ]
  let head = n < 0 ? '欠' : ''
  n = Math.abs(n)
  let s = ''
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(shiftRight(n, 1 + i)) % 10] + fraction[i]).replace(/零./, '')
  }
  s = s || '整'
  n = Math.floor(n)
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = ''
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p
      n = Math.floor(shiftLeft(n, 1))
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
  }
  return (
    head +
    s
      .replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整')
  )
}

/**
 * 填充标题和值
 * @param item 当前循环项
 * @param labelKey 标题
 * @param valueKey 值
 */
const fillKey = (
  item: AnyKeyProps,
  labelKey: string,
  valueKey: string,
  format?: (data: AnyKeyProps) => AnyKeyProps
) => {
  item.title = item[labelKey]
  item.key = item[valueKey]
  if (format) {
    item = format(item)
  }
  return item
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
  hasChildren?: boolean
  /** 节点格式化 */
  format?(props: AnyKeyProps): AnyKeyProps
}

/**
 * 列表转树结构
 * @param props 配置参数
 */
export const listToTree = (props: ListToTreeProps) => {
  const {
    data = [],
    parentKey = 'parentId',
    labelKey = 'name',
    childrenKey = 'children',
    valueKey = 'id',
    rootValue = null,
    hasChildren = false,
    format
  } = props
  let list = copy(data)
  let map: AnyKeyProps = {}
  let roots: Array<AnyKeyProps> = []

  list.forEach((item: any, i: number) => {
    map[item[valueKey]] = i
    item[childrenKey] = []
  })
  list.forEach((node: AnyKeyProps) => {
    node = fillKey(node, labelKey, valueKey, format)
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
  if (!hasChildren) {
    list.forEach((item: AnyKeyProps) => {
      if (!item.children.length) {
        delete item.children
      }
    })
  }
  return roots
}

/**
 * base64 互转
 */
export const Base64 = {
  encode(str: string) {
    return btoa(
      encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match: string, p1: number) {
        return String.fromCharCode((`0x${p1}` as unknown) as number)
      })
    )
  },
  decode(str: string) {
    return decodeURIComponent(
      atob(str)
        .split('')
        .map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join('')
    )
  }
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
 * 输出 YYYY-MM-DD 格式
 * @param value
 */
// export const getDate = (value: any) => {
//   return value ? moment(value).format('YYYY-MM-DD') : value
// }

export default {}
