# 设置表格默认属性

可以通过 `setTableDefaultProps` 设置一些表格的默认属性，现在你可以跑到其它表格页面，会发现已经没有了边框。

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField, setTableDefaultProps } from 'amiya'
import { listApi } from '../api'

setTableDefaultProps({
  bordered: false
})

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: true
  },
  {
    title: '英文名',
    key: 'en',
    search: true
  }
]

export default function Demo() {
  return <AySearchTable title="取消全局表格的边框" rowKey="sort_id" api={listApi} fields={fields} />
}
```

<embed src="./index.md"></embed>
