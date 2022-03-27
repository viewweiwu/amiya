import { AnyKeyProps } from 'amiya'
import data from './data.json'

export const apiGetList = (params: AnyKeyProps): Promise<any> => {
  console.info('请求的列表参数：', params)
  return new Promise(resolve => {
    resolve({
      content: data.data.content,
      totalCount: data.data.totalElements
    })
  })
}

export const apiGetCount = () => {
  console.info('请求了数字')
  return new Promise(resolve => {
    resolve([
      { status: 'ALL', count: 2037 },
      { status: 'ACTIVE', count: 21 },
      { status: 'IN_PROCESS', count: 1 },
      { status: 'DISABLED', count: 1 },
      { status: 'DRAFT', count: 1940 },
      { status: 'SOLD_OUT', count: 10 },
      { status: 'UPDATE_FAILED', count: 64 }
    ])
  })
}
