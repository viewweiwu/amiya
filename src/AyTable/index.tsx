import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle, ReactNode } from 'react'
import { Table, Space, Card } from 'antd'
import { TABLE_PAGESIZE, TABLE_START_PAGE } from '../constant'
import { AyTableField, AyTableProps, RenderProps, LoadParams } from './ay-table'
import { clearEmpty } from '../utils'
import { AnyKeyProps } from '../types/AnyKeyProps'
import core from './core'
import RenderMapInit from './RenderMapInit'
import { getComponents } from './EditableTable'
import './ay-table.less'
import { SortItem } from '@/AySearchTable/ay-search-table'

/** 默认请求前列表过滤 */
export let defaultSearchFilter = (params: AnyKeyProps) => {
  return params
}

/** 默认请求后列表过滤 */
export let defaultDataFilter = (params: AnyKeyProps) => {
  return params
}

/** 自定义请求前过滤 */
export const setDefaultSearchFilter = (cb: (params: AnyKeyProps) => AnyKeyProps) => {
  defaultSearchFilter = cb
}

/** 自定义请求后过滤 */
export const setDefaultDataFilter = (cb: (params: AnyKeyProps) => AnyKeyProps) => {
  defaultDataFilter = cb
}

/** 自定义渲染模板 */
let renderMap: AnyKeyProps = {}

/** 注册自定义渲染模板 */
export const registerTableRender = (key: string, render: (props: RenderProps) => ReactNode) => {
  renderMap[key] = render
}

/** 安装默认渲染模板 */
RenderMapInit.install(registerTableRender)

/** 获取表格渲染列 */
export const { getAyTableFields } = core.install(renderMap)

/** 表格默认属性 */
let tableDefaultProps = {}

/** 设置表格默认属性 */
export const setTableDefaultProps = (props: AnyKeyProps) => {
  tableDefaultProps = props
}

export default forwardRef(function AyTable(props: AyTableProps, ref) {
  const {
    className,
    fields,
    header,
    api,
    size,
    data,
    children,
    title,
    rowSelection,
    ctrl,
    onLoad,
    rowKey,
    scrollX,
    autoload,
    filterData,
    beforeSearch,
    onExpand,
    pagination,
    tableExtend,
    defaultSearchValue,
    defaultSortsValue,
    defaultFiltersValue,
    extendSearchParams,
    btnBefore,
    height,
    editMode,
    tableHeader,
    onParamsChange,
    getSearchParams
  } = props
  /** 表格查询的数据 */
  const [loadParams, setLoadParams] = useState<LoadParams>({
    pagination: {
      pageSize: pagination?.pageSize || TABLE_PAGESIZE,
      current: pagination?.current || TABLE_START_PAGE
    },
    filters: clearEmpty(defaultFiltersValue || {}),
    sorts: defaultSortsValue || [],
    search: clearEmpty(defaultSearchValue || {})
  })
  /** 表格数据 */
  const [tableData, setTableData] = useState<Array<AnyKeyProps>>(data || [])
  /** 表格配置 */
  const ayTableFields: Array<AyTableField> = getAyTableFields(fields, loadParams, tableData, setTableData, ctrl)
  /** 是否正在加载 */
  const [loading, setLoading] = useState<boolean>(false)
  /** 总共多少条 */
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    setTableData(data || [])
  }, [data])

  useEffect(() => {
    if (onParamsChange) {
      onParamsChange(loadParams)
    }
  }, [loadParams])

  /**
   * 获得查询前的参数
   */
  const getApiParams = () => {
    let searchParams: AnyKeyProps = {
      ...loadParams,
      search: {
        ...extendSearchParams,
        ...loadParams.search
      }
    }
    // 默认筛选过滤
    if (defaultSearchFilter) {
      searchParams = defaultSearchFilter(searchParams)
    }
    // 主动筛选过滤
    if (beforeSearch) {
      searchParams = beforeSearch(searchParams)
    }
    return searchParams
  }

  /**
   * 加载数据
   * @step 1、获得 params
   * @step 2、开始 loading
   * @step 3、加载数据
   * @step 4、设置表格数据
   * @step 5、关闭 loading
   */
  const loadData = useCallback(() => {
    if (api) {
      let searchParams: AnyKeyProps = getApiParams()
      setLoading(true)
      api(searchParams)
        .then(data => {
          data = defaultDataFilter(data)
          let content = data.content
          if (filterData) {
            content = filterData(data)
          }
          setTableData(content)
          setTotal(data.totalCount)
          if (onLoad) {
            onLoad(content, data)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, loadParams])

  /**
   * 改变表格查询数据
   * @param pageSize 每页多少条
   * @param current 当前第几页
   * @param search 查询数据
   */
  const updateLoadParams = useCallback(
    ({ pageSize, current, search }: { pageSize?: number; current?: number; search?: AnyKeyProps }) => {
      let newLoadParams: LoadParams = {
        ...loadParams
      }
      if (pageSize !== undefined) {
        newLoadParams.pagination.pageSize = pageSize
      }
      if (current !== undefined) {
        newLoadParams.pagination.current = current
      }
      if (search !== undefined) {
        newLoadParams.search = clearEmpty(search)
      }
      setLoadParams(newLoadParams)
    },
    [loadParams]
  )
  const handleTableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    let newParams: LoadParams = {
      ...loadParams
    }

    if (getSearchParams) {
      newParams.search = clearEmpty(getSearchParams())
    }

    newParams.pagination = {
      pageSize: pagination.pageSize,
      current: pagination.current
    }
    // 获取过滤参数
    newParams.filters = {}
    for (let key in filters) {
      newParams.filters[key] = filters[key]
    }
    // 获取排序参数
    newParams.sorts = []
    if (Array.isArray(sorter)) {
      sorter.forEach(option => {
        newParams.sorts.push({
          key: option.field,
          order: option.order
        })
      })
    } else if (sorter.field) {
      newParams.sorts = [
        {
          key: sorter.field,
          order: sorter.order
        }
      ]
    }
    // 排序与筛选默认会回到第一页
    if (extra.action === 'sort' || extra.action === 'filter') {
      newParams.pagination.current = TABLE_START_PAGE
    }
    setLoadParams(newParams)
  }

  useImperativeHandle(ref, () => ({
    /**
     * 刷新页面
     */
    refresh() {
      loadData()
    },
    /**
     * 回到第一页，刷新页面
     */
    reset(search: AnyKeyProps) {
      updateLoadParams({ search, current: TABLE_START_PAGE })
    },
    /**
     * 获取表格数据
     */
    getTableData() {
      return tableData
    },
    /**
     * 设置表格数据
     */
    setTableData(tableData: Array<AnyKeyProps>) {
      setTableData(tableData)
    },
    /**
     * 根据 id 删除某一行数据
     */
    deleteRowByKey(key: string) {
      // @ts-ignore
      let newTableData = [...tableData]
      let index = newTableData.findIndex(row => row[rowKey || 'id'] === key)
      if (index >= 0) {
        newTableData.splice(index, 1)
        setTableData(newTableData)
      }
    },
    /**
     * 新增一行数据
     * @param row 新增的数据
     * @param type 新增在前面还是后面
     */
    addRow(row: AnyKeyProps, type: 'before' | 'after' = 'after') {
      let newTableData = [...tableData]
      newTableData[type === 'after' ? 'push' : 'unshift'](row)
      setTableData(newTableData)
    },
    /**
     * 清空过滤
     * @param keys 要清空的 Filed 的 key 组成的数组
     */
    clearFilters(keys: Array<String> = []) {
      let newParams: LoadParams = {
        ...loadParams
      }
      for (let key in newParams.filters) {
        // 如果是空数组，则全部清除，如果是有数据的数组，则清空 key 相等的过滤值
        if (!keys.length || keys.includes(key)) {
          newParams.filters[key] = null
        }
      }
      setLoadParams(newParams)
    },
    /**
     * 设置过滤值
     * @param filters { key: value } 组成的对象
     */
    setFiltersValue(filters: AnyKeyProps) {
      let newParams: LoadParams = {
        ...loadParams
      }
      for (let key in filters) {
        newParams.filters[key] = filters[key]
      }
      setLoadParams(newParams)
    },
    /**
     * 清空排序
     * @param keys 要清空的 Filed 的 key 组成的数组
     */
    clearSorts(keys: Array<String> = []) {
      let newParams: LoadParams = {
        ...loadParams
      }

      if (!keys.length) {
        // 空数组则清空全部
        newParams.sorts = []
      } else {
        for (let i = 0; i < newParams.sorts.length; i++) {
          let sortItem: AnyKeyProps = newParams.sorts[i]
          // 清空 key 相等的 sorts 值
          if (keys.includes(sortItem.key)) {
            newParams.sorts.splice(i, 1)
            i -= 1
          }
        }
      }
      setLoadParams(newParams)
    },
    /**
     * 设置排序值
     * @param sorts 排序的数据
     */
    setSortsValue(sorts: Array<SortItem>) {
      let newParams: LoadParams = {
        ...loadParams
      }
      newParams.sorts = sorts || []

      setLoadParams(newParams)
    },
    getApiParams
  }))

  useEffect(() => {
    if (autoload !== false) {
      loadData()
    }
  }, [loadData])

  useEffect(() => {
    setTableData(data || [])
  }, [data])

  return (
    <Card className={`ay-table ${className || ''}`}>
      {title || btnBefore || children ? (
        <header className="ay-table-header">
          <div className="ay-table-header-left">
            <Space>{typeof title === 'string' ? <h2 className="ay-table-title">{title}</h2> : title}</Space>
          </div>
          <div className="ay-table-header-right">
            <Space>
              {btnBefore}
              {children}
            </Space>
          </div>
        </header>
      ) : null}
      {header}
      {tableHeader}
      <Table
        bordered
        onExpand={onExpand}
        columns={ayTableFields}
        components={getComponents(editMode)}
        dataSource={tableData}
        loading={loading}
        rowSelection={rowSelection}
        pagination={
          pagination !== false
            ? {
                showTotal: total => `共 ${total} 条`,
                showQuickJumper: true,
                ...pagination,
                size: 'default',
                total,
                current: loadParams.pagination.current
              }
            : false
        }
        onChange={handleTableChange}
        rowKey={rowKey || 'id'}
        size={size}
        scroll={{ x: scrollX, y: height }}
        {...tableDefaultProps}
        {...tableExtend}
      />
    </Card>
  )
})
