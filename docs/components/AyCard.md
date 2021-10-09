# AyCard

可折叠的 antd [Card](https://ant-design.gitee.io/components/card-cn/#Card)。

## 基础示例

```tsx
import React from 'react'
import { AyCard } from 'amiya'

export default function Demo() {
  return <AyCard title="卡片标题">卡片内容</AyCard>
}
```

## 可折叠

```tsx
import React from 'react'
import { AyCard } from 'amiya'

export default function Demo() {
  return (
    <AyCard title="卡片标题" collapsible onCollapse={value => console.log(value)}>
      卡片内容
    </AyCard>
  )
}
```

## 不同折叠位置

```tsx
import React from 'react'
import { AyCard } from 'amiya'

export default function Demo() {
  return (
    <AyCard title="卡片标题" collapsible collapsePosition="title">
      卡片内容
    </AyCard>
  )
}
```

## 默认折叠

```tsx
import React from 'react'
import { AyCard } from 'amiya'

export default function Demo() {
  return (
    <AyCard title="卡片标题" collapsible defaultCollapsed>
      卡片内容
    </AyCard>
  )
}
```

## 受控的折叠

```tsx
import React, { useState } from 'react'
import { Switch } from 'antd'
import { AyCard } from 'amiya'

export default function Demo() {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <>
      <p>
        <span style={{ marginRight: 4 }}>控制折叠</span>
        <Switch checked={collapsed} onChange={setCollapsed}></Switch>
      </p>
      <AyCard title="卡片标题" collapsed={collapsed}>
        卡片内容
      </AyCard>
    </>
  )
}
```

## 参数

| 参数名           | 说明         | 参数类型                     | 默认值  |
| ---------------- | ------------ | ---------------------------- | ------- |
| collapsible      | 是否可折叠   | boolean                      | false   |
| collapsePosition | 折叠位置     | 'title' \| 'extra'           | 'extra' |
| defaultCollapsed | 默认折叠     | boolean                      | false   |
| collapsed        | 受控折叠     | boolean                      | false   |
| onCollapse       | 折叠改变事件 | (collapsed: boolean) => void | -       |
