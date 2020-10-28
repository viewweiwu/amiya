# AyDialogForm

## 基础示例

```tsx
import React, { useState, MutableRefObject, useRef } from 'react'
import { AyDialog, AyButton, AydialogFormRef, AyDialogForm, success } from 'amiya'
import { Space, Switch } from 'antd'
import 'antd/dist/antd.min.css'

const fields: Array<AyDialogFormField> = [
  {
    title: '中文名',
    key: 'cname',
    required: true
  },
  {
    title: '职业',
    type: 'select',
    key: 'job',
    options: [
      { label: '狙击干员', value: '1' },
      { label: '医疗干员', value: '2' },
      { label: '术师干员', value: '3' }
    ]
  }
]

// 模拟新增请求
const emptyApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

export default function Demo() {
  const dialogFormRef: MutableRefObject<AydialogFormRef> = useRef() as MutableRefObject<AydialogFormRef>

  const handleAdd = () => {
    dialogFormRef.current.add().then(() => {
      success('新增成功')
    })
  }

  return (
    <div>
      <AyButton onClick={() => handleAdd()}>新增</AyButton>
      <AyDialogForm ref={dialogFormRef} fields={fields} addApi={emptyApi} />
    </div>
  )
}
```

## 默认三种模式

默认带有 `新增`、`修改`、`查看` 三种模式。

```tsx
import React, { useState, MutableRefObject, useRef } from 'react'
import { AyDialog, AyButton, AydialogFormRef, AyDialogForm, success } from 'amiya'
import { Space, Switch } from 'antd'
import 'antd/dist/antd.min.css'

const fields: Array<AyDialogFormField> = [
  {
    title: '中文名',
    key: 'cname',
    required: true
  },
  {
    title: '职业',
    type: 'select',
    key: 'job',
    options: [
      { label: '狙击干员', value: '1' },
      { label: '医疗干员', value: '2' },
      { label: '术师干员', value: '3' }
    ]
  }
]

// 模拟新增 & 保存请求
const emptyApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

export default function Demo() {
  const [drawer, setDrawer] = useState<boolean>(false)
  const dialogFormRef: MutableRefObject<AydialogFormRef> = useRef() as MutableRefObject<AydialogFormRef>

  const handleUpdate = () => {
    let values = {
      cname: '阿米娅',
      job: '3'
    }
    dialogFormRef.current.update(values).then(() => {
      success('修改成功')
    })
  }

  const handleAdd = () => {
    dialogFormRef.current.add().then(() => {
      success('新增成功')
    })
  }

  const handleView = () => {
    let values = {
      cname: '阿米娅',
      job: '3'
    }
    dialogFormRef.current.view(values)
  }

  return (
    <div>
      <p>
        <label style={{ marginRight: 4 }}>展示侧边</label>
        <Switch defaultChecked={drawer} onChange={(value) => setDrawer(value)} />
      </p>
      <Space>
        <AyButton onClick={() => handleAdd()}>新增</AyButton>
        <AyButton onClick={() => handleUpdate()}>编辑</AyButton>
        <AyButton onClick={() => handleView()}>查看</AyButton>
      </Space>
      <AyDialogForm drawer={drawer} ref={dialogFormRef} fields={fields} addApi={emptyApi} updateApi={emptyApi} />
    </div>
  )
}
```

## 不同模式下展示控制

下面这个例子只有在 `新增` 按钮下才会有 `英文名` 输入。

```tsx
import React, { useState, MutableRefObject, useRef } from 'react'
import { AyDialog, AyButton, AydialogFormRef, AyDialogForm, success } from 'amiya'
import { Space, Switch } from 'antd'
import 'antd/dist/antd.min.css'

const fields: Array<AyDialogFormField> = [
  {
    title: '英文名',
    key: 'name',
    dialog: {
      required: true,
      reSetting: (field: any, mode: string) => {
        if (mode !== 'add') {
          field.hidden = true
        }
        return field
      }
    }
  },
  {
    title: '中文名',
    key: 'cname',
    dialog: {
      required: true
    }
  },
  {
    title: '职业',
    type: 'select',
    key: 'job',
    options: [
      { label: '狙击干员', value: '1' },
      { label: '医疗干员', value: '2' },
      { label: '术师干员', value: '3' }
    ],
    dialog: {}
  }
]

// 模拟新增 & 保存请求
const emptyApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

export default function Demo() {
  const [drawer, setDrawer] = useState<boolean>(false)
  const dialogFormRef: MutableRefObject<AydialogFormRef> = useRef() as MutableRefObject<AydialogFormRef>

  const handleUpdate = () => {
    let values = {
      cname: '阿米娅',
      job: '3'
    }
    dialogFormRef.current.update(values).then(() => {
      success('修改成功')
    })
  }

  const handleAdd = () => {
    dialogFormRef.current.add().then(() => {
      success('新增成功')
    })
  }

  const handleView = () => {
    let values = {
      cname: '阿米娅',
      job: '3'
    }
    dialogFormRef.current.view(values)
  }

  return (
    <div>
      <p>
        <label style={{ marginRight: 4 }}>展示侧边</label>
        <Switch defaultChecked={drawer} onChange={(value) => setDrawer(value)} />
      </p>
      <Space>
        <AyButton onClick={() => handleAdd()}>新增</AyButton>
        <AyButton onClick={() => handleUpdate()}>编辑</AyButton>
        <AyButton onClick={() => handleView()}>查看</AyButton>
      </Space>
      <AyDialogForm drawer={drawer} ref={dialogFormRef} fields={fields} addApi={emptyApi} updateApi={emptyApi} />
    </div>
  )
}
```
