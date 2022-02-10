---
order: 1
---

# AySearchTable 全局请求前处理

默认的请求会带上 4 个参数，如下面这个例子：

## 约定提交查询的数据

```jsx | pure
import React from 'react'

// 列表接口查询示例，需要接口是个 promise，这里用 axios 举例
const listApi = params => axios.get('/some/list', params)

export default function Demo() {
  return <AySearchTable api={listApi} />
}
```

```js
// listApi 的 params 请求值详解
{
  // 表格的筛选
  filters: {}
  // 分页数据
  pagination: {
    // 每页条数
    pageSize: 10,
    // 当前页数
    current: 1
  }
  // 顶部查询数据
  search: {}
  // 排序数据
  sorts: []
}
```

如果不符合约定的格式，可以使用下面的方法，为组件添加一层中间件。

## 自定义请求格式

```js
import { setDefaultSearchFilter } from 'amiya'
/**
 * @desc 请求前接口数据处理。
 * @param params.pagination { pageSize: number, current: number } 分页数据
 * @param params.search object 查询数据
 * @param params.filter object 筛选的对象
 * @param params.sorts Array<{ key: string, order: 'ascend' | 'descend' }> 排序
 */
setDefaultSearchFilter((params: object) => {
  // return 的数据会作为实际表格所请求的数据，此处为一个示例
  return {
    pagination: {
      pageNumber: params.pagination.current,
      pageSize: params.pagination.pageSize
    },
    search: {
      ...params.search,
      ...params.filters
    },
    sorts: params.sorts
  }
})
```

请把上面的配置文件复制到 `/src/amiya/index.tsx` 下。

此方法 `<AySearchList api={listApi} />` 也是一起生效的。

也许你还需要请求后的处理，请看[这里](./set-default-data-filter)

<embed src="./index.md"></embed>
