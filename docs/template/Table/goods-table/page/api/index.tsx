import { AnyKeyProps, FormValues } from 'amiya'
// @ts-ignore
import data from './data.json'

export const apiGetList = (params: AnyKeyProps): Promise<any> => {
  console.info('请求的列表参数：', params)
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        content: data.data.content,
        totalCount: data.data.totalCount
      })
    }, 300)
  })
}

export const apiGetCount = () => {
  console.info('请求了数字')
  return new Promise(resolve => {
    resolve([
      { status: '1', count: 30 },
      { status: '2', count: 40 },
      { status: '3', count: 1 },
      { status: '4', count: 1 },
      { status: '5', count: 50 }
    ])
  })
}

/** 获取国家选项 */
export const apiGetCountryOptions = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          label: '中国',
          value: 1,
          cover: '🇨🇳'
        },
        {
          label: '日本',
          value: 2,
          cover: '🇯🇵'
        },
        {
          label: '美国',
          value: 3,
          cover: '🇺🇸'
        },
        {
          label: '印度尼西亚',
          value: 4,
          cover: '🇮🇩'
        }
      ])
    }, 300)
  })
}

/** 获取店铺选项 */
export const apiGetShopOptions = ({ countryId }: FormValues) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { label: '店铺A' + countryId, value: 1 },
        { label: '店铺B' + countryId, value: 2 },
        { label: '店铺C' + countryId, value: 3 },
        { label: '店铺D' + countryId, value: 4 }
      ])
    }, 300)
  })
}
