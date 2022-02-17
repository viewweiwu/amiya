# 新增编辑改侧边

```tsx
/**
 * title: 例子
 * desc: 尝试点击 `【新增】【编辑】【详情】` 按钮，会发现弹窗出现在右侧，以 Drawer 形式出现。
 */
import React from 'react'
import { AySearchTable, AyAction, AyCtrl, AySearchTableField } from 'amiya'
import { AyTableCtrlField } from 'amiya/lib/AyTable/ay-table'
import { listApi, addApi, updateApi, deleteApi, professionOptions } from '../api'

const fields: Array<AySearchTableField> = [
  {
    title: '头像',
    key: 'icon',
    width: 80,
    align: 'center',
    renderType: 'image',
    props: {
      width: 70
    }
  },
  {
    title: '姓名',
    key: 'cn',
    search: true,
    dialog: {
      required: true
    },
    render: (text, record) => {
      return (
        <div>
          <div>{record.cn}</div>
          <div>{record.en}</div>
          <div>{record.jp}</div>
        </div>
      )
    }
  },
  {
    title: '英文名',
    key: 'en',
    search: true,
    required: true,
    table: false
  },
  {
    title: '日文名',
    key: 'jp',
    search: true,
    dialog: {
      required: true
    },
    table: false
  },
  {
    title: '初始HP',
    key: 'ori-hp',
    dialog: true
  },
  {
    title: '初始攻击',
    key: 'ori-atk',
    dialog: true
  },
  {
    title: '标签',
    key: 'tags',
    renderType: 'tags',
    colorMap: {
      治疗: 'green',
      输出: 'red',
      爆发: 'orange',
      群攻: 'blue',
      生存: 'cyan',
      费用回复: 'gold',
      防护: 'purple',
      新手: 'geekblue',
      减速: 'lime',
      控场: 'red'
    }
  },
  {
    title: '描述',
    key: 'des',
    width: 200
  }
]

const ctrl: AyTableCtrlField = {
  width: 200,
  render: (value, record) => {
    return (
      <AyCtrl>
        <AyAction record={record} action="update">
          编辑
        </AyAction>
        <AyAction record={record} action="delete">
          删除
        </AyAction>
        <AyAction record={record} action="view">
          详情
        </AyAction>
      </AyCtrl>
    )
  }
}

export default function Demo() {
  return (
    <AySearchTable
      title="表格标题"
      selectionType="checkbox"
      api={listApi}
      fields={fields}
      ctrl={ctrl}
      rowKey="sort_id"
      deleteApi={deleteApi}
      dialogFormExtend={{
        drawer: true,
        fields: fields,
        updateApi,
        addApi
      }}
    >
      <AyAction action="batch-delete">批量删除</AyAction>
      <AyAction action="add">新增</AyAction>
    </AySearchTable>
  )
}
```

```html
<AySearchTable dialogFormExtend={{ drawer: true }} />
```
