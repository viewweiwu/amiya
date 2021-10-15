# 注册自定义表单类型

## registerField

可以注册一个 FormType，供其它地方使用。

注册一个 FormType 总共需要 2 个步骤。

## 注册自定义类型表单项

1. 编写可控组件（CharaSelect.tsx）。
2. 注册成为 FormType（amiya-init.tsx）。

<code src="./RegisterFieldDemo.tsx" />

## 参数详解

```js
/**
 * @param FormType 表单项 type
 * @param DefaultValue 表单项默认值
 * @param render 渲染表单项，看下方 render 函数参数
 */
/**
 * @desc render 函数参数
 * @desc render 出来组件需要支持组件受控
 * @param field 当前表单项
 * @param setFieldsValue 设置表单值，AyForm 的 setFieldsValue
 * @param getFieldValue 获取某个表单项的值
 * @param readonly 是否只读
 * @param formInstans 可以调用表单方法
 * @returns ReactNode
 */
registerField(FormType, {
  type: FormType,
  defaultValue: DefaultValue,
  render: ({ field, readonly, getFieldValue }: AnyKeyProps) => {
    // 可以在 readonly 模式下，渲染成不同的样子
    return readonly ? (
      <span className="ay-form-text">{getFieldValue(field.key) || '-'}</span>
    ) : (
      <Component
        placeholder={`请输入${field.title || ''}`}
        { // 这里可以设置一些默认属性 }
        {...field.props}
      />
    )
  }
})

/**
 * @desc 如果自定义组件默认就支持 readoly 模式，写法可以更加简洁
 */
registerField(FormType, {
  type: FormType,
  defaultValue: DefaultValue,
  render: ({ field, readonly }: AnyKeyProps) => {
    // 可以在 readonly 模式下，渲染成不同的样子
    return <Component readonly={readonly} {...field} />
  }
})
```
