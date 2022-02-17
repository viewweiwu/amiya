# 注册自定义表格渲染列

这个页面的代码是写在 `/src/amiya/index.tsx` 文件里的，如果你还没有，可点击 [这里](../) 查看如何创建。

实际情况下，可以考虑把 registerTableRender 放到全局入口。

代码请看 `config.tsx`

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'
import { listApi } from '../../api'
import './config'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn'
  },
  {
    title: '星级',
    key: 'rarity',
    renderType: 'star'
  }
]

export default function Demo() {
  return (
    <AySearchTable
      title="全局 table render 方法注册"
      rowKey="sort_id"
      searchVisible={false}
      api={listApi}
      fields={fields}
    />
  )
}
```

<hr/>

```js
import { registerTableRender, RenderProps } from 'amiya'

/**
 * @decs 注册 renderType
 * @param renderTypeName string 注册类型名字
 * @param text string 当前 col 的数据
 * @param record object 当前 row 的数据
 * @param field 当前配置配置项
 *
 * @returns ReactNode
 */
registerTableRender('renderTypeName', ({ text, record, field }: RenderProps) => {
  return <span>{text}</span>
})

// 实际使用
const fields = [
  {
    renderType: 'renderTypeName' // 已经注册过后的名字
  }
]
```

<embed src="../index.md"></embed>
