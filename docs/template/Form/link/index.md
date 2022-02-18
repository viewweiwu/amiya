# 联动表单项

<Badge>AyForm</Badge>

1. 可使用 `hidden` 来控制表单元素是否展示。
2. 设置了 `hidden` 后，提交时仍会把值带上。
3. 设置了 `hidden` 后，这一项的必填会失效。
4. 可定义一个 `State`，监听表单元素的 `onChange` 变化，取其 `value` 值设置 `State` 值，然后用 `State` 控制 `hidden` 属性。
5. 可使用 `setFieldsValue` 来控制其它元素的值，比如用来设置默认值。

<code src="./page/index.tsx" />
