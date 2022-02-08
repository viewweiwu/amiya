import { AnyKeyProps, Record } from 'amiya'

let data: Array<Record> = [
  {
    id: '1',
    avatar: require('../images/avatar1.jpg'),
    nickname: '员工A',
    username: '15944443333',
    character: [1],
    email: 'aa@bb.com',
    linkAccount: ['wechat', 'qq', 'weibo', 'twitter'],
    status: 1
  },
  {
    id: '2',
    avatar: require('../images/avatar2.jpg'),
    nickname: '员工B',
    username: '18955556666',
    character: [2],
    email: 'aa@bb.com',
    linkAccount: ['wechat'],
    status: 1
  },
  {
    id: '3',
    avatar: require('../images/avatar3.jpg'),
    nickname: '员工C',
    username: '13244445555',
    character: [2, 3],
    email: 'aa@bb.com',
    linkAccount: ['qq', 'weibo'],
    status: 1
  },

  {
    id: '4',
    avatar: require('../images/avatar4.jpg'),
    nickname: '员工D',
    username: '17688889999',
    character: [3],
    email: 'aa@bb.com',
    linkAccount: ['wechat', 'twitter'],
    status: 2
  },
  {
    id: '5',
    avatar: require('../images/avatar5.jpg'),
    nickname: '员工E',
    username: '13866665555',
    character: [3],
    email: 'aa@bb.com',
    linkAccount: ['wechat'],
    status: 3
  }
]

export const listApi = (): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        content: [...data],
        totalCount: data.length
      })
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
      id: Date.now() + '',
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

export const deleteApi = (params: AnyKeyProps): Promise<any> => {
  return new Promise(resolve => {
    setTimeout(() => {
      data = data.filter(row => {
        return !params.includes(row.id)
      })
      resolve({})
    }, 300)
  })
}
