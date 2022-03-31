# 审批

复杂程度：⭐️

<Badge>AyDialogForm</Badge>

此页面列举了各种按钮审批的形式，提交的数据可以打开 `console` 查看。

## 简易审批

如果只需要确认，那可以非常简单。

<code src="./page/quick.tsx" />

## 双按钮

单独放置两个按钮 —— 拒绝与通过，提交时需要补充审批类型(或者 ID)，可用 `beforeSubmit` 混入。

<code src="./page/index.tsx" />

## 单按钮

打开弹窗后让用户主动选择。

<code src="./page/one.tsx" />

## 单按钮 2

审批按钮放在弹窗下方的。

`拒绝` 是弹窗底部额外的按钮，需要点击时通过 `formRef.current.submit()` 触发表单提交。

必填校验此时是通过 `formRef.current.getFieldValue('reason')` 手动获取值后处理的。

<code src="./page/bottom.tsx" />
