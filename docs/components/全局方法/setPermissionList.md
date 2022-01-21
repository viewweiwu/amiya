# 按钮权限控制

此参数用于控制 AyButton 或者 AyAction 的展示权限。

```tsx
import React from 'react'
import { AyButton, AyCtrl, AyAction, setPermissionList } from 'amiya'
import { Space } from 'antd'

export default function Demo() {
  const addPermission = () => {
    setPermissionList(['delete'])
  }

  const clearPermission = () => {
    setPermissionList([])
  }

  return (
    <>
      <Space>
        <AyButton onClick={addPermission}>设置权限</AyButton>
        <AyButton onClick={clearPermission}>清空权限</AyButton>
      </Space>
      <div style={{ marginTop: 12 }}>
        <AyButton permission="delete">删除</AyButton>
        <AyCtrl>
          <AyAction permission="delete">删除</AyAction>
        </AyCtrl>
      </div>
    </>
  )
}
```

```js
import { setPermissionList } from 'amiya'

const addPermission = () => {
  setPermissionList(['delete'])
}

const clearPermission = () => {
  setPermissionList([])
}
```

<embed src="./index.md"></embed>
