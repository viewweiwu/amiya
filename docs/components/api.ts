import { AnyKeyProps } from '../types/AnyKeyProps'

export const professionOptions = [
  { label: '近卫干员', value: '近卫' },
  { label: '狙击干员', value: '狙击' },
  { label: '术师重装', value: '术师' },
  { label: '医疗干员', value: '医疗' },
  { label: '重装干员', value: '重装' },
  { label: '辅助干员', value: '辅助' },
  { label: '特种干员', value: '特种' },
  { label: '先锋干员', value: '先锋' }
]

/**
 * 模拟数据
 */
let data: Array<AnyKeyProps> = []

// 没有数据，加载数据
const loadData = () => {
  if (!data.length) {
    let local = localStorage.getItem('CHARA_DATA_1015')
    // 本地有数据用本地
    if (local) {
      data = JSON.parse(local)
    } else {
      fetch('https://cdn.weipaitang.com/static/public/2021101471bb486e-5211-486e5211-1287-875e331132b9.json')
        .then(res => {
          return res.json()
        })
        .then(json => {
          data = json.reverse()
          localStorage.setItem('CHARA_DATA_1015', JSON.stringify(data))
        })
    }
  }
}

loadData()

/**
 * 模拟列表请求接口，实际过程中请使用 axios 接口
 * @param params 查询参数
 * */
export const listApi = (params: AnyKeyProps): Promise<any> => {
  console.info('列表请求数据', params)
  const searchParams = {
    ...params.search,
    ...params.filters
  }
  return new Promise(resolve => {
    setTimeout(() => {
      // 筛选
      let content = data.filter(item => {
        let result = true
        for (let key in searchParams) {
          // 查询值
          let value = searchParams[key]
          if (item.hasOwnProperty(key) && item[key] !== undefined && value !== null) {
            if (
              (Array.isArray(value) && !value.includes(item[key])) ||
              (typeof value === 'number' && Number(item[key]) === value) ||
              (typeof value === 'string' && !(value + '').includes(item[key] + ''))
            ) {
              result = false
            }
          }
        }
        return result
      })
      // 排序
      const sorts = params.sorts || []
      sorts.forEach((option: AnyKeyProps) => {
        const { key, order } = option
        content.sort((a, b) => (order === 'descend' ? a[key] - b[key] : b[key] - a[key]))
      })
      // 总数
      const totalCount = content.length
      // 分页
      const page = params.pagination
      content = content.slice(page.pageSize * (page.current - 1), page.pageSize * page.current)
      resolve({
        content,
        totalCount
      })
    }, 300)
  })
}

/**
 * 测试接口，实际过程中请使用 axios 接口
 * */
export const emptyApi = (params?: any): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ msg: '请求成功' })
    }, 300)
  })
}

/**
 * 模拟新增
 * @param params 保存参数
 */
export const addApi = (params: AnyKeyProps): Promise<any> => {
  return new Promise(resolve => {
    data.unshift({
      id: Date.now(),
      ...params
    })
    resolve({
      msg: '请求成功',
      data: Date.now()
    })
  })
}

/**
 * 模拟修改
 * @param params 保存参数
 */
export const updateApi = (params: AnyKeyProps): Promise<any> => {
  return new Promise(resolve => {
    let index: number = data.findIndex(row => row.id === params.id)
    if (index >= 0 && data[index]) {
      data[index] = {
        ...data[index],
        ...params
      }
    }
    resolve({
      msg: '请求成功',
      data: data[index]
    })
  })
}

/**
 * 模拟详情
 */
export const detailApi = (): Promise<any> => {
  return new Promise(resolve => {
    resolve({
      msg: '请求成功',
      data: data[0]
    })
  })
}

/**
 * 模拟删除
 * @param params 删除的 id
 */
export const deleteApi = (params: AnyKeyProps): Promise<any> => {
  return new Promise(resolve => {
    data = data.filter(row => {
      return !params.includes(row.id)
    })
    resolve({
      msg: '删除成功',
      data: null
    })
  })
}

/**
 * 模拟失败
 * @param params 保存参数
 */
export const errorApi = (params: AnyKeyProps): Promise<any> => {
  return new Promise((_, reject) => {
    reject({
      msg: '请求失败',
      data: Date.now()
    })
  })
}
