# AyButton

## 基础示例

在 antd Button 基础上，支持 confirm 属性。

```tsx
import React, { useState } from 'react'
import { AyButton } from 'amiya'
import 'antd/dist/antd.min.css'

export default function Demo() {
  return (
    <AyButton confirm confirmMsg="确定删除吗？" danger onConfirm={() => alert('确定')}>
      删除
    </AyButton>
  )
}
```

## 权限

```tsx
import React, { useState } from 'react'
import { AyButton, setPermissionList } from 'amiya'
import 'antd/dist/antd.min.css'

// 注释掉此行，将不会展示相关按钮
setPermissionList(['delete'])

export default function Demo() {
  return <AyButton permission="delete">删除</AyButton>
}
```

## 参数

| 参数名     | 说明                                           | 参数类型 | 默认值 |
| ---------- | ---------------------------------------------- | -------- | ------ |
| confirm    | 是否需要确认                                   | boolean  | false  |
| confirmMsg | 确认框提示文字，需要先设置 confirm 属性为 true | string   | -      |
| onConfirm  | 确认完成事件，需要先设置 confirm 属性为 true   | Function | -      |
| onClick    | 点击事件                                       | Function | -      |
| permission | 权限                                           | strng    | -      |

其它属性保持跟 antd Button 属性一致。
