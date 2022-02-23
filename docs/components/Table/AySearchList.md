---
toc: false
---

# AySearchList 查询列表

## 卡片布局

<code src="./AySearchListDemo">

## JSX / TSX 语法糖 <Badge>0.41.0</Badge>

<code src="./AySearchListDemoTsx">

```diff
-const fields: Array<AySearchTableField> = [
-  {
-    title: '英文名',
-    key: 'en',
-    search: true,
-    dialog: {
-      required: true,
-      rules: [{ pattern: /^[a-z|A-Z|0-9]{1,}$/, message: '请输入字母或者数字' }]
-    }
-  },
-  {
-    title: '中文名',
-    key: 'cn',
-    search: true,
-    dialog: {
-      required: true
-    }
-  },
-  {
-    title: '职业',
-    key: 'class',
-    type: 'select',
-    search: true,
-    dialog: true,
-    options: professionOptions
-  },
-  {
-    title: '描述',
-    type: 'textarea',
-    key: 'des',
-    dialog: true
-  }
-]

return (
  <AySearchList
    title="列表标题"
    selectionType="checkbox"
    api={listApi}
-   fields={fields}
    ctrl={ctrl}
    renderItem={(record: AnyKeyProps, index: number) => {
      let starMap: AnyKeyProps = {
        5: '⭐️⭐️⭐️⭐️⭐️⭐️',
        4: '⭐️⭐️⭐️⭐️⭐️',
        3: '⭐️⭐️⭐️⭐️',
        2: '⭐️⭐️⭐️',
        1: '⭐️⭐️',
        0: '⭐️'
      }
      return (
        <List.Item
          key={record.sort_id}
          actions={[
            <AyCtrl>
              <AyAction record={record} action="view">
                详情
              </AyAction>
              <AyAction record={record} action="update">
                编辑
              </AyAction>
              <AyAction record={record} action="delete">
                删除
              </AyAction>
            </AyCtrl>
          ]}
        >
          <List.Item.Meta
            avatar={<Avatar src={record.icon} size="large" />}
            title={
              <Space>
                {record.cn} {starMap[record.rarity]}
              </Space>
            }
            description={record.des || '暂时没有描述。'}
          />
          <div>{record.moredes || '暂时没有干员信息。'}</div>
        </List.Item>
      )
    }}
    dialogFormExtend={{
-     fields: fields,
      updateApi,
      addApi
    }}
  >
+    <AyFields>
+      <AyField
+        title="英文名"
+        key="en"
+        search
+        dialog={{ required: true, rules: [{ pattern: /^[a-z|A-Z|0-9]{1,}$/, message: '请输入字母或者数字' }] }}
+      />
+      <AyField title="中文名" key="cn" search dialog={{ required: true }} />
+      <AyField title="职业" key="class" type="select" search dialog options={professionOptions} />
+      <AyField title="职描述业" key="des" type="textarea" dialog />
    </AyFields>
    <AyAction action="batch-delete">批量删除</AyAction>
    <AyAction action="add">新增</AyAction>
  </AySearchList>
)
```

只是换了另一种风格写 `fields` 而已，请不要用其它元素包裹住 `AyFields` 和 `AyField`。

## 卡片布局 & tag 查询

<code src="./AySearchListCardDemo">

## AySearchList.Selection <Badge>0.50.0</Badge>

可以在 `renderItem` 时将 `AySearchList.Selection` 插在任意位置，让列表拥有勾选的功能，`v0.50.0` 只支持多选。

```diff
  <AySearchList
    title="列表标题"
+   selectionType="checkbox"
+   selectShowKey="cn"
    api={listApi}
    fields={fields}
    ctrl={ctrl}
    renderItem={(record: AnyKeyProps, index: number) => {
      let starMap: AnyKeyProps = {
        5: '⭐️⭐️⭐️⭐️⭐️⭐️',
        4: '⭐️⭐️⭐️⭐️⭐️',
        3: '⭐️⭐️⭐️⭐️',
        2: '⭐️⭐️⭐️',
        1: '⭐️⭐️',
        0: '⭐️'
      }
      return (
        <List.Item key={record.sort_id}>
+         <AySearchList.Selection record={record} >
          <List.Item.Meta
            avatar={<Avatar src={record.icon} size="large" />}
            title={
              <Space>
                {record.cn} {starMap[record.rarity]}
              </Space>
            }
            description={record.des || '暂时没有描述。'}
          />
          <div>{record.moredes || '暂时没有干员信息。'}</div>
        </List.Item>
      )
    }}
  />
)
```

因为跟 AySearchTable 大部分 Api 相同，可参考 [AySearchTable](../table#参数) 文档
