import classnames from 'classnames'
import React, { useState, ReactNode, useContext, useEffect } from 'react'
import { Form, FormItemProps, Popover, PopoverProps, Space, Typography } from 'antd'
import { getKey } from '../utils'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { EditableContext } from './context'
import { LoadingOutlined, InfoCircleFilled } from '@ant-design/icons'

const { Text } = Typography

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

interface RuleFormItemProps {
  inputProps: any
  input: JSX.Element
  errorList: JSX.Element
  extra: JSX.Element
  popoverProps?: PopoverProps
}

const RuleFormItem = ({ inputProps, input, extra, popoverProps }: RuleFormItemProps) => {
  const [visible, setVisible] = useState<boolean | undefined>(false)
  const [errorStringList, setErrorList] = useState<string[]>([])

  useEffect(() => {
    if (inputProps.validateStatus !== 'validating') {
      setErrorList(inputProps.errors)
    }
  }, [inputProps.errors, inputProps.validateStatus])

  return (
    <Popover
      key="popover"
      trigger="focus"
      placement="topRight"
      visible={errorStringList.length < 1 ? false : visible}
      onVisibleChange={value => {
        if (value !== visible) {
          setVisible(value)
        }
      }}
      content={
        <div className="ay-form-item-with-help">
          {inputProps.validateStatus === 'validating' ? <LoadingOutlined /> : null}
          {errorStringList.map(text => (
            <div key={text}>
              <Text type="danger">
                <Space>
                  <InfoCircleFilled />
                  {text}
                </Space>
              </Text>
            </div>
          ))}
        </div>
      }
      {...popoverProps}
    >
      <div>
        {input}
        {extra}
      </div>
    </Popover>
  )
}

export function EditableCell(props: AnyKeyProps) {
  const { field, record, children, tableData, setTableData, rowKey, tableProps, ...restProps } = props
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
    // @ts-ignore 重新构建数组
    const newTableData = [...tableData]
    // 寻找到对应行
    const index = newTableData.findIndex(row => getKey(row, tableProps.rowKey) === getKey(newRow, tableProps.rowKey))
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
        <Form.Item name={field.key} style={{ margin: '-5px 0' }} {...field.formItemProps}>
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
  const { field, record, children, tableData, setTableData, tableProps, ...restProps } = props
  const form = useContext(EditableContext)
  const editing = record?.editing || false
  let tag: ReactNode

  useEffect(() => {
    if (editing) {
      // 设置表单数据
      form.setFieldsValue({ ...record })
    }
  }, [editing])

  const handleSave = async () => {
    // 获取表单数据
    const values = await form.validateFields()
    // 将表单数据与行数据合并
    const newRow = { ...record, ...values }
    // 重新构建数组
    const newTableData = [...tableData]
    // 寻找到对应行
    const index = newTableData.findIndex(row => getKey(row, tableProps.rowKey) === getKey(newRow, tableProps.rowKey))
    // 替换行
    newTableData.splice(index, 1, newRow)
    // 替换表格数据
    setTableData(newTableData)
  }

  let cell = children[1]

  if (cell && typeof cell === 'function') {
    // 获取表格
    const cellTag = cell({ editing, form, mode: 'row' })
    if (editing) {
      tag = (
        <Form.Item
          hasFeedback
          _internalItemRender={{
            mark: 'pro_table_render',
            render: (
              inputProps: FormItemProps & {
                errors: any[]
              },
              doms: {
                input: JSX.Element
                errorList: JSX.Element
                extra: JSX.Element
              }
            ) => <RuleFormItem inputProps={inputProps} {...doms} popoverProps={field.popoverProps} />
          }}
          name={field.key}
          style={{ margin: '-5px 0' }}
          {...field.formItemProps}
        >
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
