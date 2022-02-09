import { Record, AnyKeyProps } from 'amiya'
const data: Array<Record> = [
  {
    id: 1,
    name: '第一个商品',
    type: 1,
    status: 1,
    applyTime: Date.now()
  },
  {
    id: 2,
    name: '第二个商品',
    type: 2,
    status: 2,
    applyTime: Date.now()
  },
  {
    id: 3,
    name: '第三个商品',
    type: 3,
    status: 3,
    applyTime: Date.now()
  }
]

// 时间筛选没有做
export let listApi = ({ search: searchParams }: AnyKeyProps): Promise<any> =>
  new Promise(resolve => {
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
