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
    key: 'profession',
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
    key: 'profession',
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
      profession: '3'
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
      profession: '3'
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
    key: 'profession',
    options: [
      { label: '狙击干员狙击干员狙击干员狙击干员狙击干员狙击干员狙击干员狙击干员', value: '4' },
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
      profession: '3'
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
      profession: '3'
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

| 参数名       | 说明                                                 | 参数类型                                        | 默认值      |
| ------------ | ---------------------------------------------------- | ----------------------------------------------- | ----------- |
| title        | 默认标题，可以不用设置，不同模式下，自动展示不同文案 | string                                          | -           |
| drawer       | 是否 Drawer 模式展示                                 | boolean                                         | false       |
| span         | AyForm 的 span                                       | 1 ～ 24                                         | 24          |
| width        | 弹窗宽度                                             | number                                          | -           |
| fields       | 表单项                                               | Array<[AyDialogFormField][aydialogformfield]>   | []          |
| addApi       | 新增 api，需要是 Promise 形式的接口                  | Promise                                         | null        |
| updateApi    | 修改 api，需要是 Promise 形式的接口                  | Promise                                         | null        |
| name         | 表单唯一名字                                         | stirng                                          | 'ay-form'   |
| beforeSubmit | 提交前过滤，返回 false 则不提交。                    | (params?: AnyKeyProps, mode?: string)=> boolean | AnyKeyProps | null |
| dialogExtend | 弹窗的其它参数。                                     | Object                                          | null        |
| formExtend   | 表单的其它参数。                                     | Object                                          | null        |
| dialogOnly   | 表单项是否默认不展示，只有写 dialog 才展示。         | boolean                                         | false       |

[aydialogformfield]: /filed参数详解#aydialogformfield
