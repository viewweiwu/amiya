import classnames from 'classnames'
import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react'
import { Form } from 'antd'
import { AnyKeyProps } from '../types/AnyKeyProps'

export const EditableContext = createContext<any>(null)

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
    const cellTag = cell({ editing, save: handleSave, toggleEdit, form, mode: 'col' })
    if (editing) {
      tag = (
        <Form.Item name={field.key} style={{ margin: 0 }} {...field.formItemProps}>
          {cellTag}
        </Form.Item>
      )
    } else {
      tag = (
        <div
          className={classnames('editable-cell', field?.editableCellClass)}
          style={field?.editableCellStyle}
          onClick={toggleEdit}
        >
          {cellTag}
        </div>
      )
    }
  } else {
    if (!field) {
      // 普通的表格元素
      tag = children
    }
  }

  // 前置元素
  const before = field?.before ? field.before({ record, field, refreshRow: handleSave }) : null
  // 后置元素
  const after = field?.after ? field.after({ record, field, refreshRow: handleSave }) : null

  return (
    <td {...restProps}>
      {before}
      {tag}
      {after}
    </td>
  )
}

export function EditableRowCell(props: AnyKeyProps) {
  const { field, record, children, tableData, setTableData, ...restProps } = props
  const form = useContext(EditableContext)
  const editing = record?.editing || false
  let tag: ReactNode

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
  }

  let cell = children[1]

  if (cell && typeof cell === 'function') {
    if (editing) {
      // 设置表单数据
      form.setFieldsValue({ ...record })
    }
    // 获取表格
    const cellTag = cell({ editing, form, mode: 'row' })
    if (editing) {
      tag = (
        <Form.Item name={field.key} style={{ margin: 0 }} {...field.formItemProps}>
          {cellTag}
        </Form.Item>
      )
    } else {
      tag = <div className="editable-row-cell">{cellTag}</div>
    }
  } else {
    if (!field) {
      // 普通的表格元素
      tag = children
    }
  }

  // 前置元素
  const before = field?.before ? field.before({ record, field, refreshRow: handleSave }) : null
  // 后置元素
  const after = field?.after ? field.after({ record, field, refreshRow: handleSave }) : null

  return (
    <td {...restProps}>
      {before}
      {tag}
      {after}
    </td>
  )
}

const ColEditComponents = {
  body: {
    row: EditableRow,
    cell: EditableCell
  }
}

const RowEditComponents = {
  body: {
    row: EditableRow,
    cell: EditableRowCell
  }
}

export const getComponents = (type?: 'row' | 'col') => {
  if (type === 'row') {
    return RowEditComponents
  } else if (type === 'col') {
    return ColEditComponents
  }
}
