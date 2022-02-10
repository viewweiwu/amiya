# 单选表格

跟多选表格基本一致，单选只需要把 `selectionType` 设置为 `radio` 即可。

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'
import { listApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn'
  },
  {
    title: '英文名',
    key: 'en'
  }
]

export default function Demo() {
  return (
    <AySearchTable
      title="单选表格"
      searchVisible={false}
      rowKey="sort_id"
      selectShowKey="cn"
      selectionType="radio"
      api={listApi}
      fields={fields}
    />
  )
}
```

```html
<AySearchTable selectionType="radio" />
```
