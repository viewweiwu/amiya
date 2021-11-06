# 表头合并

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'
import { listApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'names', // 请给予这个地方 key，否则表头的自定义别名会出现意外结果
    table: {
      children: [
        {
          title: '中文名',
          key: 'cn'
        },
        {
          title: '英文名',
          key: 'en'
        },
        {
          title: '日文名',
          key: 'jp'
        }
      ]
    }
  },
  {
    title: '初始HP',
    key: 'ori-hp'
  },
  {
    title: '初始攻击',
    key: 'ori-atk'
  }
]

export default function Demo() {
  return <AySearchTable title="表格标题" searchVisible={false} api={listApi} fields={fields} />
}
```
