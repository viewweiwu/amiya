# 筛选与排序

amiya 精简了原来的 antd 提供的配置，`sort: true` 指定此列需要排序，`filter: true` 指定此列需要筛选。

可以观察下面这个示例，_星级_ 的排序是没有多列筛选的，_初始 HP_ 、 _初始攻击_ 是多列筛选。

```tsx
/**
 * title: 排序
 * desc: amiya 默认就是服务端排序和筛选；多列排序需要额外设置 `sortOrder`，数字越大权重越高；多选筛选需要指定 `filterMultiple`。
 */
import React, { useRef } from 'react'
import { AySearchTable, AySearchTableField, AyButton } from 'amiya'
import { professionOptions, listApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    width: 300
  },
  {
    title: '初始HP',
    key: 'ori-hp',
    sort: true,
    sortOrder: 1 // 排序顺序，数字越高权重越大
  },
  {
    title: '初始攻击',
    key: 'ori-atk',
    sort: true,
    sortOrder: 2 // 排序顺序，数字越高权重越大
  },
  {
    title: '星级(单选)',
    key: 'rarity',
    options: [
      { label: '⭐️', value: 0 },
      { label: '⭐️⭐️', value: 1 },
      { label: '⭐️⭐️⭐️', value: 2 },
      { label: '⭐️⭐️⭐️⭐️', value: 3 },
      { label: '⭐️⭐️⭐️⭐️⭐️', value: 4 },
      { label: '⭐️⭐️⭐️⭐️⭐️⭐️', value: 5 }
    ],
    width: 300,
    sort: true,
    filter: true
  },
  {
    title: '职业(多选)',
    key: 'class',
    type: 'select',
    options: professionOptions,
    filter: true,
    filterMultiple: true
  }
]

export default function Demo() {
  const ref = useRef<any>(null)

  return (
    <AySearchTable searchVisible={false} rowKey="sort_id" ref={ref} title="表格标题" api={listApi} fields={fields}>
      <AyButton onClick={() => ref.current.clearFilters()}>清空全部过滤值</AyButton>
      <AyButton onClick={() => ref.current.clearSorts()}>清空全部排序</AyButton>
      <AyButton
        onClick={() => {
          ref.current.clearFilters()
          ref.current.clearSorts()
        }}
      >
        清空排序&过滤
      </AyButton>
    </AySearchTable>
  )
}
```

## 默认值

```tsx
import React, { useRef } from 'react'
import { AySearchTable, AySearchTableField, AyButton } from 'amiya'
import { professionOptions, listApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    width: 300
  },
  {
    title: '初始HP',
    key: 'ori-hp',
    sort: true,
    defaultSortsValue: 'ascend',
    sortOrder: 2 // 排序顺序，数字越高权重越大
  },
  {
    title: '初始攻击',
    key: 'ori-atk',
    sort: true,
    defaultSortsValue: 'descend',
    sortOrder: 1 // 排序顺序，数字越高权重越大
  },
  {
    title: '星级(单选)',
    key: 'rarity',
    options: [
      { label: '⭐️', value: 0 },
      { label: '⭐️⭐️', value: 1 },
      { label: '⭐️⭐️⭐️', value: 2 },
      { label: '⭐️⭐️⭐️⭐️', value: 3 },
      { label: '⭐️⭐️⭐️⭐️⭐️', value: 4 },
      { label: '⭐️⭐️⭐️⭐️⭐️⭐️', value: 5 }
    ],
    width: 300,
    sort: true,
    filter: true,
    // 注意，此处只能是字符串，如果 option 里面是数字，会默认被转成字符串
    defaultFilterValue: [1]
  },
  {
    title: '职业(多选)',
    key: 'class',
    type: 'select',
    options: professionOptions,
    filter: true,
    filterMultiple: true
  }
]

export default function Demo() {
  const ref = useRef<any>(null)

  return (
    <AySearchTable ref={ref} title="表格标题" rowKey="sort_id" searchVisible={false} api={listApi} fields={fields}>
      <AyButton onClick={() => ref.current.setSortsValue([{ key: 'ori-atk', order: 'ascend' }])}>
        设置初始攻击升序
      </AyButton>
      <AyButton onClick={() => ref.current.setFiltersValue({ rarity: ['2'] })}>设置⭐️⭐️⭐️筛选</AyButton>
      <AyButton
        onClick={() => {
          ref.current.clearFilters()
          ref.current.setFiltersValue({ rarity: ['4'] })
        }}
      >
        清空所有过滤，并设置⭐️⭐️⭐️⭐️⭐️筛选
      </AyButton>
      <AyButton onClick={() => alert(JSON.stringify(ref.current.getApiParams()))}>获取请求前参数</AyButton>
    </AySearchTable>
  )
}
```

1. 可用 `defaultFilterValue`、`defaultSortValue` 来分别设置 `筛选`、`排序` 默认值。
2. 可用 `setSortsValue(Array<{ key: string, order: 'ascend' | 'descend' }>)` 设置排序值，<span style="color: #f06">设置后会影响，并覆盖现有的排序值</span>。
3. 如果需要知道现有的排序值，可用 `getApiParams()` 中的 `sorts` 来获得现有的排序值, 此方法不会发起请求，可看此例子的【获取请求前参数】按钮点击后打印的内容。
4. 可用 `setFiltersValue({ key: value })` 来设置筛选值，不会影响其它筛选值。
