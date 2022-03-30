# AyTagGroup 标签选择 <Badge>0.51.0</Badge>

## 基础使用

```tsx
import React, { useState } from 'react'
import { AyTagGroup } from 'amiya'

export default function Demo() {
  const [value, setValue] = useState<number | undefined>(undefined)
  return (
    <div>
      <AyTagGroup
        options={[
          {
            value: 1,
            label: '水果'
          },
          {
            value: 2,
            label: '电子产品'
          },
          {
            value: 3,
            label: '清洁'
          }
        ]}
        value={value}
        onChange={setValue}
      />

      <p style={{ marginTop: 50 }}>当前值：{value}</p>
    </div>
  )
}
```

## 多选

设置 `multiple` 即可多选，值会变成数组，请注意。

```tsx
import React, { useState } from 'react'
import { AyTagGroup } from 'amiya'

export default function Demo() {
  const [value, setValue] = useState<number[]>([])
  return (
    <div>
      <AyTagGroup
        options={[
          {
            value: 1,
            label: '水果'
          },
          {
            value: 2,
            label: '电子产品'
          },
          {
            value: 3,
            label: '清洁'
          }
        ]}
        multiple
        value={value}
        onChange={setValue}
      />

      <p style={{ marginTop: 50 }}>当前值：{JSON.stringify(value)}</p>
    </div>
  )
}
```

## 没有全部选项

```tsx
import React, { useState } from 'react'
import { AyTagGroup } from 'amiya'

export default function Demo() {
  const [value, setValue] = useState<number>(1)
  return (
    <div>
      <AyTagGroup
        options={[
          {
            value: 1,
            label: '水果'
          },
          {
            value: 2,
            label: '电子产品'
          },
          {
            value: 3,
            label: '清洁'
          }
        ]}
        showAllChecked={false}
        value={value}
        onChange={setValue}
      />

      <p style={{ marginTop: 50 }}>当前值：{value}</p>
    </div>
  )
}
```

## 只读

设置 `readonly` 后，将无法选中任何选项。

```tsx
import React, { useState } from 'react'
import { AyTagGroup } from 'amiya'

export default function Demo() {
  const [value, setValue] = useState<number | undefined>(undefined)
  return (
    <div>
      <AyTagGroup
        options={[
          {
            value: 1,
            label: '水果'
          },
          {
            value: 2,
            label: '电子产品'
          },
          {
            value: 3,
            label: '清洁'
          }
        ]}
        readonly
        value={value}
        onChange={setValue}
      />

      <p style={{ marginTop: 50 }}>当前值：{value}</p>
    </div>
  )
}
```

## 在表单内使用

```tsx
import React, { useState } from 'react'
import { AyForm, AyFormField, AyButton, AnyKeyProps } from 'amiya'

const fields: Array<AyFormField> = [
  {
    title: '产品类型',
    key: 'normalSize',
    type: 'tag-group',
    options: [
      {
        value: 1,
        label: '水果'
      },
      {
        value: 2,
        label: '电子产品'
      },
      {
        value: 3,
        label: '清洁'
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

      {Object.values(submitValues).length > 0 && <pre>{JSON.stringify(submitValues, null, 2)}</pre>}
    </div>
  )
}
```

## Option

| 参数名 | 说明              | 参数类型         |
| ------ | ----------------- | ---------------- |
| label  | 标题              | ReactNode        |
| value  | 唯一值，相当于 ID | string \| number |

## Props 参数

| 参数名         | 说明                                   | 参数类型                                              | 默认值                 | 版本   |
| -------------- | -------------------------------------- | ----------------------------------------------------- | ---------------------- | ------ |
| options        | 选项                                   | Array<[Option](#option)>                              | -                      | -      |
| multiple       | 是否多选                               | boolean                                               | false                  | -      |
| value          | 当前值                                 | string \| number \| Array<string \| number>           | 单选为 null，多选为 [] | -      |
| readonly       | 所有的选项只读                         | boolean                                               | false                  | -      |
| showAllChecked | 是否展示【全部】选项                   | boolean                                               | true                   | -      |
| allCheckedText | 【全部】选项文本                       | string                                                | '全部'                 | -      |
| cancelable     | 单选时，是否可以点击选中的元素取消选中 | boolean                                               | false                  | 0.55.0 |
| onChange       | 监听值变化事件                         | (string \| number \| Array<string \| number>) => void | -                      | -      |
