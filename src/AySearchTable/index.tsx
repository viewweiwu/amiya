/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {
  useRef,
  MutableRefObject,
  createContext,
  forwardRef,
  useImperativeHandle,
  Ref,
  ReactNode,
  useState,
  useMemo
} from 'react'
import AySearch from '../AySearch'
import AyForm from '../AyForm'
import AyTable from '../AyTable'
import AyDialogForm from '../AyDialogForm'
import useSelection from './use/useSelection'
import {
  FormRefProps,
  TableRefProps,
  AySearchTableField,
  AySearchTableProps,
  SearchTableInitConfig
} from './ay-search-table'
import { isObj } from '../utils'
import { getDefaultValue } from '../AyForm'
import { AyTableField } from '../AyTable/ay-table'
import { AySearchField } from '../AySearch/ay-search'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { Space } from 'antd'
import { getActionProps } from '../AyAction'
import './ay-search-table.less'
import useExtraBtn, { setSearchTableExtraDefaultValue } from './use/useExtraBtn'
import { AyButton } from '..'

export const AySearchTableContext = createContext({})

/**
 * 转化并过滤成 ay-search 能用的 fields
 * @param fields 查询表格的 fields
 */
const getSearchFields = (fields: Array<AySearchTableField>) => {
  let searchFields: Array<AySearchField> = []
  let moreSearchFields: Array<AySearchField> = []
  fields
    .filter((field: AySearchTableField) => {
      return isObj(field.search)
    })
    .forEach((field: AySearchTableField) => {
      const search = field.search
      if (!search) {
        return {
          title: '配置有误',
          key: 'xxx',
          type: 'input'
        }
      }
      let searchField: AySearchField = {
        title: field.title,
        key: search.key || field.key || '',
        type: field.type || 'input',
        options: field.options || [],
        ...search
      }
      if (searchField.position === 'more') {
        searchField.span = 24
        moreSearchFields.push(searchField)
      } else {
        searchFields.push(searchField)
      }
    })
  return {
    searchFields,
    moreSearchFields
  }
}

/**
 * 过滤获得配置项
 *
 * 1、生成基础 table 需要的 fields
 * 2、添加 options (如果有的话)
 *
 * @param fields 配置项
 */
const getTableFields = (fields: Array<AySearchTableField>): Array<AyTableField> => {
  return fields.map((field: AySearchTableField) => {
    const table = field.table
    let tableField: AyTableField = {
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

/**
 * 判断该节点是否只出现在底部
 * @param node AyAction 按钮
 */
const isFooterActionOnly = (node: any) => {
  if (!node || !node.props) {
    return false
  }
  const props = getActionProps(node.props, {})
  return props.tableFooterExtraOnly === true
}

/**
 * 获取表格底部以及右侧 AyAction 按钮
 * @param node AyAction 按钮
 */
const getTableActionBtns = (
  children: ReactNode
): { footerActions: Array<ReactNode>; rightActions: Array<ReactNode> } => {
  /** 右侧按钮 */
  const footerActions: Array<ReactNode> = []
  /** 底部按钮 */
  const rightActions: Array<ReactNode> = []
  if (Array.isArray(children)) {
    children.forEach((node: any) => {
      if (isFooterActionOnly(node)) {
        footerActions.push(node)
      } else if (node) {
        rightActions.push(node)
      }
    })
  } else {
    if (isFooterActionOnly(children)) {
      footerActions.push(children)
    } else if (children) {
      rightActions.push(children)
    }
  }
  return {
    rightActions,
    footerActions
  }
}

/** 初始化查询表格配置 */
export const setSearchTableDefaultValue = (config: SearchTableInitConfig) => {
  // 初始化扩展列
  setSearchTableExtraDefaultValue(config)
}

export default forwardRef(function AySearchTable(props: AySearchTableProps, ref: Ref<any>) {
  const {
    fields,
    api,
    deleteApi,
    children,
    data,
    title,
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
    btnBefore,
    extendSearchParams
  } = props

  /** form 控制 */
  const formRef: MutableRefObject<FormRefProps> = useRef() as MutableRefObject<FormRefProps>
  /** table 控制 */
  const tableRef: MutableRefObject<TableRefProps> = useRef() as MutableRefObject<TableRefProps>
  /** search 控制 */
  const searchRef: MutableRefObject<AnyKeyProps> = useRef() as MutableRefObject<TableRefProps>
  /** search 控制 */
  const moreSearchRef: MutableRefObject<AnyKeyProps> = useRef() as MutableRefObject<TableRefProps>
  /** 查询项 */
  const { searchFields, moreSearchFields } = getSearchFields(fields)
  /** 列表项 */
  const [tableFields, setTableFields] = useState<Array<AyTableField>>(getTableFields(fields))
  /** 使用勾选 */
  const { header, message, rowSelection, selection, clearSelection } = useSelection({
    rowKey: rowKey || 'id',
    selectionType,
    onSelectionChange,
    selectShowKey
  })
  /** action 展示，底部 or 右侧 */
  const { footerActions, rightActions } = getTableActionBtns(children)
  const { extraBtns, size, isEnter } = useExtraBtn(tableRef, tableFields, setTableFields, props)

  /** 查询完成，刷新列表 */
  const onConfirm = () => {
    // 更多查询数据
    let moreSearchValues = moreSearchRef.current.getFieldsValue()
    // 头顶查询数据
    let searchValues = searchRef.current.getFieldsValue()
    // 合并查询
    tableRef.current.reset({
      ...moreSearchValues,
      ...searchValues
    })
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
    },
    /**
     * 获取已经选中的对象
     */
    getSelection() {
      return selection
    }
  }))

  const tableProps: AnyKeyProps = {
    ref: tableRef,
    rowSelection,
    api,
    size,
    data,
    title,
    ctrl,
    rowKey,
    scrollX,
    filterData,
    beforeSearch,
    onExpand,
    onLoad,
    tableExtend,
    pagination,
    defaultSearchValue: getDefaultValue([...searchFields, ...moreSearchFields]),
    btnBefore,
    extendSearchParams
  }

  /** 表格子元素 */
  const tableChildren = useMemo(() => {
    const children = []
    if (moreSearchFields && moreSearchFields.length) {
      children.push(
        <AyForm
          className="ay-search-table-more"
          span={24}
          ref={moreSearchRef}
          fields={moreSearchFields}
          onConfirm={onConfirm}
        >
          <AyButton className="ay-search-table-more-submit" htmlType="submit"></AyButton>
        </AyForm>
      )
    }
    if (rightActions && rightActions.length) {
      children.push(rightActions)
    }
    if (extraBtns) {
      children.push(extraBtns)
    }
    return children.length ? children : null
  }, [moreSearchRef, moreSearchFields, onConfirm, rightActions, extraBtns])

  return (
    <div className={`ay-search-table ${isEnter ? 'full' : null}`}>
      <AySearchTableContext.Provider value={{ formRef, tableRef, selection, deleteApi, rowKey, clearSelection }}>
        {searchVisible !== false ? <AySearch ref={searchRef} fields={searchFields} onConfirm={onConfirm} /> : null}
        {center}
        {dialogFormExtend ? <AyDialogForm ref={formRef} dialogOnly {...dialogFormExtend} /> : null}
        <AyTable {...tableProps} fields={tableFields} header={header}>
          {tableChildren}
        </AyTable>
        {selection.length && footerActions.length ? (
          <div className="ay-search-table-footer-actions">
            {message}
            <Space>{footerActions}</Space>
          </div>
        ) : null}
      </AySearchTableContext.Provider>
    </div>
  )
})
