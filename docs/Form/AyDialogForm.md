# AyDialogForm

<code src="./AyDialogFormDemo.tsx" />

## Props

| 方法名       | 说明                             | 可选值                                                     | 默认值 |
| ------------ | -------------------------------- | ---------------------------------------------------------- | ------ |
| width        | 弹窗宽度                         | number                                                     | -      |
| span         | 每个 Field 所占的 span 值        | number                                                     | 24     |
| fields       | 表单项，跟 AyForm 一致           | Array[AyFormField]                                         | -      |
| addApi       | 进入修改模式                     | Promise                                                    | -      |
| updateApi    | 进出详情模式                     | Promise                                                    | -      |
| beforeSubmit | 表单的提交前校验                 | (params?: AnyKeyProps, mode?: string) => boolean \| obejct | -      |
| dialogOnly   | 是否只使用申明了 dialog 的 Field | boolean                                                    | false  |
| dialogExtend | AyDialog 的扩展值                | object                                                     | -      |
| formExtend   | AyForm 的扩展值                  | object                                                     | -      |

## Method

| 方法名        | 说明                                                     | 使用案例                               |
| ------------- | -------------------------------------------------------- | -------------------------------------- |
| add           | 进入新增模式                                             | formRef.current.add(record: Record)    |
| update        | 进入修改模式                                             | formRef.current.update(record: Record) |
| view          | 进入详情模式                                             | formRef.current.view(record: Record)   |
| getFormRef    | 获取里面嵌套的 AyForm 的对象，可以调用 AyForm 的一些方法 | formRef.current.getFormRef()           |
| refreshFields | 刷新 form 的列                                           | formRef.current.refreshFields()        |
