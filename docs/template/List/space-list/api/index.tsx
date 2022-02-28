import { AnyKeyProps } from 'amiya'

const contentList = [
  `可以说在特定场景是个很好的选择，但二次封装会给定制化需求增加复杂度。还没仔细看源码，是否预留了足够的扩展性。
提个建议，在此阶段未覆盖 Antd 的大多数功能的情况下，尽量在库命名和 README 中着重突出适用场景，方便有此类需求用户快速找到此库。
[赞] Star 送上`
]

const data = [
  {
    id: '1',
    nickName: 'Amiya',
    cover: require('../image/avatar1.jpeg'),
    content: contentList[0],
    date: Date.now(),
    replies: [
      {
        id: '1-1',
        nickName: 'Amiya',
        cover: require('../image/avatar1.jpeg'),
        date: Date.now(),
        content: contentList[0]
      }
    ]
  },
  {
    id: '2',
    nickName: 'Amiya',
    cover: require('../image/avatar1.jpeg'),
    content: contentList[0],
    date: Date.now(),
    replies: [
      {
        id: '2-1',
        nickName: 'Amiya',
        date: Date.now(),
        cover: require('../image/avatar1.jpeg'),
        content: contentList[0]
      }
    ]
  }
]

export let listApi = (params: AnyKeyProps): Promise<any> =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({
        content: data,
        totalCount: data.length
      })
    }, 500)
  })
