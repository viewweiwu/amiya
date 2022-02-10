# 右侧查询

当只有 <span style="color: #f06;">一个</span> 查询条件的时候，我们可以考虑把查询框放在右侧。

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'
import { listApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: {
      type: 'search',
      placeholder: '请输入查询关键字',
      position: 'more'
    },
    dialog: {
      required: true
    }
  },
  {
    title: '英文名',
    key: 'en',
    dialog: {
      required: true
    }
  }
]

export default function Demo() {
  return <AySearchTable searchVisible={false} title="看右边👉👉👉👉" api={listApi} fields={fields} />
}
```

```diff
const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: {
      type: 'search',
      // 设置此项就会在出现在右处
+     position: 'more'
    }
  }
]
<AySearchTable
+ searchVisible={false}
  title="看右边👉👉👉👉"
  api={listApi}
  fields={fields}
/>
```
