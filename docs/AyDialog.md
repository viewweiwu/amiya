# AyDialog

## 示例

```tsx
import React, { useState } from 'react'
import { AyDialog, AyButton } from 'amiya'

export default function Demo() {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <div>
      <AyButton type="primary" onClick={() => setVisible(true)}>
        打开弹窗
      </AyButton>
      <AyDialog title="メセージ" visible={visible} setVisible={setVisible} onConfirm={() => alert('确认')}>
        <p>ドクター、終わってない仕事がたくさんありますから。まだ休んじゃダメですよ。</p>
      </AyDialog>
    </div>
  )
}
```

| 参数名     | 说明                           | 参数类型                            | 默认值 |
| ---------- | ------------------------------ | ----------------------------------- | ------ |
| title      | 标题                           | ReactNode                           | -      |
| visible    | 是否展示                       | boolean                             | -      |
| setVisible | 自动关闭弹窗时，可以传递此参数 | Dispatch<SetStateAction<boolean\>\> | -      |
| onConfirm  | 确认按钮事件监听               | () => void                          | -      |
| loading    | 是否正在加载                   | boolean                             | -      |
| footer     | 自定义底部按钮                 | ReactNode                           | -      |
| width      | 弹窗宽度                       | number                              | -      |
| 其它参数   | antd Modal 其它参数            | [查看参数][1]                       | -      |

[1]: https://ant-design.gitee.io/components/modal-cn/#API
