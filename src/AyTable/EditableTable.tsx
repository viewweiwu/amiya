import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react'
import { Form } from 'antd'
import { AnyKeyProps } from '../types/AnyKeyProps'

const EditableContext = createContext<any>(null)

export function EditableRow({ index, ...props }: AnyKeyProps) {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} className={`editable-row ${props.className || ''}`} />
      </EditableContext.Provider>
    </Form>
  )
}

export function EditableCell(props: AnyKeyProps) {
  const { field, record, children, tableData, setTableData, ...restProps } = props
  const [editing, setEditing] = useState<boolean>(false)
  const form = useContext(EditableContext)
  let tag: ReactNode

  const toggleEdit = () => {
    setEditing(!editing)
  }

  const handleSave = async () => {
    // 获取表单数据
    const values = await form.validateFields()
    // 将表单数据与行数据合并
    const newRow = { ...record, ...values }
    // 重新构建数组
    const newTableData = [...tableData]
    // 寻找到对应行
    const index = newTableData.findIndex(row => row.id === newRow.id)
    // 替换行
    newTableData.splice(index, 1, newRow)
    // 替换表格数据
    setTableData(newTableData)
    // 取消编辑模式
    setEditing(false)
  }

  useEffect(() => {
    if (editing) {
      // 设置表单数据
      form.setFieldsValue({ [field.key]: record[field.key] })
    }
  }, [editing])

  let cell = children[1]

  if (cell && typeof cell === 'function') {
    // 获取表格
    const cellTag = cell({ editing, save: handleSave, toggleEdit, form })
    // 不同状态下，包裹不同外部元素
    tag = editing ? (
      <Form.Item name={field.key} style={{ margin: 0 }} {...field.formItemProps}>
        {cellTag}
      </Form.Item>
    ) : (
      <div className="editable-cell" onClick={toggleEdit}>
        {cellTag}
      </div>
    )
  } else {
    if (!field) {
      // 普通的表格元素
      tag = children
    }
  }

  return <td {...restProps}>{tag}</td>
}

const components = {
  body: {
    row: EditableRow,
    cell: EditableCell
  }
}

export default components
