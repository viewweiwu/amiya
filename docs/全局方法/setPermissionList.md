# 按钮权限控制

## setPermissionList

此参数用于控制 AyButton 或者 AyAction 的权限展示。

```tsx
import React, { useState } from 'react'
import { AyButton, AyCtrl, AyAction, setPermissionList } from 'amiya'
import { Space } from 'antd'
import 'antd/dist/antd.min.css'

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
