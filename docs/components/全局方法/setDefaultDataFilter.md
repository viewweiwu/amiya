---
order: 2
---

# 请求后处理

这个页面的代码是写在 `/src/amiya/config.tsx` 文件里的，如果你还没有，可点击 [这里](../) 查看如何创建。

![amiya AySearchTable](https://misc.hzzcckj.cn/upload/image/202011/acf47931f000000.png)

全局 AySearchTable `请求后` 处理。

后端提供的查询接口返回的数据往往有自己的风格，可以使用此方法来对请求后做一个数据重组，来重新“喂”给 AySearchTable。

`请求前` 处理看 [这里](/全局方法/set-default-search-filter)

```js
/**
 * 表格请求后过滤
 * @param data object 接口请求完成的数据
 */
setDefaultDataFilter((data: AnyKeyProps) => {
  // return 的对象需要包含以下两条数据
  return {
    // 表格列表的数据
    content: data.rows,
    // 数据总共 n 条
    totalCount: data.total
  }
})
```
