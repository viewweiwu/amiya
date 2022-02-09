import qs from 'qs'

export const listApi = (params: { pagination: { current: number; pageSize: number }; search: { tab: string } }) =>
  new Promise(resolve => {
    fetch(
      'https://cnodejs.org/api/v1/topics?' +
        qs.stringify({
          page: params?.pagination?.current,
          limit: params?.pagination?.pageSize,
          tab: params?.search.tab
        })
    )
      .then(response => response.json())
      .then(res => {
        resolve({
          content: res.data,
          totalCount: 1000
        })
      })
  })

export const detailApi = (params: { id: string }) =>
  fetch(`https://cnodejs.org/api/v1/topic/${params.id}`).then(response => response.json())
