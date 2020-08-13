/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useRef, MutableRefObject, ReactElement, createContext, forwardRef, useImperativeHandle, Ref, ReactNode } from 'react'
import AmSearch from '../AmSearch'
import AmTable from '../AmTable'
import AmDialogForm, { AmDialogFormProps } from '../AmDialogForm'
import { FormRefProps, TableRefProps, AmSearchTableField, Row } from './am-search-table'
import useSelection from './use/useSelection'
import useDirective from './use/useDirective'
import { isObj } from '../utils'
import './am-search-table.less'
import { AmDialogFormField } from '../AmDialogForm/am-dialog-form'
import { getDefaultValue } from '../AmForm'
import { Option } from '../AmForm/am-form'
import { AmTableCtrlField, AmTableField } from '../AmTable/am-table'

export const AmSearchTableContext = createContext({})

interface AmSearchTableProps {
  /** route 的 meta 元素，主要取其 title 属性 */
  meta?: {
    title: string
  }
  /** 配置项 */
  fields: Array<AmSearchTableField>
  /** 子元素 */
  children?: Array<ReactElement> | ReactElement
  /** 请求列表接口 */
  api?(params: AnyKeyProps): Promise<AnyKeyProps>
  /** 删除接口 Api */
  deleteApi?(params: Array<string>): Promise<any>
  /** 表格数据（当不需要 api，由自己控制时使用） */
  data?: Array<AnyKeyProps>
  /** 表格操作列（写法跟正常的 filed 一致） */
  ctrl?: AmTableCtrlField
  /** 为空时表示没有选框 */
  selectionType?: 'checkbox' | 'radio'
  /** 选项改变事件 */
  onSelectionChange?(selection: Array<Row>): void
  /** 列表的 rowKey */
  rowKey?: string
  /** 选择时列表展示的 key */
  selectShowKey?: string
  /** dialog form 的配置 */
  dialogFormExtend?: AmDialogFormProps
  /** 弹窗表单的配置项 */
  formField?: Array<AmDialogFormField>
  /** 滚动的 X 轴数值 */
  scrollX?: number
  /** 列表过滤 */
  filterData?(data: AnyKeyProps): AnyKeyProps
  /** 提交前过滤 */
  beforeSearch?(data: AnyKeyProps): AnyKeyProps
  /** 展开事件 */
  onExpand?(expanded: boolean, record: AnyKeyProps): void
  /** 分页参数 */
  pagination?: any
  /** 节点插入在查询和表格之间 */
  center?: ReactNode
  /** 表格查询完成监听 */
  onLoad?(records: Array<AnyKeyProps>, data: any): void
  /** 查询区域是否展示 */
  searchVisible?: boolean
  /** talbe 其它属性 */
  tableExtend?: AnyKeyProps
  /** 指令完成事件 */
  onFinish?(key: string, data?: any): void
  /** 导出文件 */
  downloadApi?(params: AnyKeyProps): Promise<AnyKeyProps>
  /** 在导入前面插入按钮 */
  btnBefore?: ReactNode
  /** 统计数据，放在导入按钮前面 */
  dataAnalysis?: Array<Option>
  /** 是否展示导出按钮 */
  exportVisible?: boolean
}

/**
 * 转化并过滤成 am-search 能用的 fields
 * @param fields 查询表格的 fields
 */
const getSearchFields = (fields: Array<AmSearchTableField>): Array<AmSearchField> => {
  return fields
    .filter((field: AmSearchTableField) => {
      return isObj(field.search)
    })
    .map((field: AmSearchTableField) => {
      const search = field.search
      if (!search) {
        return {
          title: '配置有误',
          key: 'xxx',
          type: 'input'
        }
      }
      let searchField: AmSearchField = {
        title: field.title,
        key: search.key || field.key || '',
        type: field.type || 'input',
        options: field.options || [],
        ...search
      }
      return searchField
    })
}

/**
 * 过滤获得配置项
 *
 * 1、生成基础 table 需要的 fields
 * 2、添加 options (如果有的话)
 *
 * @param fields 配置项
 */
const getTableFields = (fields: Array<AmSearchTableField>): Array<AmTableField> => {
  return fields.map((field: AmSearchTableField) => {
    const table = field.table
    let tableField: AmTableField = {
      title: field.title,
      key: field.key,
      ...table
    }
    if (field.options) {
      tableField.options = field.options
    }
    return tableField
  })
}

export default forwardRef(function AmSearchTable(props: AmSearchTableProps, ref: Ref<any>) {
  const {
    fields,
    api,
    deleteApi,
    children,
    data,
    meta,
    ctrl,
    selectionType,
    onSelectionChange,
    rowKey,
    dialogFormExtend,
    scrollX,
    filterData,
    beforeSearch,
    selectShowKey,
    onExpand,
    center,
    onLoad,
    searchVisible,
    tableExtend,
    pagination,
    onFinish,
    btnBefore,
    dataAnalysis,
    exportVisible
  } = props

  /** form 控制 */
  const formRef: MutableRefObject<FormRefProps> = useRef() as MutableRefObject<FormRefProps>
  /** table 控制 */
  const tableRef: MutableRefObject<TableRefProps> = useRef() as MutableRefObject<TableRefProps>
  /** search 控制 */
  const searchRef: MutableRefObject<TableRefProps> = useRef() as MutableRefObject<TableRefProps>
  /** 查询项 */
  const searchFields: Array<AmSearchField> = getSearchFields(fields)
  /** 列表项 */
  const tableFields: Array<AmTableField> = getTableFields(fields)
  /** 使用勾选 */
  const { header, rowSelection, selection, clearSelection } = useSelection({
    rowKey: rowKey || 'id',
    selectionType,
    onSelectionChange,
    selectShowKey
  })
  /** 使用指令操作 */
  const [newChildren, newCtrl] = useDirective({
    children,
    tableRef,
    formRef,
    selection,
    ctrl,
    deleteApi,
    clearSelection,
    rowKey,
    onFinish
  })

  /** 查询完成，刷新列表 */
  const onConfirm = (values: AnyKeyProps) => {
    tableRef.current.reset(values)
  }

  /** 暴露方法 */
  useImperativeHandle(ref, () => ({
    /**
     * 刷新页面
     */
    refresh() {
      tableRef.current.refresh()
    },
    /**
     * 回到第一页，刷新页面
     */
    reset(search: AnyKeyProps) {
      tableRef.current.reset({ search })
    },
    /**
     * 清空选项
     */
    clearSelection() {
      clearSelection()
    },
    /**
     * 获取 search 对象
     */
    getSearchRef() {
      return searchRef.current
    }
  }))

  const tableProps: AnyKeyProps = {
    ref: tableRef,
    rowSelection,
    api,
    data,
    meta,
    ctrl: newCtrl,
    rowKey,
    scrollX,
    filterData,
    beforeSearch,
    onExpand,
    onLoad,
    tableExtend,
    pagination,
    defaultSearchValue: getDefaultValue(searchFields),
    btnBefore,
    dataAnalysis,
    exportVisible
  }

  return (
    <div className="am-search-table">
      <AmSearchTableContext.Provider value={newCtrl}>
        {searchVisible !== false ? <AmSearch ref={searchRef} fields={searchFields} onConfirm={onConfirm} /> : null}
        {center}
        <AmTable {...tableProps} fields={tableFields} header={header}>
          {dialogFormExtend ? <AmDialogForm ref={formRef} {...dialogFormExtend} /> : null}
          {newChildren}
        </AmTable>
      </AmSearchTableContext.Provider>
    </div>
  )
})
