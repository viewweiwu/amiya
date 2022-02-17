# 卡片选择器

## 单独使用

```tsx
import React, { useState } from 'react'
import { AyCardGroup } from 'amiya'

export default function Demo() {
  const [value, setValue] = useState<number>(1)
  return (
    <div>
      <AyCardGroup
        options={[
          {
            value: 1,
            label: '支付宝',
            cover: require('./images/ali-pay.png')
          },
          {
            value: 2,
            label: '微信',
            cover: require('./images/wechat-pay.png')
          },
          {
            value: 3,
            label: '云闪付',
            cover: require('./images/union-pay.png')
          }
        ]}
        value={value}
        onChange={setValue}
      />

      <p>当前值：{value}</p>
    </div>
  )
}
```

## 多选

设置 `multiple` 即可多选，值会变成数组，请注意。

```tsx
import React, { useState } from 'react'
import { AyCardGroup } from 'amiya'

export default function Demo() {
  const [value, setValue] = useState<Array<number>>([])
  return (
    <div>
      <AyCardGroup
        multiple
        options={[
          {
            value: 1,
            label: '支付宝',
            cover: require('./images/ali-pay.png')
          },
          {
            value: 2,
            label: '微信',
            cover: require('./images/wechat-pay.png')
          },
          {
            value: 3,
            label: '云闪付',
            cover: require('./images/union-pay.png')
          }
        ]}
        value={value}
        onChange={setValue}
      />

      <p>当前值：{JSON.stringify(value)}</p>
    </div>
  )
}
```

## 尺寸

1. `size: 'default'`小尺寸的卡片最大宽度为 `300px`。
2. `size: 'large'`大尺寸的卡片间距会变大，且默认宽度为 `300px`。

```tsx
import React, { useState } from 'react'
import { AyForm, AyFormField, AyButton, AnyKeyProps } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '小卡片',
    key: 'normalSize',
    type: 'card-group',
    defaultValue: 1,
    options: [
      {
        value: 1,
        label: '支付宝',
        cover: require('./images/ali-pay.png'),
        description: '一段简单的文本描述'
      },
      {
        value: 2,
        label: '微信',
        cover: require('./images/wechat-pay.png'),
        description: '一段简单的文本描述'
      },
      {
        value: 3,
        label: '云闪付',
        cover: require('./images/union-pay.png'),
        description: '一段简单的文本描述'
      }
    ]
  },
  {
    title: '大卡片',
    key: 'largeSize',
    type: 'card-group',
    defaultValue: 1,
    size: 'large',
    options: [
      {
        value: 1,
        label: '支付宝',
        cover: require('./images/ali-pay.png'),
        description: '一段简单的文本描述'
      },
      {
        value: 2,
        label: '微信',
        cover: require('./images/wechat-pay.png'),
        description: '一段简单的文本描述'
      },
      {
        value: 3,
        label: '云闪付',
        cover: require('./images/union-pay.png'),
        description: '一段简单的文本描述'
      }
    ]
  }
]
export default function Demo() {
  const [submitValues, setSubmitValues] = useState<AnyKeyProps>({})
  return (
    <div>
      <AyForm fields={fields} onConfirm={values => setSubmitValues(values)}>
        <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>

      {submitValues.normalSize && <pre>{JSON.stringify(submitValues, null, 2)}</pre>}
    </div>
  )
}
```

## 卡片的各种形式

展示了各种组合的情况。

```tsx
import React, { useState } from 'react'
import { AyForm, AyFormField, AyButton, AnyKeyProps } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '只有标题',
    key: 'titleOnly',
    type: 'card-group',
    defaultValue: 1,
    options: [
      {
        value: 1,
        label: '支付宝'
      },
      {
        value: 2,
        label: '微信'
      },
      {
        value: 3,
        label: '云闪付'
      }
    ]
  },
  {
    title: '只有描述',
    key: 'descriptionOnly',
    type: 'card-group',
    defaultValue: 1,
    options: [
      {
        value: 1,
        description: '一段简单的文本描述'
      },
      {
        value: 2,
        description: '一段简单的文本描述'
      },
      {
        value: 3,
        description: '一段简单的文本描述'
      }
    ]
  },
  {
    title: '只有图片',
    key: 'imageOnly',
    type: 'card-group',
    defaultValue: 1,
    options: [
      {
        value: 1,
        cover: require('./images/ali-pay.png')
      },
      {
        value: 2,
        cover: require('./images/wechat-pay.png')
      },
      {
        value: 3,
        cover: require('./images/union-pay.png')
      }
    ]
  },
  {
    title: '标题与描述',
    key: 'withDescription',
    type: 'card-group',
    defaultValue: 1,
    options: [
      {
        value: 1,
        label: '支付宝',
        description: '一段简单的文本描述'
      },
      {
        value: 2,
        label: '微信',
        description: '一段简单的文本描述'
      },
      {
        value: 3,
        label: '云闪付',
        description: '一段简单的文本描述'
      }
    ]
  },
  {
    title: '标题与图片',
    key: 'withImage',
    type: 'card-group',
    defaultValue: 1,
    options: [
      {
        value: 1,
        label: '支付宝',
        cover: require('./images/ali-pay.png')
      },
      {
        value: 2,
        label: '微信',
        cover: require('./images/wechat-pay.png')
      },
      {
        value: 3,
        label: '云闪付',
        cover: require('./images/union-pay.png')
      }
    ]
  },
  {
    title: '完整',
    key: 'withDescriptionAndImage',
    type: 'card-group',
    defaultValue: 1,
    options: [
      {
        value: 1,
        label: '支付宝',
        cover: require('./images/ali-pay.png'),
        description: '一段简单的文本描述'
      },
      {
        value: 2,
        label: '微信',
        cover: require('./images/wechat-pay.png'),
        description: '一段简单的文本描述'
      },
      {
        value: 3,
        label: '云闪付',
        cover: require('./images/union-pay.png'),
        description: '一段简单的文本描述'
      }
    ]
  },
  {
    key: '__title',
    render: () => (
      <h2 style={{ borderLeft: '3px solid #1890ff', paddingLeft: 12, marginLeft: 30 }}>大卡片 size: large</h2>
    )
  },
  {
    title: '只有标题',
    key: 'titleOnlyLarge',
    type: 'card-group',
    defaultValue: 1,
    size: 'large',
    options: [
      {
        value: 1,
        label: '支付宝'
      },
      {
        value: 2,
        label: '微信'
      },
      {
        value: 3,
        label: '云闪付'
      }
    ]
  },
  {
    title: '只有描述',
    key: 'descriptionOnlyLarge',
    type: 'card-group',
    defaultValue: 1,
    size: 'large',
    options: [
      {
        value: 1,
        description: '一段简单的文本描述'
      },
      {
        value: 2,
        description: '一段简单的文本描述'
      },
      {
        value: 3,
        description: '一段简单的文本描述'
      }
    ]
  },
  {
    title: '只有图片',
    key: 'imageOnlyLarge',
    type: 'card-group',
    defaultValue: 1,
    size: 'large',
    options: [
      {
        value: 1,
        cover: require('./images/ali-pay.png')
      },
      {
        value: 2,
        cover: require('./images/wechat-pay.png')
      },
      {
        value: 3,
        cover: require('./images/union-pay.png')
      }
    ]
  },
  {
    title: '标题与描述',
    key: 'withDescriptionLarge',
    type: 'card-group',
    size: 'large',
    defaultValue: 1,
    options: [
      {
        value: 1,
        label: '支付宝',
        description: '一段简单的文本描述'
      },
      {
        value: 2,
        label: '微信',
        description: '一段简单的文本描述'
      },
      {
        value: 3,
        label: '云闪付',
        description: '一段简单的文本描述'
      }
    ]
  },
  {
    title: '标题与图片',
    key: 'withImageLarge',
    type: 'card-group',
    size: 'large',
    defaultValue: 1,
    options: [
      {
        value: 1,
        label: '支付宝',
        cover: require('./images/ali-pay.png')
      },
      {
        value: 2,
        label: '微信',
        cover: require('./images/wechat-pay.png')
      },
      {
        value: 3,
        label: '云闪付',
        cover: require('./images/union-pay.png')
      }
    ]
  },
  {
    title: '完整',
    key: 'withDescriptionAndImageLarge',
    type: 'card-group',
    size: 'large',
    defaultValue: 1,
    options: [
      {
        value: 1,
        label: '支付宝',
        cover: require('./images/ali-pay.png'),
        description: '一段简单的文本描述'
      },
      {
        value: 2,
        label: '微信',
        cover: require('./images/wechat-pay.png'),
        description: '一段简单的文本描述'
      },
      {
        value: 3,
        label: '云闪付',
        cover: require('./images/union-pay.png'),
        description: '一段简单的文本描述'
      }
    ]
  }
]
export default function Demo() {
  const [submitValues, setSubmitValues] = useState<AnyKeyProps>({})
  return (
    <div>
      <AyForm fields={fields} onConfirm={values => setSubmitValues(values)}>
        <AyButton style={{ marginLeft: 120 }} type="primary" htmlType="submit">
          提交
        </AyButton>
      </AyForm>

      {submitValues.titleOnly && <pre>{JSON.stringify(submitValues, null, 2)}</pre>}
    </div>
  )
}
```

## 禁用选项

```tsx
import React, { useState } from 'react'
import { AyCardGroup, Option } from 'amiya'
import { Divider } from 'antd'

const options: Array<Option> = [
  {
    value: 1,
    label: '支付宝',
    cover: require('./images/ali-pay.png'),
    description: '一段流畅的文本信息，它有着非常艰巨的任务，能让用户能明白文字多的情况下会有什么表现。'
  },
  {
    value: 2,
    label: '微信',
    cover: require('./images/wechat-pay.png'),
    description: '一段流畅的文本信息，它有着非常艰巨的任务，没错！就是用来占位的。'
  },
  {
    value: 3,
    label: '云闪付',
    cover: require('./images/union-pay.png'),
    description: '一段流畅的文本信息。',
    disabled: true
  }
]
export default function Demo() {
  const [value, setValue] = useState<number>(1)
  const [valueMultiple, setValueMultiple] = useState<number>(1)
  return (
    <div>
      <AyCardGroup options={options} value={value} onChange={setValue} />
      <Divider orientation="left">大尺寸</Divider>
      <AyCardGroup options={options} size="large" value={valueMultiple} onChange={setValueMultiple} />
    </div>
  )
}
```

## Option

| 参数名      | 说明                                                    | 参数类型            |
| ----------- | ------------------------------------------------------- | ------------------- |
| label       | 标题                                                    | ReactNode           |
| value       | 唯一值，相当于 ID                                       | string \| number    |
| cover       | icon 图片，为字符串时，展示圆角图片，也可以是自定义元素 | string \| ReactNode |
| description | 灰色文字的描述                                          | string              |
| disabled    | 是否禁用选项                                            | boolean             |

## Props 参数

| 参数名   | 说明           | 参数类型                                              | 默认值                 |
| -------- | -------------- | ----------------------------------------------------- | ---------------------- |
| options  | 选项           | Array<[Option](#option)>                              | -                      |
| size     | 卡片尺寸       | 'default' \| 'large'                                  | 'default'              |
| multiple | 是否多选       | boolean                                               | false                  |
| value    | 当前值         | string \| number \| Array<string \| number>           | 单选为 null，多选为 [] |
| onChange | 监听值变化事件 | (string \| number \| Array<string \| number>) => void | -                      |
