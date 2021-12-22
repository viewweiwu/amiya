---
order: 1
---

# 请求前处理

这个页面的代码是写在 `/src/amiya/config.tsx` 文件里的，如果你还没有，可点击 [这里](../) 查看如何创建。

![amiya AySearchTable](https://misc.hzzcckj.cn/upload/image/202011/acf47931f000000.png)

全局 AySearchTable `请求前` 处理。

后端提供的查询接口往往有自己的风格，可以使用此方法来对请求前做一个数据重组。

`请求后` 处理看 [这里](/全局方法/set-default-data-filter)

```js
import { setDefaultSearchFilter } from 'amiya'
/**
 * @param params 查询前数据。
 *
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
