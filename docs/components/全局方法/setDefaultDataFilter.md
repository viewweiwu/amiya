---
order: 2
---

# AySearchTable 全局请求返回处理

## 约定返回的格式

在使用 `<AySearchTable api={someListApi} />` 的时候，`someListApi` 到底是什么，可能会有疑问。

实际上只需要返回时 `Promise` 格式的列表就可以了，如下面这个例子：

```jsx | pure
import React from 'react'

// 列表接口返回示例
const someListApi = () => axios.get('/some/list')

// AySearchTable 约定返回的数据格式
{
  // 列表数据
  content: [
    {
      id: '123',
      name: 'Amiya'
    },
    // ...
  ],
  // 总页数
  totalCount: 100
}

export default function Demo() {
  return <AySearchTable api={someListApi} />
}
```

如果提供的查询接口返回的格式不同，可用下面的方法，为其加一个中间件。

## 自定义返回格式

根约定返回不一致时，参考如下：

```js
// 列表接口返回示例
const someListApi = () => axios.get('/some/list')

// 请求成功后返回的数据示例
{
  success: true,
  msg: '',
  data: {
    rows: [
      {
        id: '123',
        name: 'Amiya'
      },
      // ...
    ],
    total: 100
  }
}

```

如果接口放回的格式是上方这种形式，请把下面的配置文件复制到 `/src/amiya/index.tsx` 下。

```js
import { setDefaultDataFilter } from 'amiya'

/**
 * 表格请求后过滤
 * @param data object 接口请求完成的数据
 */
setDefaultDataFilter((res: AnyKeyProps) => {
  // return 的对象需要包含以下两条数据
  return {
    // 表格列表的数据
    content: res.data.rows,
    // 数据总共 n 条
    totalCount: res.data.total
  }
})
```

此方法 `<AySearchList api={someListApi} />` 也是一起生效的。

也许你还需要请求前的处理，请看[这里](./set-default-search-filter)

<embed src="./index.md"></embed>
