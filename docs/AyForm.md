# AyForm

## 示例

```tsx
import React, { useState } from 'react'
import { AyForm, AyButton, AyFormField } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '用户名',
    key: 'name'
  },
  {
    title: '密码',
    type: 'password',
    key: 'password'
  },
  {
    type: 'checkbox',
    key: 'remember',
    props: {
      style: {
        float: 'right'
      },
      children: '记住密码'
    }
  }
]

export default function Demo() {
  const handleConfirm = (form: any) => {
    console.log(form)
    alert(JSON.stringify(form))
  }

  return (
    <AyForm
      span={24}
      fields={fields}
      onConfirm={handleConfirm}
      style={{ width: 400, margin: '0 auto' }}
      layout={{ labelCol: { flex: '100px' } }}
    >
      <AyButton block type="primary" htmlType="submit">
        登录
      </AyButton>
    </AyForm>
  )
}
```

## 参数

| 参数名    | 说明                                  | 参数类型                | 默认值    |
| --------- | ------------------------------------- | ----------------------- | --------- |
| fields    | 配置项                                | Array<[AyFormField][2]> | -         |
| name      | form 名称，一般不需要填               | string                  | 'ay-form' |
| onConfirm | 提交事件监听                          | (form: Object) => void  | -         |
| span      | antd Grid 的 Col 组件的 span 属性类似 | 1 ～ 24                 | 12        |
| footer    | 自定义底部按钮                        | ReactNode               | -         |
| width     | 弹窗宽度                              | number                  | -         |
| layout    | 布局参数, 查看下方 layout 参数        | Object                  | -         |
| props     | antd Form 其它参数                    | [查看参数][1]           | -         |

## layout 参数

```javascript
// 这个是默认值
const layout = {
  labelCol: { flex: '120px' }, // label 宽度
  wrapperCol: { flex: '1' } // content 宽度
}

// 传进去可以只填写一项
const layout = {
  labelCol: { flex: '100px' } // label 宽度
}
// or
const layout = {
  wrapperCol: { flex: '200px' } // content 宽度
}
```

[1]: https://ant-design.gitee.io/components/form-cn/#API
[2]: /filed参数详解#ayformfield-参数
