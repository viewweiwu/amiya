# 国际化 - 多语言

amiya 默认是中文，如果需要使用其它语言，请参考下面。

设置 amiya 语言时，会在 `localStorage` 存储 `AMIYA_LOCALE`，存储的是语言名。

## 方法一、通过 setLanguage 更改语言

```tsx
import React, { useState } from 'react'
import { AyCardGroup, setLanguage } from 'amiya'
import { Modal } from 'antd'

export default function Demo() {
  const [locale, setLocale] = useState(localStorage.getItem('AMIYA_LOCALE') || 'zh_CN')

  const handleChange = (value: string) => {
    setLocale(value)
    setLanguage(value)
    Modal.confirm({
      title: '语言更换提示',
      content: '切换语言后，只会对 Amiya 组件产生影响，可观察其它页面的变化。',
      onOk: () => {
        window.location.reload()
      }
    })
  }
  return (
    <AyCardGroup
      bordered={false}
      onChange={handleChange}
      value={locale}
      options={[
        { label: '中文', value: 'zh_CN' },
        { label: '英文', value: 'en_US' },
        { label: '日文', value: 'ja_JP' }
      ]}
    />
  )
}
```

```js
import { setLanguage } from 'amiya'
setLanguage('zh_CN')
```

## 方法二、通过 localStorage 更改语言

```tsx
import React, { useState } from 'react'
import { AyCardGroup } from 'amiya'
import { Modal } from 'antd'

export default function Demo() {
  const [locale, setLocale] = useState(localStorage.getItem('AMIYA_LOCALE') || 'zh_CN')

  const handleChange = (value: string) => {
    setLocale(value)
    localStorage.setItem('AMIYA_LOCALE', value)
    Modal.confirm({
      title: '语言更换提示',
      content: '切换语言后，只会对 Amiya 组件产生影响，可观察其它页面的变化。',
      onOk: () => {
        window.location.reload()
      }
    })
  }
  return (
    <AyCardGroup
      bordered={false}
      onChange={handleChange}
      value={locale}
      options={[
        { label: '中文', value: 'zh_CN' },
        { label: '英文', value: 'en_US' },
        { label: '日文', value: 'ja_JP' }
      ]}
    />
  )
}
```

```js
localStorage.setItem('AMIYA_LOCALE', 'zh_CN')
```

| 语言 | 语言名 |
| ---- | ------ |
| 中文 | zh_CN  |
| 英文 | en_US  |
| 日文 | ja_JP  |
