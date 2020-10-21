# Filed 参数详解

此处列举了所有 fields 需要用到的参数。

## FormType

FormType 是指写 field 时候的 type 的可选项。
在系统里面预置了下面几种表单类型。如果要自定义类型，请参考 registerField。

```typescript
const fields: Array<Field> = [
  {
    type: 'input' // FormType 指此处可选的值
  }
]
```

<hr/>

| 值类型         | 说明                                                     | 默认值    |
| -------------- | -------------------------------------------------------- | --------- |
| input          | 输入框，默认字符长度 30                                  | ''        |
| number         | 数字输入框，0 ～ 99999999                                | null      |
| percent        | 百分比输入框，0 ～ 100                                   | null      |
| password       | 密码输入框                                               | ''        |
| textarea       | 多行输入框，默认字符长度 200                             | ''        |
| select         | 选择框                                                   | undefined |
| switch         | 开关                                                     | false     |
| checkbox       | 多选框（单个）                                           | false     |
| checkbox-group | 多选框（多个）                                           | []        |
| radio-group    | 单选框（多个）                                           | null      |
| date           | 日期                                                     | undefined |
| date-range     | 日期区间                                                 | []        |
| empty          | 空白框                                                   | -         |
| custom         | 自定义 renderContent 使用，需要在同一层定义 defaultValue | -         |

## Field 参数

| 参数名  | 说明       | 参数类型                | 默认值  |
| ------- | ---------- | ----------------------- | ------- |
| title   | 标题       | string                  | -       |
| key     | 唯一 key   | string                  | -       |
| type    | 表单项类型 | [FormType][formtype]    | 'input' |
| options | 表格       | Array<[Option][option]> | -       |

## Option 参数

| 参数名   | 说明     | 参数类型         | 默认值 |
| -------- | -------- | ---------------- | ------ |
| label    | 显示选项 | string \| number | -      |
| value    | 值       | any              | -      |
| disabled | 是否禁用 | boolean          | -      |
| children | 子元素   | Array<Option\>   | -      |

## AyFormField 参数

| 参数名        | 说明                                                       | 参数类型                                                               | 默认值  |
| ------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- | ------- |
| title         | 相应的 key，会跟最后表单取到的项目相关; form 的 key 值必填 | string                                                                 | -       |
| key           | 唯一 key                                                   | string                                                                 | -       |
| type          | 表单项类型                                                 | [FormType][formtype]                                                   | 'input' |
| options       | 表格                                                       | Array<[Option][option]>                                                | -       |
| span          | Grid Col 占位 [0 - 24]                                     | number                                                                 | -       |
| defaultValue  | 默认值                                                     | any                                                                    | -       |
| required      | 是否必填                                                   | boolean                                                                | -       |
| rules         | 自定义权限                                                 | rules                                                                  | -       |
| visible       | 是否展示，保留占位; 保留默认值                             | rules                                                                  | -       |
| hidden        | 是否展示，不会占位; 保留默认值                             | boolean \| Function                                                    | -       |
| props         | 原生的属性                                                 | Object                                                                 | -       |
| formItemProps | FormItem 层原生的属性                                      | Object                                                                 | -       |
| renderContent | 自定义 content 内容，需要指定 type: 'custom'               | (field: AyFormField, record: Record) => ReactNode                      | -       |
| onChange      | 数据变化监听                                               | (field: AyFormField, record: Record, setFieldsValue: Function) => void | -       |
| help          | 在表单下会有一段提示文字                                   | string \| ReactNode                                                    | -       |
| startKey      | 时间格式化的开始时间                                       | string                                                                 | -       |
| endKey        | 时间格式化的结束时间                                       | string                                                                 | -       |
| reSetting     | 重新渲染                                                   | (params: AyFormField, mode: string) => AyFormField                     | -       |
| order         | 顺序                                                       | number                                                                 | -       |

## AyTableField

一般情况下不会用到这个 AyTableField，它寄生与 AySearchTableField，所以请不要单独使用。

| 参数名     | 说明                                 | 参数类型                                                           | 默认值 |
| ---------- | ------------------------------------ | ------------------------------------------------------------------ | ------ |
| title      | 标题                                 | string                                                             | -      |
| key        | 唯一 key，dataIndex 默认会跟次值一样 | string                                                             | -      |
| options    | 唯一 key，dataIndex 默认会跟次值一样 | Array<[Option][option]>                                            | -      |
| hidden     | 隐藏这一列                           | boolean                                                            | -      |
| render     | 自定义展示列                         | (text: ReactNode, record: AnyKeyProps, index: number) => ReactNode | -      |
| renderType | 美化展示列                           | 'tag'                                                              | -      |

## AySearchTableField

最为常见的 Field，是每个列表页面都会用到的参数。

```typescript
const fields: Array<AySearchTableField> = [
  {
    title: '', // 表格、查询、编辑 的标题
    key: '', // 表格、查询、编辑 的 key
    type: '', // 表格、查询、编辑 的 FormType
    options: [], // 表格、查询、编辑 的  选项
    // 定义在此处的优先级更高，如果没有，则使用外层的参数
    search: {
      title: '',
      key: '',
      type: '',
      options: []
    },
    // 定义在此处的优先级更高，如果没有，则使用外层的参数
    dialog: {},
    // 定义在此处的优先级更高，如果没有，则使用外层的参数
    table: {}
  }
]
```

<hr />

| 参数名  | 说明                                                            | 参数类型                   | 默认值  |
| ------- | --------------------------------------------------------------- | -------------------------- | ------- |
| title   | 名称                                                            | string                     | -       |
| key     | 唯一 key                                                        | string                     | -       |
| type    | 表单类型                                                        | [FormType][formtype]       | 'input' |
| options | 可选项                                                          | Array<[Option][option]>    | -       |
| search  | AySearch 需要的扩展参数，里面的属性比外面的属性优先级更高。     | [AyFormField][ayformfield] | -       |
| dialog  | AyDialogForm 需要的扩展参数，里面的属性比外面的属性优先级更高。 | [AyFormField][ayformfield] | -       |
| table   | AyTable 需要的扩展参数，里面的属性比外面的属性优先级更高。      | AyTableField               | -       |

[formtype]: ./filed%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3#formtype
[option]: ./filed%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3#option-%E5%8F%82%E6%95%B0
[ayformfield]: ./filed%E5%8F%82%E6%95%B0%E8%AF%A6%E8%A7%A3#ayformfield-%E5%8F%82%E6%95%B0
