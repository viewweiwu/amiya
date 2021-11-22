# 禁用表格选项

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'
import { listApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    type: 'group'
  },
  {
    title: '英文名',
    key: 'en'
  }
]

export default function Demo() {
  return (
    <AySearchTable
      title="下面的表格禁用了 Amiya 的选项"
      selectionType="checkbox"
      api={listApi}
      fields={fields}
      searchVisible={false}
      rowKey="sort_id"
      selectShowKey="cn"
      rowSelection={{
        getCheckboxProps: (record: any) => {
          return {
            disabled: record.en === 'Amiya'
          }
        }
      }}
    />
  )
}
```

```diff
<AySearchTable
+ rowSelection={{
+   getCheckboxProps: (record: any) => {
+     return {
+       disabled: record.en === 'Amiya'
+     }
+   }
+ }}
/>
```
