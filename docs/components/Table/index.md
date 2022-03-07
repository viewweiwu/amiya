# AySearchTable 查询表格

<!-- ![amiya AySearchTable](https://misc.hzzcckj.cn/upload/image/202011/ac6556223800000.png) -->

表格顶部使用了 `AySearch`，可以点击[这里](./form/ay-search)看详细介绍。

## 基础表格

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { AySearchTable, AySearchTableField, Record } from 'amiya'

const data: Array<Record> = [
  {
    id: '1',
    cn: 'Amiya',
    index: 'R001',
    des: '罗德岛公开领导人阿米娅，将与你并肩作战。'
  },
  {
    id: '2',
    cn: '能天使',
    index: 'PL03',
    des: '企鹅物流职员能天使，将用铳枪为小队扫平前路。'
  }
]

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn'
  },
  {
    title: '编号',
    key: 'index'
  },
  {
    title: '描述',
    key: 'des'
  }
]

export default function Demo() {
  return <AySearchTable title="简易表格" data={data} fields={fields} />
}
```

少写一个 `dataIndex`，其它的跟原本表格差不多。

## JSX / TSX 语法糖 <Badge>0.41.0</Badge>

```tsx
import React from 'react'
import { AySearchTable, Record, AyFields, AyField } from 'amiya'

const data: Array<Record> = [
  {
    id: '1',
    cn: 'Amiya',
    index: 'R001',
    des: '罗德岛公开领导人阿米娅，将与你并肩作战。'
  },
  {
    id: '2',
    cn: '能天使',
    index: 'PL03',
    des: '企鹅物流职员能天使，将用铳枪为小队扫平前路。'
  }
]

export default function Demo() {
  return (
    <AySearchTable title="简易表格" data={data}>
      <AyFields>
        <AyField title="姓名" key="cn" />
        <AyField title="编号" key="index" />
        <AyField title="描述" key="des" />
      </AyFields>
    </AySearchTable>
  )
}
```

```diff
-const fields: Array<AySearchTableField> = [
-  {
-    title: '姓名',
-    key: 'cn'
-  },
-  {
-    title: '编号',
-    key: 'index'
-  },
-  {
-    title: '描述',
-    key: 'des'
-  }
-]

export default function Demo() {
  return (
    <AySearchTable
      title="简易表格"
      data={data}
-     fields={fields}
    >
+     <AyFields>
+       <AyField title="姓名" key="cn" />
+       <AyField title="编号" key="index" />
+       <AyField title="描述" key="des" />
+     </AyFields>
    </AySearchTable>
  )
}
```

只是换了另一种风格写 `fields` 而已，请不要用其它元素包裹住 `AyFields` 和 `AyField`。

## 带接口的表格

```tsx
/**
 * defaultShowCode: true
 */
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'
import { listApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn'
  },
  {
    title: '编号',
    key: 'index'
  },
  {
    title: '描述',
    key: 'des'
  }
]

export default function Demo() {
  return <AySearchTable api={listApi} title="简易表格" fields={fields} rowKey="sort_id" />
}
```

是不是一下子就干净了很多，不需要自己请求接口，也不需要处理翻页，Amiya 会自己处理。

对示例代码里的 listApi 有疑问或者想要自定义？ 🤔️ 可以点[这里](../global/set-default-search-filter)查看请求提交处理，点[这里](../global/set-default-data-filter)查看请求返回处理。

如果你的接口不是返回以上的格式，可以创建一个 `amiya.init.tsx` 文件，提前引入一次就好了，具体请看[这里](../%E5%85%A8%E5%B1%80%E6%96%B9%E6%B3%95/set-default-search-filter)。

## 查询表格

一般表格都会在顶部放一个查询区域，用来筛选表格，让我们把它做出来。

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'
import { listApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: true
  },
  {
    title: '编号',
    key: 'index'
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: [
      { label: '近卫干员', value: '近卫' },
      { label: '狙击干员', value: '狙击' },
      { label: '术师重装', value: '术师' },
      { label: '医疗干员', value: '医疗' },
      { label: '重装干员', value: '重装' },
      { label: '辅助干员', value: '辅助' },
      { label: '特种干员', value: '特种' },
      { label: '先锋干员', value: '先锋' }
    ],
    search: true
  },
  {
    title: '描述',
    key: 'des'
  }
]

export default function Demo() {
  return <AySearchTable api={listApi} title="看上面☝️我多了个查询框" fields={fields} rowKey="sort_id" />
}
```

```diff
// 输入框
{
  title: '姓名',
  key: 'cn',
  // 表述顶部出现查询区域，默认为输入框
+ search: true
}

// 选择框
{
  title: '职业',
  key: 'class',
  // 设定类型为查询框
+ type: 'select',
  // 表格会根据 options 展示 label，选择框会作为选项
+ options: [
+   { label: '近卫干员', value: '近卫' },
+   { label: '狙击干员', value: '狙击' },
+   { label: '术师重装', value: '术师' },
+   { label: '医疗干员', value: '医疗' },
+   { label: '重装干员', value: '重装' },
+   { label: '辅助干员', value: '辅助' },
+   { label: '特种干员', value: '特种' },
+   { label: '先锋干员', value: '先锋' }
+ ],
+ search: true
},
```

## 紧凑型表格

设置 `compact`，将会让表格取消边框与背景色，配合 `extraVisible={false}` 隐藏扩展按钮，会得到一个纯的表格。

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
    title: '编号',
    key: 'index'
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: [
      { label: '近卫干员', value: '近卫' },
      { label: '狙击干员', value: '狙击' },
      { label: '术师重装', value: '术师' },
      { label: '医疗干员', value: '医疗' },
      { label: '重装干员', value: '重装' },
      { label: '辅助干员', value: '辅助' },
      { label: '特种干员', value: '特种' },
      { label: '先锋干员', value: '先锋' }
    ]
  },
  {
    title: '描述',
    key: 'des'
  }
]

export default function Demo() {
  return <AySearchTable compact extraVisible={false} api={listApi} fields={fields} rowKey="sort_id" />
}
```

## 紧凑型查询区域 <Badge>0.52.0</Badge>

设置 `searchExtend={{ inline: true }}`，`searchExtend` 是 [AySearch](./form/ay-search)的[属性](./form/ay-search#props-参数)，会让表格的查询区域变成平铺模式，此时查询区域的 label 将会消失，且作为 placeholder 出现。

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
    title: '编号',
    key: 'index',
    search: true
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    search: {
      style: {
        width: 200
      }
    },
    options: [
      { label: '近卫干员', value: '近卫' },
      { label: '狙击干员', value: '狙击' },
      { label: '术师重装', value: '术师' },
      { label: '医疗干员', value: '医疗' },
      { label: '重装干员', value: '重装' },
      { label: '辅助干员', value: '辅助' },
      { label: '特种干员', value: '特种' },
      { label: '先锋干员', value: '先锋' }
    ]
  },
  {
    title: '描述',
    key: 'des'
  }
]

export default function Demo() {
  return (
    <AySearchTable
      searchExtend={{ inline: true }}
      extraVisible={false}
      api={listApi}
      fields={fields}
      rowKey="sort_id"
    />
  )
}
```

## 右侧查询表格

如果只有一个查询条件，可以考虑把查询条件放在右侧。

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
      position: 'more'
    }
  },
  {
    title: '编号',
    key: 'index'
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: [
      { label: '近卫干员', value: '近卫' },
      { label: '狙击干员', value: '狙击' },
      { label: '术师重装', value: '术师' },
      { label: '医疗干员', value: '医疗' },
      { label: '重装干员', value: '重装' },
      { label: '辅助干员', value: '辅助' },
      { label: '特种干员', value: '特种' },
      { label: '先锋干员', value: '先锋' }
    ]
  },
  {
    title: '描述',
    key: 'des'
  }
]

export default function Demo() {
  return <AySearchTable api={listApi} title="你看，我把查询框放到了右边👉" fields={fields} rowKey="sort_id" />
}
```

```diff
{
  title: '姓名',
  key: 'cn',
  // 这样会带个搜索按钮
  search: {
+   type: 'search',
    // 把这个查询条件放到右侧
+   position: 'more'
  }
},
```

## 筛选与排序

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
    title: '编号',
    key: 'index',
    sort: true
  },
  {
    title: '职业',
    key: 'class',
    options: [
      { label: '近卫干员', value: '近卫' },
      { label: '狙击干员', value: '狙击' },
      { label: '术师重装', value: '术师' },
      { label: '医疗干员', value: '医疗' },
      { label: '重装干员', value: '重装' },
      { label: '辅助干员', value: '辅助' },
      { label: '特种干员', value: '特种' },
      { label: '先锋干员', value: '先锋' }
    ],
    filter: true
  },
  {
    title: '描述',
    key: 'des'
  }
]

export default function Demo() {
  return <AySearchTable api={listApi} rowKey="sort_id" title="表格标题" fields={fields} rowKey="sort_id" />
}
```

```diff
{
  title: '编号',
  key: 'index',
+ sort: true
},
{
  title: '职业',
  key: 'class',
  options: [
    { label: '近卫干员', value: '近卫' },
    { label: '狙击干员', value: '狙击' },
    { label: '术师重装', value: '术师' },
    { label: '医疗干员', value: '医疗' },
    { label: '重装干员', value: '重装' },
    { label: '辅助干员', value: '辅助' },
    { label: '特种干员', value: '特种' },
    { label: '先锋干员', value: '先锋' }
  ],
+ filter: true
},
```

更详细的筛选于排序使用方法看[这里](./table/sort-filter)

## 表头合并

在 `children` 下嵌套 Field 就可以做到表头合并。

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'
import { listApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'names', // 请给予这个地方 key，否则表头的自定义别名会出现意外结果
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
  return <AySearchTable title="表格标题" rowKey="sort_id" searchVisible={false} api={listApi} fields={fields} />
}
```

## 多选表格

`selectionType="checkbox"` 可以让表格开启多选。

不要忘记指定 `rowKey`，作为每一行数据的唯一 key，`selectShowKey` 可以指定悬浮在数字上展示的名称。

开启后选中的选项是会被记录的，不管翻页、查询、筛选、排序，是不会清空已选中的选项的，除非主动调用表格的 clearSelection 方法清空，或者用户主动点击清空按钮。

```tsx
/**
 * title: 关于默认值
 * desc: rowKey 默认值是 id，selectShowKey 默认值是 name。
 */
import React, { useRef } from 'react'
import { AySearchTable, AySearchTableField, AyButton, Record } from 'amiya'
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

  const handleView = () => {
    let selection = tableRef.current.getSelection()
    if (selection.length) {
      alert('你选中了：' + selection.map((record: Record) => record.cn).join('、'))
    }
  }

  return (
    <AySearchTable
      title="多选表格"
      ref={tableRef}
      searchVisible={false}
      rowKey="sort_id"
      selectShowKey="cn"
      selectionType="checkbox"
      api={listApi}
      fields={fields}
    >
      <AyButton type="primary" tableFooterExtraOnly onClick={() => handleView()}>
        打印选项
      </AyButton>
    </AySearchTable>
  )
}
```

```html
<AySearchTable selectionType="checkbox" rowKey="id" selectShowKey="name" />
```

## 单选表格

`selectionType="radio"` 可以让表格开启单选。

除了只能选中一个，其它特性跟[多选表格](#多选表格)一致。

```tsx
import React, { useRef } from 'react'
import { AySearchTable, AySearchTableField, AyButton } from 'amiya'
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

  const handleView = () => {
    let selection = tableRef.current.getSelection()
    if (selection.length) {
      alert('你选中了：' + selection[0].cn)
    }
  }

  return (
    <AySearchTable
      title="单选表格"
      ref={tableRef}
      searchVisible={false}
      rowKey="sort_id"
      selectShowKey="cn"
      selectionType="radio"
      api={listApi}
      fields={fields}
    >
      <AyButton type="primary" tableFooterExtraOnly onClick={() => handleView()}>
        打印选项
      </AyButton>
    </AySearchTable>
  )
}
```

```html
<AySearchTable selectionType="radio" />
```

## 指令按钮

### 新增、详情、编辑

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField, AyTableCtrlField, AyAction, Record, AyCtrl } from 'amiya'
import { listApi, addApi, updateApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: true,
    dialog: {
      required: true
    }
  },
  {
    title: '编号',
    key: 'index',
    sort: true,
    search: true,
    dialog: {
      required: true
    }
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: [
      { label: '近卫干员', value: '近卫' },
      { label: '狙击干员', value: '狙击' },
      { label: '术师重装', value: '术师' },
      { label: '医疗干员', value: '医疗' },
      { label: '重装干员', value: '重装' },
      { label: '辅助干员', value: '辅助' },
      { label: '特种干员', value: '特种' },
      { label: '先锋干员', value: '先锋' }
    ],
    filter: true,
    dialog: true
  },
  {
    title: '描述',
    key: 'des',
    type: 'textarea',
    dialog: true
  }
]

const ctrl: AyTableCtrlField = {
  render: (_, record: Record) => (
    <AyCtrl>
      <AyAction record={record} action="view">
        详情
      </AyAction>
      <AyAction record={record} action="update">
        编辑
      </AyAction>
    </AyCtrl>
  )
}

export default function Demo() {
  return (
    <AySearchTable
      api={listApi}
      title="尝试点击【新增】【详情】【编辑】等按钮"
      ctrl={ctrl}
      fields={fields}
      rowKey="sort_id"
      dialogFormExtend={{
        fields,
        addApi,
        updateApi
      }}
    >
      <AyAction action="add">新增</AyAction>
    </AySearchTable>
  )
}
```

```diff
const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: true,
+   dialog: {
+     required: true
+   }
  },
  {
    title: '编号',
    key: 'index',
    sort: true
    search: true,
+   dialog: {
+     required: true
+   }
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: [
      { label: '近卫干员', value: '近卫' },
      { label: '狙击干员', value: '狙击' },
      { label: '术师重装', value: '术师' },
      { label: '医疗干员', value: '医疗' },
      { label: '重装干员', value: '重装' },
      { label: '辅助干员', value: '辅助' },
      { label: '特种干员', value: '特种' },
      { label: '先锋干员', value: '先锋' }
    ],
    filter: true
+   dialog: true
  },
  {
    title: '描述',
    key: 'des',
+   type: 'textarea',
+   dialog: true
  }
]

+const ctrl: AyTableCtrlField = {
+ render: (_, record: Record) => (
+   <AyCtrl>
+     <AyAction record={record} action="view">详情</AyAction>
+     <AyAction record={record} action="update">编辑</AyAction>
+   </AyCtrl>
+ )
+}

<AySearchTable
  api={listApi}
  title="尝试点击【新增】【详情】【编辑】等按钮"
  fields={fields}
+ ctrl={ctrl}
+ dialogFormExtend={{
+   fields,
+   addApi,
+   updateApi
+ }}
>
+ <AyAction action="add">新增</AyAction>
</AySearchTable>
```

<Alert>此例子 addApi、updateApi 都是模拟接口，实际场景推荐使用 axios</Alert>

```js
/**
 * 模拟新增
 * @param params 保存参数
 */
export const addApi = (params: AnyKeyProps) => {
  return new Promise(resolve => {
    data.unshift({
      id: Date.now(),
      sort_id: Date.now(),
      ...params
    })
    resolve({
      msg: '请求成功',
      data: Date.now()
    })
  })
}

/**
 * 模拟修改
 * @param params 保存参数
 */
export const updateApi = (params: AnyKeyProps) => {
  return new Promise(resolve => {
    let index: number = data.findIndex(row => row.id === params.id)
    if (index >= 0 && data[index]) {
      data[index] = {
        ...data[index],
        ...params
      }
    }
    resolve({
      msg: '请求成功',
      data: data[index]
    })
  })
}
```

大概只增加了 20 行代码就能实现了 新增、详情、编辑，好用吧～

### 删除、批量删除

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField, AyTableCtrlField, AyAction, Record, AyCtrl } from 'amiya'
import { listApi, addApi, updateApi, deleteApi } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '姓名',
    key: 'cn',
    search: true,
    dialog: {
      required: true
    }
  },
  {
    title: '编号',
    key: 'index',
    sort: true,
    search: true,
    dialog: {
      required: true
    }
  },
  {
    title: '职业',
    key: 'class',
    type: 'select',
    options: [
      { label: '近卫干员', value: '近卫' },
      { label: '狙击干员', value: '狙击' },
      { label: '术师重装', value: '术师' },
      { label: '医疗干员', value: '医疗' },
      { label: '重装干员', value: '重装' },
      { label: '辅助干员', value: '辅助' },
      { label: '特种干员', value: '特种' },
      { label: '先锋干员', value: '先锋' }
    ],
    filter: true,
    dialog: true
  },
  {
    title: '描述',
    key: 'des',
    type: 'textarea',
    dialog: true
  }
]

const ctrl: AyTableCtrlField = {
  render: (_, record: Record) => (
    <AyCtrl>
      <AyAction record={record} action="view">
        详情
      </AyAction>
      <AyAction record={record} action="update">
        编辑
      </AyAction>
      <AyAction record={record} action="delete">
        删除
      </AyAction>
    </AyCtrl>
  )
}

export default function Demo() {
  return (
    <AySearchTable
      api={listApi}
      title="尝试勾选几条数据，点个批量删除，还有列表上也有个删除"
      ctrl={ctrl}
      fields={fields}
      selectionType="checkbox"
      rowKey="sort_id"
      selectShowKey="cn"
      deleteApi={deleteApi}
      dialogFormExtend={{
        fields,
        addApi,
        updateApi
      }}
    >
      <AyAction action="add">新增</AyAction>
      <AyAction action="batch-delete">批量删除</AyAction>
    </AySearchTable>
  )
}
```

```diff

const ctrl: AyTableCtrlField = {
  render: (_, record: Record) => (
    <AyCtrl>
      <AyAction record={record} action="view">详情</AyAction>
      <AyAction record={record} action="update">编辑</AyAction>
+     <AyAction record={record} action="delete">删除</AyAction>
    </AyCtrl>
  )
}

<AySearchTable
  api={listApi}
  title="尝试勾选几条数据，点个批量删除，还有列表上也有个删除"
  ctrl={ctrl}
  fields={fields}
+ selectionType="checkbox"
+ rowKey="sort_id"
+ selectShowKey="cn"
+ deleteApi={deleteApi}
  dialogFormExtend={{
    fields,
    addApi,
    updateApi
  }}
>
  <AyAction action="add">新增</AyAction>
+ <AyAction action="batch-delete">批量删除</AyAction>
</AySearchTable>
```

同样也很简单，只需要 5 行代码，实现删除 & 批量删除。

<Alert>此例子 deleteApi 都是模拟接口，deleteApi 是支持批量删除的，实际场景推荐使用 axios</Alert>

```js
/**
 * 模拟删除
 * @param params 删除的 id
 */
export const deleteApi = (params: AnyKeyProps) => {
  return new Promise(resolve => {
    data = data.filter(row => {
      return !params.includes(row.sort_id)
    })
    resolve({
      msg: '删除成功',
      data: null
    })
  })
}
```

更详细的指令按钮介绍，请看[这里](../button/ay-action)

## 增删改查

<code src="./AySearchTableDemo.tsx" />

对示例代码里的 listApi 有疑问或者想要自定义？ 🤔️ 可以点[这里](./global/set-default-search-filter)查看请求提交处理，点[这里](./global/set-default-data-filter)查看请求返回处理。

## 参数

| 参数名             | 说明                                                                                                                                         | 参数类型                                        | 默认值 | 版本   |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------ | ------ |
| title              | 表格标题，显示在表格左上角的标题文字。                                                                                                       | string \| ReactNode                             | ''     | -      |
| fields             | 配置项，可决定表格、查询项、弹窗表单的配置。                                                                                                 | Array<[AySearchTableField][aysearchtablefield]> | []     | -      |
| selectionType      | 是否开启勾选，checkbox：多选、radio：单选，单选表格的使用可以请看[这里][单选表格]，开启后需要指定 rowKey。                                   | 'checkbox' \| 'radio'                           | -      | -      |
| children           | 子元素会被放在表格右上角。                                                                                                                   | ReactNode                                       | -      | -      |
| api                | 列表分页接口，会传递分页和参数参数，发现跟接口风格不一致，点[这里][自定义请求]查看自定义方式。                                               | Promise                                         | -      | -      |
| deleteApi          | 批量删除接口。                                                                                                                               | Promise                                         | -      | -      |
| data               | 表格静态数据，不希望表格做请求，自己定义数据。                                                                                               | Array<Record\>                                  | -      | -      |
| ctrl               | 列表每一行后面数据跟着的按钮渲染。                                                                                                           | AySearchTableField                              | -      | -      |
| rowKey             | 列表每一行的唯一标志。                                                                                                                       | string \| (record: Record) => string            | 'id'   | -      |
| selectShowKey      | 批量删除，勾选时，在表格顶部会有数字，点击数字可以看到选项的名称。                                                                           | string                                          | 'name' | -      |
| dialogFormExtend   | [AyDialogForm][aydialogform] 的扩展配置。                                                                                                    | AyDialogFormProps                               | {}     | -      |
| scrollX            | 滚动的 X 轴数值。                                                                                                                            | number                                          | -      | -      |
| height             | 表格滚动高度。                                                                                                                               | number                                          | -      | -      |
| filterData         | 列表数据过滤。                                                                                                                               | (data: Object) => Array<Record\>                | -      | -      |
| beforeSearch       | 提交前过滤，希望请求前改变参数可使用此方法。                                                                                                 | (data: Object) => Object                        | -      | -      |
| pagination         | 分页参数。                                                                                                                                   | antd 分页一致                                   | -      | -      |
| center             | 把元素插入到查询和表格之间。                                                                                                                 | ReactNode                                       | -      | -      |
| listHeader         | AySearchList 在列表头部插入元素。                                                                                                            | ReactNode                                       | -      | -      |
| tableHeader        | AySearchTable 在列表头部插入元素。                                                                                                           | ReactNode                                       | -      | -      |
| searchVisible      | 查询区域是否展示。                                                                                                                           | boolean                                         | true   | -      |
| tableExtend        | table 的扩展配置。                                                                                                                           | Object                                          | {}     | -      |
| extendSearchParams | 请求时额外携带的参数。                                                                                                                       | Object                                          | {}     | -      |
| after              | 在表格底部插入元素。                                                                                                                         | ReactNode                                       | -      | -      |
| autoload           | 表格渲染时是否自动发起请求。                                                                                                                 | booelan                                         | true   | -      |
| rowSelection       | 表格选项设置，可以用来设置表格是否[禁用][禁用表格选项]，请不要设置 type、selectedRowKeys、onSelect、onSelectAll 方法，这会影响到原本的设置。 | -                                               | -      | -      |
| compact            | 紧凑型表格样式，会取消表格包裹的边框与样式。                                                                                                 | boolean                                         | false  | 0.52.0 |
| onExpand           | 展开事件。                                                                                                                                   | (expanded: boolean, record: Record) => void     | -      | -      |
| onLoad             | 表格查询完成监听。                                                                                                                           | (records: Array<Record\>, data: any) => void    | -      | -      |
| onParamsChange     | 查询参数变化事件，包括分页。                                                                                                                 | (searchPamras: Object) => void                  | -      | -      |
| onSelectionChange  | 选项改变事件。                                                                                                                               | (selection: Array<Record\>): void               | -      | -      |

extra 右侧扩展按钮配置参考[这里][1]。

## AySearchTableField

最为常见的 Field，是每个列表页面都会用到的参数。

| 参数名         | 说明                                                                                        | 参数类型                                                              | 默认值 | 版本   |
| -------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------ | ------ |
| title          | 标题。                                                                                      | string                                                                | -      | -      |
| key            | 唯一 key，dataIndex 默认会跟这个值一样。                                                    | string                                                                | -      | -      |
| options        | 可选项，展示会根据这个值变化。                                                              | Array<[Option][option]>                                               | -      | -      |
| hidden         | 是否隐藏这一列。                                                                            | boolean \| () => boolean                                              | -      | 0.45.0 |
| render         | 自定义展示列。                                                                              | (text: ReactNode, record: AnyKeyProps, index: number) => ReactNode    | -      | 0.45.0 |
| renderType     | 美化展示列，扩展方法看[这里][rendertype]。                                                  | string                                                                | -      | 0.45.0 |
| filter         | 设置 true 会以 options 作为筛选项出现在表头。                                               | boolean                                                               | -      | 0.45.0 |
| filterMultiple | 筛选是否支持多选，需要先设置 `filter: true`。                                               | boolean                                                               | false  | 0.45.0 |
| sort           | 排序。                                                                                      | boolean                                                               | -      | 0.45.0 |
| sortOrder      | 排序权重，越大越重，不设置则表示不需要多列筛选，需要先设置 `sort: true`。                   | number                                                                | -      | 0.45.0 |
| editable       | 表格是否可以编辑，具体示例看[这里][可编辑表格]。                                            | boolean                                                               | -      | 0.45.0 |
| before         | (仅 `editable` 可用), 渲染前置元素，[使用案例][可编辑表格]                                  | ({ record: Record, field: Field, refreshRow: Function }) => ReactNode | -      | 0.45.0 |
| after          | (仅 `editable` 可用), 渲染后置元素，[使用案例][可编辑表格]                                  | ({ record: Record, field: Field, refreshRow: Function }) => ReactNode | -      | 0.45.0 |
| children       | 嵌套表格时使用。                                                                            | Array<[AyTableField][aytablefield]>                                   | -      | 0.45.0 |
| search         | AySearch 需要的扩展参数，里面的属性比外面的属性优先级更高，为 true 则在查询区域展示输入框。 | [AyFormField][ayformfield] \| boolean                                 | -      | -      |
| dialog         | AyDialogForm 需要的扩展参数，里面的属性比外面的属性优先级更高，为 true 则在弹窗展示输入框。 | [AyFormField][ayformfield] \| boolean                                 | -      | -      |
| table          | AyTable 需要的扩展参数，里面的属性比外面的属性优先级更高，为 false 则不在表格展示。         | [AyTableField][aytablefield] \| boolean                               | -      | -      |

```typescript
// 示例
const fields: Array<AySearchTableField> = [
  {
    title: '', // 表格、查询、编辑 的标题
    key: '', // 表格、查询、编辑 的 key
    type: '', // 查询、编辑 的 FormType
    options: [], // 表格、查询、编辑 的  选项
    // 表示查询区域内出现该元素，默认是输入框
    search: true,
    // 表示弹窗内出现该元素，默认是输入框
    dialog: true
  }
]
```

## AyTableField

| 参数名         | 说明                                                                      | 参数类型                                                              | 默认值   |
| -------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------- | -------- |
| title          | 标题。                                                                    | string                                                                | -        |
| key            | 唯一 key，dataIndex 默认会跟这个值一样。                                  | string                                                                | -        |
| options        | 可选项，展示会根据这个值变化。                                            | Array<[Option][option]>                                               | -        |
| hidden         | 是否隐藏这一列。                                                          | boolean \| () => boolean                                              | -        |
| render         | 自定义展示列。                                                            | (text: ReactNode, record: AnyKeyProps, index: number) => ReactNode    | -        |
| renderType     | 美化展示列，扩展方法看[这里][rendertype]。                                | string                                                                | 'string' | - |
| filter         | 设置 true 会以 options 作为筛选项出现在表头。                             | boolean                                                               | -        |
| filterMultiple | 筛选是否支持多选，需要先设置 `filter: true`。                             | boolean                                                               | false    |
| sort           | 排序。                                                                    | boolean                                                               | -        |
| sortOrder      | 排序权重，越大越重，不设置则表示不需要多列筛选，需要先设置 `sort: true`。 | number                                                                | -        |
| editable       | 表格是否可以编辑，具体示例看[这里][可编辑表格]。                          | boolean                                                               | -        |
| before         | (仅 `editable` 可用), 渲染前置元素，[使用案例][可编辑表格]                | ({ record: Record, field: Field, refreshRow: Function }) => ReactNode | -        |
| after          | (仅 `editable` 可用), 渲染后置元素，[使用案例][可编辑表格]                | ({ record: Record, field: Field, refreshRow: Function }) => ReactNode | -        |
| children       | 嵌套表格时使用。                                                          | Array<[AyTableField][aytablefield]>                                   | -        |

## Option 参数

| 参数名   | 说明     | 参数类型                | 默认值 |
| -------- | -------- | ----------------------- | ------ |
| label    | 显示选项 | string \| number        | -      |
| value    | 值       | any                     | -      |
| disabled | 是否禁用 | boolean                 | -      |
| children | 子元素   | Array<[Option][option]> | -      |

## Method 方法

| 方法名                                                                      | 说明                                                                                                                                 | 返回值                                 |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| refresh()                                                                   | 重新发起请求。                                                                                                                       | -                                      |
| reset()                                                                     | 回到第一页，重新发起请求。                                                                                                           | -                                      |
| doLayout()                                                                  | 重新布局表格。                                                                                                                       | -                                      |
| clearFilters(keys: Array<String\>)                                          | 可以不传参数，不传则清空全部；传了则清空相同 key 的过滤值，即设置 filter 之后的值。                                                  | -                                      |
| clearSorts(keys: Array<String\>)                                            | 可以不传参数，不传则清空全部；传了则清空相同 key 的排序值，即设置 sort 之后的值。                                                    | -                                      |
| getSelection()                                                              | 获取所有勾选的行。                                                                                                                   | Array<Record\>                         |
| setSelection(selection: Array<Record\>)                                     | 设置选中行。                                                                                                                         | -                                      |
| addSelection(selection: Array<Record\>)                                     | 添加选中行。                                                                                                                         | -                                      |
| clearSelection()                                                            | 清空所有选中行。                                                                                                                     | -                                      |
| getTableData()                                                              | 获取表格当前数据。                                                                                                                   | Array<Record\>                         |
| getApiParams()                                                              | 获取表格请求前数据，不会发起请求，会经过 defaultSearchFilter、beforeSearch 方法过滤，即接口将要请求时的数据。                        | { pagination, filters, sorts, search } |
| setSortsValue(<br>Array<{ key: string, order: 'ascend' \| 'descend' }><br>) | 设置排序值，<span style="color: #f06">设置后会影响，并覆盖现有的排序值</span>，可用 `getApiParams()` 中的 `sorts` 来获得现有排序值。 | -                                      |
| setFiltersValue({ key: value })                                             | 设置筛选值。                                                                                                                         | -                                      |

[1]: ./global/set-search-table-default-value
[option]: ./table#option-参数
[formtype]: ./form#formtype
[aysearchtablefield]: ./table#aysearchtablefield
[rendertype]: ./table/custom-render#已全局注册
[ayformfield]: ./form#ayformfield-参数
[aytablefield]: ./table#aytablefield
[aydialogform]: ./form/ay-dialog-form
[禁用表格选项]: ./table/disabled-row
[单选表格]: ./table/radio-table
[可编辑表格]: ./table/edit-table
[自定义请求]: ./global/set-default-search-filter
