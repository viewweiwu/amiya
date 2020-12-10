# AyDialogForm

![amiya AyDialogForm](https://misc.hzzcckj.cn/upload/image/202011/ac64ff591400000.png)

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
    title: '测试',
    dialog: {
      type: 'custom',
      renderContent: () => {
        return <span>hello</span>
      }
    }
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
  return new Promise(resolve => {
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
  return new Promise(resolve => {
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
        <Switch defaultChecked={drawer} onChange={value => setDrawer(value)} />
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
  return new Promise(resolve => {
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
        <Switch defaultChecked={drawer} onChange={value => setDrawer(value)} />
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

<hr/>

| 参数名       | 说明                                                                                                    | 参数类型                                        | 默认值      |
| ------------ | ------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------- |
| title        | 默认标题，可以不用设置，不同模式下，自动展示不同文案                                                    | string                                          | -           |
| drawer       | 是否 Drawer 模式展示                                                                                    | boolean                                         | false       |
| span         | AyForm 的 span                                                                                          | 1 ～ 24                                         | 24          |
| width        | 弹窗宽度                                                                                                | number                                          | -           |
| fields       | 表单项                                                                                                  | Array<[AyDialogFormField][aydialogformfield]>   | []          |
| addApi       | 新增 api，需要是 Promise 形式的接口                                                                     | Promise                                         | null        |
| updateApi    | 修改 api，需要是 Promise 形式的接口                                                                     | Promise                                         | null        |
| name         | 表单唯一名字                                                                                            | stirng                                          | 'ay-form'   |
| beforeSubmit | 提交前过滤，返回 false 则不提交。                                                                       | (params?: AnyKeyProps, mode?: string)=> boolean | AnyKeyProps | null |
| dialogExtend | 弹窗的其它参数。                                                                                        | Object                                          | null        |
| formExtend   | 表单的其它参数。                                                                                        | Object                                          | null        |
| dialogOnly   | 表单项是否默认不展示，只有写 dialog 才展示。另外 AySearchTable 内置了一个 AyDialogForm，且此参数为 true | boolean                                         | false       |

## AyDialogFormField

AyDialogFormField 扩展 AyFormField 的参数，其它的参数请参考 [AyFormField][ayformfield]。

| 参数名  | 说明                                                                  | 参数类型                   | 默认值  |
| ------- | --------------------------------------------------------------------- | -------------------------- | ------- |
| title   | 标题                                                                  | string                     | -       |
| key     | 唯一 key                                                              | string                     | -       |
| type    | 表单项类型                                                            | [FormType][formtype]       | 'input' |
| options | AyFormField 的 options                                                | Array<[Option][option]>    | -       |
| dialog  | 需要设置 dialogOnly 为 ture 才会生效，否则此处参数跟 AyFormField 一致 | [AyFormField][ayformfield] | -       |

<hr/>

```js
const fields: Array<AyDialogFormField> = [
  // 没有设置 dialogOnly 的情况下，field 写法跟 AyFormField 一致，所有的 field 都会展示
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
  },
  // 设置了 dialogOnly 的情况下，只有写了 dialog，参数才能被展示，且参数需要写在 dialog 内部
  {
    title: '备注',
    key: 'desc',
    dialog: {
      required: true
    }
  }
]

// 如果 AyDialogForm 设置了 dialogOnly，那么会过滤调非 dialog 的参数
// 上面的 fields 会被转成这样
const fields: Array<AyDialogFormField> = [
  {
    title: '备注',
    key: 'desc',
    required: true
  }
]
```

<hr/>

```tsx
import React, { useState, MutableRefObject, useRef } from 'react'
import { AyDialog, AyButton, AydialogFormRef, AyDialogForm, success } from 'amiya'
import { Space } from 'antd'
import 'antd/dist/antd.min.css'

const fields: Array<AyDialogFormField> = [
  // 没有设置 dialogOnly 的情况下，field 写法跟 AyFormField 一致，所有的 field 都会展示
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
  },
  // 设置了 dialogOnly 的情况下，只有写了 dialog，参数才能被展示，且参数需要写在 dialog 内部
  {
    title: '备注',
    key: 'desc',
    dialog: {
      required: true
    }
  }
]

// 模拟新增请求
const emptyApi = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

export default function Demo() {
  const dialogFormRef: MutableRefObject<AydialogFormRef> = useRef() as MutableRefObject<AydialogFormRef>
  const dialogOnlyFormRef: MutableRefObject<AydialogFormRef> = useRef() as MutableRefObject<AydialogFormRef>

  const handleAdd = () => {
    dialogFormRef.current.add().then(() => {
      success('新增成功')
    })
  }

  const handleDialogAdd = () => {
    dialogOnlyFormRef.current.add().then(() => {
      success('新增成功')
    })
  }

  return (
    <div>
      <Space>
        <AyButton onClick={() => handleAdd()}>不设置 dialogOnly</AyButton>
        <AyButton onClick={() => handleDialogAdd()}>设置了 dialogOnly</AyButton>
      </Space>
      <AyDialogForm ref={dialogFormRef} fields={fields} addApi={emptyApi} />
      <AyDialogForm dialogOnly ref={dialogOnlyFormRef} fields={fields} addApi={emptyApi} />
    </div>
  )
}
```

## Methods

| 参数名                                     | 说明          | 返回值  |
| ------------------------------------------ | ------------- | ------- |
| view(formValues: Object, config: Object)   | 查看          | Promise |
| update(formValues: Object, config: Object) | 修改          | Promise |
| add(formValues: Object, config: Object)    | 新增          | Promise |
| open(formValues: Object, config: Object)   | 自定义        | Promise |
| refreshFields()                            | 重新渲染 form | -       |
| getFormRef()                               | 获取 form ref | FormRef |

### formValues

- Type: Object
- Default: {}

打开弹窗后，表单的默认值。

### config

- Type: Object
- Default: {}

```js
add({}, { title: '自定义标题' })
```

[formtype]: ./form#formtype
[option]: ./form#option-参数
[aydialogformfield]: ./ay-dialog-form#aydialogformfield
[ayformfield]: ./form#ayformfield-参数
