import React from 'react'
import { ReactNode, Dispatch, SetStateAction } from 'react'
import { TABLE_CTRL_KEY } from '../constant'
import { AyTableField } from './ay-table'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { Tooltip } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'
import './ay-table.less'

export const install = (renderMap: AnyKeyProps) => {
  /**
   * 转化获得 field
   * @param field table Field
   * @param params 查询参数
   * @param tableData 表格数据
   * @param setTableData 设置表格数据
   * @param props 表格属性
   */
  const getAyTableField = (
    field: AnyKeyProps,
    params: AnyKeyProps,
    tableData: Array<AnyKeyProps>,
    setTableData: Dispatch<SetStateAction<Array<AnyKeyProps>>>,
    props?: AnyKeyProps
  ) => {
    // 支持 tooltip 属性
    let title = field.__alias || field.title
    if (field.tooltip) {
      title = (
        <span>
          {title}
          <Tooltip placement="top" title={field.tooltip}>
            <QuestionCircleOutlined style={{ marginLeft: 4 }} />
          </Tooltip>
        </span>
      )
    }

    let tableField: AnyKeyProps = {
      key: field.key,
      dataIndex: field.key,
      ...field,
      title
    }
    if (field.render) {
      tableField.render = field.render
    }

    if (Array.isArray(field.children)) {
      field.children = field.children.map(field => {
        return getAyTableField(field, params, tableData, setTableData)
      })
    }

    // options 自动注册
    if (field.options && !field.render && !tableField.renderType) {
      tableField.renderType = '__options'
    }

    // 处理筛选
    if (field.filter && field.options) {
      tableField.filters = field.filters || JSON.parse(JSON.stringify(field.options).replace(/"label"/g, '"text"'))
      tableField.filteredValue = params.filters[field.key]
      field.filterMultiple = field.filterMultiple || false
    }

    // 处理排序
    if (field.sort) {
      let sorts = params.sorts
      // 寻找在 params 存在的排序
      let sortItem = sorts.find((item: AnyKeyProps) => item.key === field.key)
      if (!sortItem) {
        // 不存在直接清空
        tableField.sortOrder = false
      } else {
        // 存在排序，则值为设置后的排序
        tableField.sortOrder = sortItem.order
      }
      tableField.sorter = field.sorter || { multiple: field.sortOrder }
    }

    // 多余显示 ...
    if (field.ellipsis) {
      tableField.ellipsis = {
        showTitle: false
      }
      tableField.renderType = '__ellipsis'
    }

    // 处理可编辑行
    if (field.editable) {
      tableField.renderType = field.renderType ? field.renderType : 'editable-cell-input'
      tableField.onCell = (record: AnyKeyProps) => {
        return {
          record,
          field: field,
          tableData,
          setTableData,
          tableProps: props
        }
      }
    }

    if (
      !tableField.render &&
      renderMap[tableField.renderType] &&
      typeof renderMap[tableField.renderType] === 'function'
    ) {
      tableField.render = (text: ReactNode, record: AnyKeyProps, index: number) => {
        return renderMap[tableField.renderType]({ text, record, index, field: tableField })
      }
    }
    return tableField
  }

  /**
   * 重新过滤配置项
   * @param fields 配置项目
   * @param params 查询参数
   * @param tableData 表格数据
   * @param setTableData 设置表格数据
   * @param ctrl 操作列
   * @param props 表格属性
   */
  const getAyTableFields = (
    fields: Array<any>,
    params: AnyKeyProps,
    tableData: Array<AnyKeyProps>,
    setTableData: Dispatch<SetStateAction<Array<AnyKeyProps>>>,
    ctrl?: AyTableField,
    props?: AnyKeyProps
  ): Array<AyTableField> => {
    let tableFields = fields
      .filter(field => {
        if (field.__extraTouched) {
          return field.__hidden === false
        }
        if (typeof field.hidden === 'function') {
          return field.hidden()
        }
        return field.hidden !== true
      })
      .map(field => {
        return getAyTableField(field, params, tableData, setTableData, props)
      })

    // 保证操作列在最后
    if (ctrl && ctrl.render && tableFields.every(field => field.key !== TABLE_CTRL_KEY)) {
      ctrl.key = TABLE_CTRL_KEY
      ctrl.title = ctrl.title || '操作'
      ctrl.order = 999
      ctrl.__order = 999
      tableFields.push(ctrl)
    }
    // 排序
    tableFields = tableFields.sort((a: AyTableField, b: AyTableField) => {
      return a.order - b.order
    })

    // 二次排序
    if (tableFields.some(field => field.__extraTouched)) {
      tableFields = tableFields.sort((a: AyTableField, b: AyTableField) => {
        return (a.__order || 0) - (b?.__order || 0)
      })
    }

    return tableFields
  }

  return {
    getAyTableField,
    getAyTableFields
  }
}

export default {
  install
}
