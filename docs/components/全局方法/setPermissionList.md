# 按钮权限控制

这个页面的代码是写在 `/src/amiya/config.tsx` 文件里的，如果你还没有，请点击 [这里](../) 查看如何创建。

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
