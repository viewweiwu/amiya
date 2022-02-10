# 可编辑表格

## 可编辑单元格

<code src="./AySearchTableEditDemo.tsx" />

```js
// 需要设置先设置表格的编辑模式
<AySearchTable editMode="col" />
```

## 可编辑行

<code src="./AySearchTableRowEditDemo.tsx" />

```js
// 需要设置先设置表格的编辑模式
<AySearchTable editMode="row" />
```

## editable

如果在 field 设置 `editable` 为 `true`，则表示此列可以编辑。

## renderType

需要扩展，请看下方 扩展可编辑类型。

- 可选值:
  - 输入框: 'editable-cell-input'（默认值）
  - 选择框: 'editable-cell-select'

## 扩展可编辑类型

扩展一个简易版的 number 类型编辑框。

```js
import { registerTableRender, RenderProps } from 'amiya'
import { InputNumber } from 'antd'

// 全局注册一次，放在全局 /amiya/index.tsx 里面
registerTableRender('editable-cell-number', ({ text, field }: RenderProps) => {
  return ({ editing, mode, save }: AnyKeyProps) => {
    return !editing ? text : <InputNumber {...field.contentProps} onBlur={save} />
  }
})

// 使用时
{
  editable: true,
  renderType: 'editable-cell-number',
  // 补充额外参数，非必须
  contentProps: {
    min: 0,
    max: 999999
  }
}
```
