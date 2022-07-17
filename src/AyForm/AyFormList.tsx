import React, { useEffect, useState } from 'react'
import { AySearchTableField } from '../AySearchTable/ay-search-table'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { Button, Form, Space, Tooltip } from 'antd'
import { AyFormField, AyFormProps } from './ay-form'
import locale from '../locale'
import { PlusOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons'
import { FORM_TYPE_LIST } from '../constant'

interface AyFormListProps {
  field: AyFormField
  formInstant: AnyKeyProps
  ayFormProps: AyFormProps
  getFormItem: (
    fields: Array<AyFormField | AySearchTableField>,
    formInstans: AnyKeyProps,
    props: AyFormProps,
    childrenType?: 'group' | 'card' | 'input-group' | 'list'
  ) => React.ReactNode
}

export default function AyFormList(props: AyFormListProps) {
  const { field, getFormItem, formInstant, ayFormProps } = props
  const { readonly } = ayFormProps

  // 最少行 & 最大行
  const { min = 0, max = Infinity } = field
  // 当前行数
  const [recordNum, setRecordNum] = useState(0)

  useEffect(() => {
    setRecordNum(formInstant.getFieldValue(field.key).length)
  }, [])

  /**
   * 复制这行数据到末尾
   * @param name 实际上是当前行 index
   */
  const handleCopy = (name: number) => {
    try {
      let value = formInstant.getFieldValue(field.key)
      let newValue = [...value, value[name]]
      setRecordNum(newValue.length)
      formInstant.setFieldsValue({ [field.key || '']: newValue })
    } catch {
      console.error('复制失败')
    }
  }

  /**
   * 删除这行数据
   * @param name 实际上是当前行 index
   * @param remove 删除方法
   */
  const handleRemove = (name: number, remove: (name: number) => void) => {
    remove(name)
    setRecordNum(Number(recordNum) - 1)
  }

  /**
   * 新增一行
   * @param add 新增方法
   */
  const handleAdd = (add: (defaultValue?: any, insertIndex?: number | undefined) => void) => {
    add(field.creatorRecord || {})
    setRecordNum(Number(recordNum) + 1)
  }

  return (
    <Form.List {...field.props} name={field.key || field.label} key={field.key || field.label}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => {
            let children = field.children || []
            if (!Array.isArray(children)) {
              children = [children]
            }
            let content = getFormItem(
              children.map((child: AyFormField) => ({
                ...child,
                formItemProps: {
                  ...field.formItemProps,
                  ...restField,
                  name: [name, child.key]
                }
              })) as Array<AyFormField | AySearchTableField>,
              formInstant,
              ayFormProps,
              FORM_TYPE_LIST
            )
            return (
              <Space key={`${field.key}-${key}`} className="ay-form-list-item" align="end" {...field.spaceProps}>
                {content}
                {!readonly && (
                  <Space className="ay-form-list-actions">
                    {recordNum < max && (
                      <span className="ay-form-list-action" onClick={() => handleCopy(name)}>
                        <Tooltip title={locale.form.copyToEnd}>
                          <CopyOutlined />
                        </Tooltip>
                      </span>
                    )}

                    {recordNum > min && (
                      <span className="ay-form-list-action" onClick={() => handleRemove(name, remove)}>
                        <Tooltip title={locale.form.removeRow}>
                          <DeleteOutlined />
                        </Tooltip>
                      </span>
                    )}
                  </Space>
                )}
              </Space>
            )
          })}
          {recordNum < max && !readonly && (
            <Button type="dashed" onClick={() => handleAdd(add)} icon={<PlusOutlined />}>
              {locale.form.addItem}
            </Button>
          )}
        </>
      )}
    </Form.List>
  )
}
