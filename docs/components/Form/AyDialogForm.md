# AyDialogForm

<code src="./AyDialogFormDemo.tsx" />

## Props

| 方法名       | 说明                                                    | 可选值                                                     | 默认值 |
| ------------ | ------------------------------------------------------- | ---------------------------------------------------------- | ------ |
| title        | 标题, add 模式下默认是“新增”, update 模式下默认是“编辑” | string                                                     | -      |
| name         | 弹窗名字，一般不需要设置                                | string                                                     | -      |
| width        | 弹窗宽度                                                | number                                                     | -      |
| span         | 每个 Field 所占的 span 值                               | number                                                     | 24     |
| fields       | 表单项，跟 AyForm 一致                                  | Array[AyFormField]                                         | -      |
| addApi       | 进入修改模式                                            | Promise                                                    | -      |
| updateApi    | 进出详情模式                                            | Promise                                                    | -      |
| beforeSubmit | 表单的提交前校验                                        | (params?: AnyKeyProps, mode?: string) => boolean \| obejct | -      |
| dialogOnly   | 是否只使用申明了 dialog 的 Field                        | boolean                                                    | false  |
| dialogExtend | [AyDialog](../ay-dialog#参数) 的扩展值                  | object                                                     | -      |
| formExtend   | [AyForm](../form#props-参数) 的扩展值                   | object                                                     | -      |
| autoClose    | 成功后是否自动关闭弹窗                                  | boolean                                                    | true   |
| drawer       | 是否用 Drawer 替换 Modal                                | boolean                                                    | false  |

## Method

| 方法名                         | 说明                                                      | 使用案例                                       |
| ------------------------------ | --------------------------------------------------------- | ---------------------------------------------- |
| add                            | 进入新增模式                                              | formRef.current.add(record: Record, config)    |
| update                         | 进入修改模式                                              | formRef.current.update(record: Record, config) |
| view                           | 进入详情模式                                              | formRef.current.view(record: Record, config)   |
| closeDialog                    | 关闭弹窗                                                  | formRef.current.view(record: Record)           |
| getFormRef                     | 获取里面嵌套的 AyForm 的对象，可以调用 AyForm 的一些方法  | formRef.current.getFormRef()                   |
| refreshFields                  | 刷新 form 的列                                            | formRef.current.refreshFields()                |
| submit()                       | 主动提交表单                                              | -                                              |
| resetFields()                  | 重置表单                                                  | -                                              |
| getFieldValue(key: string)     | 根据 key 获取表单值                                       | any                                            |
| getFieldsValue()               | 获取所有表单值                                            | values: Object                                 |
| getFormatFieldsValue()         | 获取已经过滤后的表单值，当有嵌套时使用                    | values: Object                                 |
| setFieldsValue(values: Object) | 设置表单值                                                | -                                              |
| refreshFields()                | 重新渲染表单，如果动态改变了 fields，可以用此参数重新渲染 | -                                              |

## config

| 参数      | 说明                       | 返回值                                               |
| --------- | -------------------------- | ---------------------------------------------------- |
| onSuccess | 成功回调，可见下方具体说明 | ({ data, values, params, initParams, closeDialog })  |
| onError   | 失败回调，可见下方具体说明 | ({ error, values, params, initParams, closeDialog }) |

## config 返回值

| 参数        | 说明             | 类型                   |
| ----------- | ---------------- | ---------------------- |
| data        | 请求成功的返回值 | obejct                 |
| error       | 请求失败的返回值 | 接口返回什么就返回什么 |
| values      | 表单的提交数据   | obejct                 |
| params      | 接口请求的数据   | obejct                 |
| initParams  | 请求的默认数据   | object                 |
| closeDialog | 关闭弹窗的方法   | function               |
