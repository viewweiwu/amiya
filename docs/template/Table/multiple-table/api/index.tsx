import { Record, AnyKeyProps } from 'amiya'

/** 商品信息 */
const data: Array<Record> = [
  {
    id: 1,
    goodsName: '第一个商品第一个商品第一个商品第一个商品第一个商品',
    sku: '红色、100x200',
    price: 100,
    count: 12,
    applyTime: Date.now()
  },
  {
    id: 2,
    goodsName: '第二个商品',
    sku: '蓝色、100x200',
    price: 120,
    count: 1,
    applyTime: Date.now()
  },
  {
    id: 3,
    goodsName: '第三个商品',
    sku: '绿色、100x200',
    price: 150,
    count: 1,
    applyTime: Date.now()
  }
]

export let goodsListApi = ({ search: searchParams }: AnyKeyProps): Promise<any> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        content: data,
        totalCount: data.length
      })
    }, 500)
  })

/** 审批信息 */
const auditData: Array<Record> = [
  {
    id: 1,
    status: 3,
    auditName: 'Amiya',
    createDate: Date.now()
  },
  {
    id: 2,
    status: 2,
    auditName: 'Amiya',
    createDate: Date.now()
  },
  {
    id: 3,
    status: 1,
    auditName: 'Amiya',
    createDate: Date.now()
  }
]
export let auditListApi = ({ search: searchParams }: AnyKeyProps): Promise<any> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        content: auditData,
        totalCount: auditData.length
      })
    }, 500)
  })

/** 操作信息 */
const operationData: Array<Record> = [
  {
    id: 1,
    content: '提交记录',
    operatorName: 'Amiya',
    createDate: Date.now()
  },
  {
    id: 2,
    content: '修改记录',
    operatorName: 'Amiya',
    createDate: Date.now()
  },
  {
    id: 3,
    content: '创建记录',
    operatorName: 'Amiya',
    createDate: Date.now()
  }
]
export let operationListApi = ({ search: searchParams }: AnyKeyProps): Promise<any> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        content: operationData,
        totalCount: operationData.length
      })
    }, 500)
  })
