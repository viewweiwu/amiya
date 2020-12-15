import { ReactNode, Dispatch, SetStateAction } from 'react'
import { TABLE_CTRL_KEY } from '../constant'
import { AyTableField } from './ay-table'
import { AnyKeyProps } from '../types/AnyKeyProps'
import './ay-table.less'

export const install = (renderMap: AnyKeyProps) => {
  /**
   * 转化获得 field
   * @param field table Field
   * @param params 查询参数
   * @param tableData 表格数据
   * @param setTableData 设置表格数据
   */
  const getAyTableField = (
    field: AnyKeyProps,
    params: AnyKeyProps,
    tableData: Array<AnyKeyProps>,
    setTableData: Dispatch<SetStateAction<Array<AnyKeyProps>>>
  ) => {
    let tableField: AnyKeyProps = {
      key: field.key,
      dataIndex: field.key,
      ...field,
      title: field.__alias || field.title
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
      if (field.sortOrder) {
        tableField.sorter = field.sorter || { multiple: field.sortOrder }
      } else {
        tableField.sorter = true
      }
      delete tableField.sort
      delete tableField.sortOrder
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
          setTableData
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
   */
  const getAyTableFields = (
    fields: Array<any>,
    params: AnyKeyProps,
    tableData: Array<AnyKeyProps>,
    setTableData: Dispatch<SetStateAction<Array<AnyKeyProps>>>,
    ctrl?: AyTableField
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
        return getAyTableField(field, params, tableData, setTableData)
      })

    if (ctrl && ctrl.render && tableFields.every(field => field.key !== 'ctrl')) {
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

    //
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
