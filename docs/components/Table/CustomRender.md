# 自定义渲染列

可以指定 `renderType` 渲染出不同模板的标签。

### 'html'

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'

const fields: Array<AySearchTableField> = [
  {
    title: '特性',
    key: 'feature',
    renderType: 'html'
  }
]

const data = [
  {
    id: 1,
    feature: `攻击造成<span style=\"color:#00B0FF;\">法术伤害</span>`
  },
  {
    id: 2,
    feature: `攻击造成<span style=\"color:#00B0FF;\">法术伤害</span><br/>可以使用<span style=\"color:#00B0FF;\">召唤物</span>协助作战`
  }
]

export default function Demo() {
  return <AySearchTable title="渲染 html" data={data} pagination={false} fields={fields} />
}
```

```diff
const fields: Array<AySearchTableField> = [
  {
    title: '特性',
    key: 'feature',
+   renderType: 'html'
  }
]
```

### 'datetime'

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'

const fields: Array<AySearchTableField> = [
  {
    title: '时间',
    key: 'date',
    renderType: 'datetime'
  }
]

const data = [
  {
    id: 1,
    date: Date.now()
  },
  {
    id: 2,
    date: '2021-10-15'
  }
]

export default function Demo() {
  return <AySearchTable title="渲染时间" data={data} pagination={false} fields={fields} />
}
```

```diff
const fields: Array<AySearchTableField> = [
  {
    title: '时间',
    key: 'date',
+   renderType: 'datetime'
+   // format: 'YYYY-MM-DD' // 可以自定义 format，可参考 moment format
  }
]
```

### 'image'

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'

const fields: Array<AySearchTableField> = [
  {
    title: '头像',
    key: 'icon',
    renderType: 'image'
  }
]

const data = [
  {
    id: 1,
    icon: '//prts.wiki/images/5/5b/%E5%A4%B4%E5%83%8F_%E9%98%BF%E7%B1%B3%E5%A8%85%28%E8%BF%91%E5%8D%AB%29.png'
  },
  {
    id: 2,
    icon: '//prts.wiki/images/3/36/%E5%A4%B4%E5%83%8F_%E9%98%BF%E7%B1%B3%E5%A8%85.png'
  }
]

export default function Demo() {
  return <AySearchTable title="渲染图片" data={data} pagination={false} fields={fields} />
}
```

```diff
const fields: Array<AySearchTableField> = [
  {
    title: '头像',
    key: 'icon',
+   renderType: 'image'
+   // 其它属性设置参考 [antd Image Api]: https://ant-design.gitee.io/components/image-cn/#API
+   // props: {
+   //   width: 200,
+   //   height: 200
+   // }
  }
]
```

### 'tags'

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'

const fields: Array<AySearchTableField> = [
  {
    title: '标签',
    key: 'tags',
    renderType: 'tags',
    colorMap: {
      红色: 'red',
      绿色: 'green',
      蓝色: 'blue',
      黄色: 'yellow'
    }
  }
]

const data = [
  {
    id: 1,
    tags: ['红色', '绿色', '未定义颜色']
  },
  {
    id: 2,
    tags: ['蓝色', '黄色']
  }
]

export default function Demo() {
  return <AySearchTable title="渲染标签" data={data} pagination={false} fields={fields} />
}
```

```diff
// tags 需要是数组
const data = [
  {
    tags: ['红色', '绿色', '未定义颜色']
  },
  {
    tags: ['蓝色', '黄色']
  }
]

const fields: Array<AySearchTableField> = [
  {
    title: '标签',
    key: 'tags',
+   renderType: 'tags',
+   colorMap: {
+     红色: 'red',
+     绿色: 'green',
+     蓝色: 'blue',
+     黄色: 'yellow'
+   }
  }
]
```

### 'unit' <Badge>0.43.0</Badge>

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'

const fields: Array<AySearchTableField> = [
  {
    title: '名称',
    key: 'name'
  },
  {
    title: '单价',
    key: 'price',
    renderType: 'unit',
    suffix: 'RMB'
  },
  {
    title: '库存',
    key: 'count',
    renderType: 'unit',
    prefix: 'x'
  }
]

const data = [
  {
    name: '苹果',
    price: 10,
    count: 10
  },
  {
    name: '橘子',
    price: 5,
    count: 2
  }
]

export default function Demo() {
  return <AySearchTable title="前后单位" data={data} rowKey="name" pagination={false} fields={fields} />
}
```

```diff
const fields: Array<AySearchTableField> = [
  {
    title: '名称',
    key: 'name'
  },
  {
    title: '单价',
    key: 'price',
+   renderType: 'unit',
+   suffix: 'RMB'
  },
  {
    title: '库存',
    key: 'count',
+   renderType: 'unit',
+   prefix: 'x'
  }
]
```

### 'status' <Badge>0.43.0</Badge>

```tsx
import React from 'react'
import { AySearchTable, AySearchTableField } from 'amiya'

const fields: Array<AySearchTableField> = [
  {
    title: '订单编号',
    key: 'id'
  },
  {
    title: '订单状态',
    key: 'status',
    options: [
      { value: 1, label: '待支付', color: 'gold' },
      { value: 2, label: '已支付', color: 'green' }
    ],
    renderType: 'status'
  },
  {
    title: '售后状态',
    key: 'refundStatus',
    options: [
      { value: 1, label: '售后中', status: 'processing' },
      { value: 2, label: '已结束', status: 'default' }
    ],
    renderType: 'status'
  },
  {
    title: '订单状态2',
    key: 'status',
    options: [
      { value: 1, label: '待支付', color: 'gold' },
      { value: 2, label: '已支付', color: 'green' }
    ],
    renderType: 'status',
    type: 'tag'
  }
]

const data = [
  {
    id: 'DD2015366521X',
    status: 1,
    refundStatus: 1,
    tag: 1
  },
  {
    id: 'DD2015366521C',
    status: 2,
    refundStatus: 2,
    tag: 2
  }
]

export default function Demo() {
  return <AySearchTable title="前后单位" data={data} pagination={false} fields={fields} />
}
```

```diff
const fields: Array<AySearchTableField> = [
  {
    title: '订单编号',
    key: 'id'
  },
  {
    title: '订单状态',
    key: 'status',
+   options: [
+     { value: 1, label: '待支付', color: 'gold' },
+     { value: 2, label: '已支付', color: 'green' }
+   ],
+   renderType: 'status'
  },
  {
    title: '售后状态',
    key: 'refundStatus',
+   options: [
+     { value: 1, label: '售后中', status: 'processing' },
+     { value: 2, label: '已结束', status: 'default' }
+   ],
+   renderType: 'status'
  },
  {
    title: '订单状态2',
    key: 'status',
+   options: [
+     { value: 1, label: '待支付', color: 'gold' },
+     { value: 2, label: '已支付', color: 'green' }
+   ],
+   renderType: 'status',
+   // 可以以 Tag 的形式展示
+   type: 'tag'
  }
]

const data = [
  {
    id: 'DD2015366521X',
    status: 1,
    refundStatus: 1,
    tag: 1
  },
  {
    id: 'DD2015366521C',
    status: 2,
    refundStatus: 2,
    tag: 2
  }
]
```

上面的 `renderType` 类型还不满足？那你需要自己注册 [registerTableRender](../global/register-table-render)。
