# 控制表格选中

```tsx
import React, { useRef } from 'react'
import { AySearchTable, AyButton, AySearchTableField, Record } from 'amiya'
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
  const tableRef = useRef<any>()

  /**
   * 表格加载完成后默认选中第一条
   */
  const handleLoad = () => {
    let secondRow = tableRef.current.getTableData()[0]
    tableRef.current.setSelection([secondRow])
  }

  /**
   * 设置第二条选中
   */
  const setSecondSelection = () => {
    // 获取到第二条数据
    let secondRow = tableRef.current.getTableData()[1]
    tableRef.current.setSelection([secondRow])
  }

  /**
   * 添加第三条选中
   */
  const addThirdSelection = () => {
    // 获取到第三条数据
    let secondRow = tableRef.current.getTableData()[2]
    tableRef.current.addSelection([secondRow])
  }

  /**
   * 清空所有选中
   */
  const clearSelection = () => {
    tableRef.current.clearSelection()
  }

  /**
   * 监听行选中
   */
  const onSelectionChange = (selection: Array<Record>, keys: Array<string>) => {
    console.log('已经选中的行', selection, keys)
  }

  return (
    <AySearchTable
      title="表格默认选中第一条"
      ref={tableRef}
      rowKey="sort_id"
      selectShowKey="cn"
      searchVisible={false}
      selectionType="checkbox"
      api={listApi}
      fields={fields}
      onSelectionChange={onSelectionChange}
      onLoad={handleLoad}
    >
      <AyButton onClick={setSecondSelection}>设置只有第二条选中</AyButton>
      <AyButton onClick={addThirdSelection}>添加第三条选中</AyButton>
      <AyButton onClick={clearSelection}>清空选中</AyButton>
    </AySearchTable>
  )
}
```

```diff

+const handleLoad = () => {
+  let secondRow = tableRef.current.getTableData()[0]
+  tableRef.current.setSelection([secondRow])
+}

<AySearchTable
  title="表格默认选中第一条"
  ref={tableRef}
  rowKey="sort_id"
  selectShowKey="cn"
  searchVisible={false}
  selectionType="checkbox"
  api={listApi}
  fields={fields}
  onSelectionChange={onSelectionChange}
+ onLoad={handleLoad}
/>
```
