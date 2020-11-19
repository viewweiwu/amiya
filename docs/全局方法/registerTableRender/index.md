# registerTableRender

注册表格渲染。

实际情况下，可以考虑把 registerTableRender 放到全局入口。

代码请看 `amiya-init.tsx`

```tsx
import React from 'react'
import { AySearchTable, AyButton, AySearchTableField } from 'amiya'
import { listApi, professionOptions } from '../../api'
import './amiya-init'
import 'antd/dist/antd.min.css'

const fields: Array<AySearchTableField> = [
  {
    title: '编号',
    key: 'displayNumber',
    table: {
      renderType: 'number'
    }
  },
  {
    title: '姓名',
    key: 'cname',
    table: {
      renderType: 'name'
    }
  },
  {
    title: '英文名',
    key: 'name',
    search: {},
    table: {
      hidden: true
    }
  },
  {
    title: '职业',
    key: 'profession',
    type: 'select',
    search: {},
    table: {
      renderType: 'profession'
    },
    options: professionOptions
  },
  {
    title: '标签',
    key: 'tagList',
    table: {
      renderType: 'tag'
    }
  },
  {
    title: '星级',
    key: 'rarity',
    table: {
      renderType: 'star'
    }
  },
  {
    title: '潜能提升',
    key: 'potentialRanks',
    table: {
      renderType: 'potentialRanks'
    }
  }
]

export default function Demo() {
  return <AySearchTable title="全局 table render 方法注册" api={listApi} fields={fields} />
}
```

<hr/>

```js
import { registerTableRender } from 'amiya'

/**
 * @decs 注册 renderType
 * @param renderTypeName string 注册类型名字
 * @param text string 当前 col 的数据
 * @param record object 当前 row 的数据
 * @param field 当前配置配置项
 *
 * @returns ReactNode
 */
registerTableRender('renderTypeName', ({ text, record, field }: object) => {
  return <span>{text}</span>
})

// 实际使用
const fields = [
  {
    table: {
      renderType: 'renderTypeName' // 已经注册过后的名字
    }
  }
]
```
