# 卡片选择器 <Badge>0.47.0</Badge>

## 基础使用

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

      <div>当前值：{JSON.stringify(value)}</div>
    </div>
  )
}
```

## 尺寸

1. `size: 'default'`小尺寸的卡片最大宽度为 `300px`。
2. `size: 'large'`大尺寸的卡片间距会变大，且默认宽度为 `300px`。

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
    description: '一段流畅的文本信息。'
  }
]
export default function Demo() {
  const [value, setValue] = useState<number>(1)
  return (
    <div>
      <AyCardGroup options={options} value={value} onChange={setValue} />
      <Divider orientation="left">大尺寸</Divider>
      <AyCardGroup options={options} size="large" value={value} onChange={setValue} />
      <div>当前值：{JSON.stringify(value)}</div>
    </div>
  )
}
```

## 卡片的各种形式

展示了各种组合的情况。

```tsx
import React, { useState } from 'react'
import { AyCardGroup } from 'amiya'
import { Divider } from 'antd'

const style = {
  marginTop: 16,
  marginBottom: 8
}

export default function Demo() {
  const [value, setValue] = useState<number>(1)
  return (
    <div>
      <div style={style}>只有标题：</div>
      <AyCardGroup
        options={[
          { value: 1, label: '支付宝' },
          { value: 2, label: '微信' },
          { value: 3, label: '云闪付' }
        ]}
        value={value}
        onChange={setValue}
      />
      <div style={style}>只有描述：</div>
      <AyCardGroup
        options={[
          { value: 1, description: '一段简单的文本描述' },
          { value: 2, description: '一段简单的文本描述' },
          { value: 3, description: '一段简单的文本描述' }
        ]}
        value={value}
        onChange={setValue}
      />
      <div style={style}>只有图片：</div>
      <AyCardGroup
        options={[
          { value: 1, cover: require('./images/ali-pay.png') },
          { value: 2, cover: require('./images/wechat-pay.png') },
          { value: 3, cover: require('./images/union-pay.png') }
        ]}
        value={value}
        onChange={setValue}
      />
      <div style={style}>标题与描述：</div>
      <AyCardGroup
        options={[
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
        ]}
        value={value}
        onChange={setValue}
      />
      <div style={style}>标题与图片：</div>
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
      <div style={style}>完整：</div>
      <AyCardGroup
        options={[
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
        ]}
        value={value}
        onChange={setValue}
      />
      <Divider orientation="left">大尺寸</Divider>
      <div style={style}>只有标题：</div>
      <AyCardGroup
        size="large"
        options={[
          { value: 1, label: '支付宝' },
          { value: 2, label: '微信' },
          { value: 3, label: '云闪付' }
        ]}
        value={value}
        onChange={setValue}
      />
      <div style={style}>只有描述：</div>
      <AyCardGroup
        size="large"
        options={[
          { value: 1, description: '一段简单的文本描述' },
          { value: 2, description: '一段简单的文本描述' },
          { value: 3, description: '一段简单的文本描述' }
        ]}
        value={value}
        onChange={setValue}
      />
      <div style={style}>只有图片：</div>
      <AyCardGroup
        size="large"
        options={[
          { value: 1, cover: require('./images/ali-pay.png') },
          { value: 2, cover: require('./images/wechat-pay.png') },
          { value: 3, cover: require('./images/union-pay.png') }
        ]}
        value={value}
        onChange={setValue}
      />
      <div style={style}>标题与描述：</div>
      <AyCardGroup
        size="large"
        options={[
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
        ]}
        value={value}
        onChange={setValue}
      />
      <div style={style}>标题与图片：</div>
      <AyCardGroup
        size="large"
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
      <div style={style}>完整：</div>
      <AyCardGroup
        size="large"
        options={[
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
        ]}
        value={value}
        onChange={setValue}
      />
      <div>当前值：{JSON.stringify(value)}</div>
    </div>
  )
}
```

## 自定义卡片样式

`cardStyle` 可以决定卡片样式

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
    description: '一段流畅的文本信息。'
  }
]

export default function Demo() {
  const [value, setValue] = useState<number>(1)
  return (
    <div>
      <AyCardGroup cardStyle={{ width: 200, height: 200 }} options={options} value={value} onChange={setValue} />
      <div>当前值：{JSON.stringify(value)}</div>
    </div>
  )
}
```

## 禁用选项

`disabled` 针对某个卡片禁止选中。

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
  return (
    <div>
      <AyCardGroup options={options} value={value} onChange={setValue} />
      <Divider orientation="left">大尺寸</Divider>
      <AyCardGroup options={options} size="large" value={value} onChange={setValue} />
      <div>当前值：{JSON.stringify(value)}</div>
    </div>
  )
}
```

## 只读

设置 `readonly` 后，无法取消和选中任何卡片。

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
    description: '一段流畅的文本信息。'
  }
]
export default function Demo() {
  const [value, setValue] = useState<number>(1)
  const [valueMultiple, setValueMultiple] = useState<Array<number>>([1, 3])
  return (
    <div>
      <AyCardGroup readonly options={options} value={value} onChange={setValue} />
      <Divider orientation="left">多选</Divider>
      <AyCardGroup readonly options={options} multiple value={valueMultiple} onChange={setValueMultiple} />
      <div>当前单选值：{JSON.stringify(value)}</div>
      <div>当前多选值：{JSON.stringify(valueMultiple)}</div>
    </div>
  )
}
```

## 不同的颜色

定义，可由 `css` 变量决定不同的颜色。

1. `--ay-primary-color` 主要颜色，这里决定多选模式下角标的颜色
2. `--ay-primary-border-color` 选中边框颜色
3. `--ay-primary-bg-color` 选中背景色

```tsx
import React, { useState } from 'react'
import { AyCardGroup, Option, AnyKeyProps } from 'amiya'
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
    description: '一段流畅的文本信息。'
  }
]

const defaultRectStyle = {
  width: 16,
  height: 16,
  marginTop: 3,
  borderRadius: 2
}

const colorOptions = [
  {
    value: 1,
    label: '拂晓蓝',
    cover: <div style={{ ...defaultRectStyle, backgroundColor: '#1890ff' }}></div>
  },
  {
    value: 2,
    label: '薄暮红',
    cover: <div style={{ ...defaultRectStyle, backgroundColor: '#f5222d' }}></div>
  },
  {
    value: 3,
    label: '青柠绿',
    cover: <div style={{ ...defaultRectStyle, backgroundColor: '#a0d911' }}></div>
  },
  {
    value: 4,
    label: '酱紫',
    cover: <div style={{ ...defaultRectStyle, backgroundColor: '#722ed1' }}></div>
  }
]

const colorStyleMap: AnyKeyProps = {
  1: {},
  // 红色
  2: {
    ['--ay-primary-color']: '#f5222d',
    ['--ay-primary-border-color']: '#ff7875',
    ['--ay-primary-bg-color']: '#fff1f0'
  },
  // 绿色
  3: {
    ['--ay-primary-color']: '#a0d911',
    ['--ay-primary-border-color']: '#d3f261',
    ['--ay-primary-bg-color']: '#fcffe6'
  },
  // 紫色
  4: {
    ['--ay-primary-color']: '#722ed1',
    ['--ay-primary-border-color']: '#b37feb',
    ['--ay-primary-bg-color']: '#f9f0ff'
  }
}

export default function Demo() {
  const [color, setColor] = useState<number>(1)
  const [value, setValue] = useState<number>(1)
  const [valueMultiple, setValueMultiple] = useState<Array<number>>([1, 3])

  return (
    <div style={colorStyleMap[color]}>
      <AyCardGroup style={{ marginBottom: 16 }} options={colorOptions} value={color} onChange={setColor} />
      <AyCardGroup size="large" options={options} value={value} onChange={setValue} />
      <Divider orientation="left">多选</Divider>
      <AyCardGroup size="large" options={options} multiple value={valueMultiple} onChange={setValueMultiple} />
      <div>当前单选值：{JSON.stringify(value)}</div>
      <div>当前多选值：{JSON.stringify(valueMultiple)}</div>
    </div>
  )
}
```

## 在表单中使用

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

```jsx | pure
const fields = [
  {
    title: '大卡片',
    key: 'largeSize',
    type: 'card-group',
    defaultValue: 1,
    // 把 AyCardGroup 属性放在这里使用
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
| readonly | 所有的选项只读 | boolean                                               | false                  |
| onChange | 监听值变化事件 | (string \| number \| Array<string \| number>) => void | -                      |
