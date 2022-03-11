---
toc: true
---

# useOptions

## 基础使用

```tsx
import React from 'react'
import { Divider } from 'antd'
import { useOptions } from 'amiya'

const getOptionsApi = () => {
  return Promise.resolve([
    {
      label: '选项一',
      value: 1
    },
    {
      label: '选项二',
      value: 1
    }
  ])
}

export default function Demo() {
  const { options } = useOptions(getOptionsApi)
  return (
    <div>
      <Divider orientation="left">返回的数据</Divider>
      <pre>{JSON.stringify(options, null, 2)}</pre>
    </div>
  )
}
```

```js
import { useOptions } from 'amiya'
export default function Demo() {
  const { options } = useOptions(getOptionsApi)
}
```

## 标记结果路径

```tsx
import React from 'react'
import { Divider, Row, Col } from 'antd'
import { useOptions } from 'amiya'

const getOptionsApi = () => {
  return Promise.resolve({
    code: 200,
    data: {
      list: [
        {
          label: '选项一',
          value: 1
        },
        {
          label: '选项二',
          value: 1
        }
      ]
    }
  })
}

export default function Demo() {
  const { options, data } = useOptions(getOptionsApi, {
    path: ['data', 'list']
  })
  return (
    <Row gutter={12}>
      <Col span={12}>
        <Divider orientation="left">原始请求数据</Divider>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Col>
      <Col span={12}>
        <Divider orientation="left">返回的数据</Divider>
        <pre>{JSON.stringify(options, null, 2)}</pre>
      </Col>
    </Row>
  )
}
```

```js
import { useOptions } from 'amiya'
export default function Demo() {
  const { options } = useOptions(getOptionsApi, { path: ['data', 'list'] })
}
```

## 结果转译

```tsx
import React from 'react'
import { Divider, Row, Col } from 'antd'
import { useOptions } from 'amiya'

const getOptionsApi = () => {
  return Promise.resolve([
    {
      name: '浙江省',
      id: 1,
      list: [
        {
          name: '杭州市',
          id: '1-1'
        },
        {
          name: '宁波市',
          id: '1-2'
        }
      ]
    },
    {
      name: '陕西省',
      id: 2,
      list: [
        {
          name: '西安市',
          id: '2-1'
        }
      ]
    }
  ])
}

export default function Demo() {
  const { options, data } = useOptions(getOptionsApi, {
    transform: {
      label: 'name',
      value: 'id',
      children: 'list'
    }
  })
  return (
    <Row gutter={12}>
      <Col span={12}>
        <Divider orientation="left">原始请求数据</Divider>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Col>
      <Col span={12}>
        <Divider orientation="left">返回的数据</Divider>
        <pre>{JSON.stringify(options, null, 2)}</pre>
      </Col>
    </Row>
  )
}
```

```js
import { useOptions } from 'amiya'
export default function Demo() {
  const { options } = useOptions(getOptionsApi, {
    transform: {
      label: 'name',
      value: 'id',
      children: 'list'
    }
  })
}
```

## 保留原始数据

```tsx
import React from 'react'
import { Divider, Row, Col } from 'antd'
import { useOptions } from 'amiya'

const getOptionsApi = () => {
  return Promise.resolve([
    {
      name: '选项一',
      id: '1'
    },
    {
      name: '选项二',
      id: '2'
    }
  ])
}

export default function Demo() {
  const { options, data } = useOptions(getOptionsApi, {
    keepOrigin: true,
    transform: {
      label: 'name',
      value: 'id'
    }
  })
  return (
    <Row gutter={12}>
      <Col span={12}>
        <Divider orientation="left">原始请求数据</Divider>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Col>
      <Col span={12}>
        <Divider orientation="left">返回的数据</Divider>
        <pre>{JSON.stringify(options, null, 2)}</pre>
      </Col>
    </Row>
  )
}
```

```js
import { useOptions } from 'amiya'
export default function Demo() {
  const { options, data } = useOptions(getOptionsApi, {
    keepOrigin: true,
    transform: {
      label: 'name',
      value: 'id'
    }
  })
}
```

## 结果转译 2

```tsx
import React from 'react'
import { Divider, Row, Col } from 'antd'
import { useOptions, Option } from 'amiya'

const getOptionsApi = () => {
  return Promise.resolve([
    {
      label: '选项一',
      value: '1',
      children: [
        {
          label: '子选项',
          value: '1-1'
        }
      ]
    },
    {
      label: '选项二',
      value: '2'
    }
  ])
}

export default function Demo() {
  const { options, data } = useOptions(getOptionsApi, {
    transform: (option: Option, index: number, level: number) => ({
      label: `${option.label}(${level})`,
      value: option.value,
      children: option.children
    })
  })
  return (
    <Row gutter={12}>
      <Col span={12}>
        <Divider orientation="left">原始请求数据</Divider>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Col>
      <Col span={12}>
        <Divider orientation="left">返回的数据</Divider>
        <pre>{JSON.stringify(options, null, 2)}</pre>
      </Col>
    </Row>
  )
}
```

```js
import { useOptions } from 'amiya'
export default function Demo() {
  const { options, data } = useOptions(getOptionsApi, {
    transform: (option: Option, index: number, level: number) => ({
      label: `${option.label}(${level})`,
      value: 1,
      children: option.children
    })
  })
}
```

## 翻译成树

```tsx
import React from 'react'
import { Divider, Row, Col } from 'antd'
import { useOptions } from 'amiya'

const getOptionsApi = () => {
  return Promise.resolve([
    {
      label: '选项一',
      value: '1',
      parentId: null
    },
    {
      label: '子选项',
      value: '1-1',
      parentId: '1'
    },
    {
      label: '选项二',
      value: '2',
      parentId: null
    }
  ])
}

export default function Demo() {
  const { options, tree, data } = useOptions(getOptionsApi, { toTree: true })
  return (
    <Row gutter={12}>
      <Col span={8}>
        <Divider orientation="left">原始请求数据</Divider>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Col>
      <Col span={16}>
        <Divider orientation="left">返回的数据</Divider>
        <Row>
          <Col span={12}>
            平铺的结果(options)
            <pre>{JSON.stringify(options, null, 2)}</pre>
          </Col>
          <Col span={12}>
            转成的树(tree)
            <pre>{JSON.stringify(tree, null, 2)}</pre>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
```

```js
import { useOptions } from 'amiya'
const { options, tree, data } = useOptions(getOptionsApi, { toTree: true })
```

## 手动控制加载

```tsx
import React from 'react'
import { Divider, Row, Col } from 'antd'
import { useOptions, AyButton } from 'amiya'

const getOptionsApi = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          label: '选项一',
          value: '1'
        },
        {
          label: '选项二',
          value: '2'
        }
      ])
    }, 1000)
  })
}

export default function Demo() {
  const { options, data, load, loading } = useOptions(getOptionsApi, { autoload: false })
  return (
    <div>
      <AyButton onClick={load} loading={loading}>
        加载
      </AyButton>
      <Row gutter={12}>
        <Col span={12}>
          <Divider orientation="left">原始请求数据</Divider>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Col>
        <Col span={12}>
          <Divider orientation="left">返回的数据</Divider>
          <pre>{JSON.stringify(options, null, 2)}</pre>
        </Col>
      </Row>
    </div>
  )
}
```

```jsx | pure
import { useOptions } from 'amiya'

export default function Demo() {
  const { options, load, loading } = useOptions(getOptionsApi, { autoload: true })
  return (
    <AyButton onClick="{load}" loading={loading}>
      加载
    </AyButton>
  )
}
```

## getOptionsApi

模拟请求的接口。

## 参数

| 参数名     | 说明                       | 参数类型                                                                                                  | 默认值 |
| ---------- | -------------------------- | --------------------------------------------------------------------------------------------------------- | ------ |
| path       | 地址路径                   | Array<string>                                                                                             | -      |
| params     | 请求时传递的参数           | object                                                                                                    | -      |
| transform  | 转换结果                   | (option: [Option](#option), index: number, level: number) => [Option](#option) \| [Transform](#transform) | -      |
| keepOrigin | 转换结果后是否保留原始数据 | boolean                                                                                                   | false  |
| toTree     | 是否转换成树               | boolean                                                                                                   | false  |
| autoload   | 是否加载完成后自动发起请求 | boolean                                                                                                   | true   |
| onLoad     | 请求完成监听               | function                                                                                                  | -      |

## 返回值

| 值      | 说明               | 值类型                   |
| ------- | ------------------ | ------------------------ |
| options | 选项               | Array<[Option](#option)> |
| tree    | 转化成树的选项     | Array<[Option](#option)> |
| loading | 是否正在请求中     | boolean                  |
| data    | 请求返回的原始数据 | object                   |
| load    | 主动调用请求方法   | () => void               |

## Option

| 参数名   | 说明     | 参数类型                 | 默认值 |
| -------- | -------- | ------------------------ | ------ |
| label    | 显示选项 | string \| number         | -      |
| value    | 值       | any                      | -      |
| disabled | 是否禁用 | boolean                  | -      |
| children | 子元素   | Array<[Option](#option)> | -      |

## Transform

| 参数名    | 说明                      | 参数类型 | 默认值     |
| --------- | ------------------------- | -------- | ---------- |
| label     | 标签名 key，展示时使用    | string   | 'label'    |
| value     | 选项值 key                | string   | 'value'    |
| children  | 子元素 key                | string   | 'children' |
| parentId  | 父节点 key                | string   | 'parentId' |
| rootValue | 根节点值                  | any      | null       |
| keepLeaf  | 叶子结点是否包含 children | boolean  | false      |
