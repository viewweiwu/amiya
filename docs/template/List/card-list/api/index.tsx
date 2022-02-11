import { Record, AnyKeyProps } from 'amiya'

/**
 * 获取随机数
 * @param min 最小随机数
 * @param max 最大随机数
 */
export const getRandom = (min: number, max: number): number => {
  return Math.floor(min + Math.random() * (max - min + 1))
}

const data: Array<Record> = Array.from({ length: 100 }).map(item => {
  return {
    name: '商品名称商品名称商品名称商品名称商品名称商品名称商品名称',
    desc: '物美价廉好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵好吃不贵',
    price: getRandom(100, 10000),
    buyNum: getRandom(1, 1000),
    cover: [
      require('../image/banana.jpg'),
      require('../image/apple.jpg'),
      require('../image/orange.jpg'),
      require('../image/pear.jpg')
    ][getRandom(0, 3)]
  }
})

// 时间筛选没有做
export let listApi = (params: AnyKeyProps): Promise<any> =>
  new Promise(resolve => {
    const { search: searchParams }: AnyKeyProps = params
    console.info('查询参数：', params)
    setTimeout(() => {
      // 筛选
      let content = data.filter(item => {
        let result = true
        for (let key in searchParams) {
          // 查询值
          let value = searchParams[key]
          if (item.hasOwnProperty(key) && item[key] !== undefined && value !== null) {
            if (
              (typeof value === 'number' && Number(item[key]) !== value) ||
              (typeof value === 'string' && !(item[key] + '').includes(value + ''))
            ) {
              result = false
            }
          }
        }
        return result
      })

      resolve({
        content,
        totalCount: content.length
      })
    }, 500)
  })
