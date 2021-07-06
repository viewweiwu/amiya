import { AnyKeyProps } from './../es/types/AnyKeyProps.d'

export const professionOptions = [
  { label: '近卫干员', value: 'WARRIOR', icon: require('./images/图标_职业_近卫.png') },
  { label: '狙击干员', value: 'SNIPER', icon: require('./images/图标_职业_狙击.png') },
  { label: '术师重装', value: 'CASTER', icon: require('./images/图标_职业_术师.png') },
  { label: '医疗干员', value: 'MEDIC', icon: require('./images/图标_职业_医疗.png') },
  { label: '重装干员', value: 'TANK', icon: require('./images/图标_职业_重装.png') },
  { label: '辅助干员', value: 'SUPPORT', icon: require('./images/图标_职业_辅助.png') },
  { label: '特种干员', value: 'SPECIAL', icon: require('./images/图标_职业_特种.png') },
  { label: '先锋干员', value: 'PIONEER', icon: require('./images/图标_职业_先锋.png') }
]

/**
 * 模拟数据
 */
let data: Array<AnyKeyProps> = []

// 没有数据，加载数据
const loadData = () => {
  if (!data.length) {
    let local = localStorage.getItem('CHARA_DATA')
    // 本地有数据用本地
    if (local) {
      data = JSON.parse(local)
    } else {
      // @ts-ignore
      import('./character_table.min.json').then(json => {
        let list = []
        let amiya
        for (let key in json) {
          if (key.startsWith('char')) {
            let row = json[key]
            let info = row.phases[0]?.attributesKeyFrames[1]?.data || {}
            row.id = key
            row.cname = row.name
            row.name = row.appellation
            row.createDate = Date.now()
            row.defaultAtk = info.atk
            row.defaultHp = info.maxHp
            if (row.appellation === 'Amiya') {
              amiya = row
            } else {
              list.push(row)
            }
          }
        }
        data = list.reverse()
        data.unshift(amiya)
        localStorage.setItem('CHARA_DATA', JSON.stringify(data))
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
          if (item.hasOwnProperty(key) && item[key] !== undefined) {
            if (
              (Array.isArray(value) && !value.includes(item[key] + '')) ||
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
