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

/** 默认请求前列表过滤 */
let defaultSearchFilter = (params: AnyKeyProps) => {
  return params
}

/** 默认请求后列表过滤 */
let defaultDataFilter = (params: AnyKeyProps) => {
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
const { getAyTableFields } = core.install(renderMap)

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
    extendSearchParams,
    btnBefore,
    height,
    editMode
  } = props
  /** 表格查询的数据 */
  const [loadParams, setLoadParams] = useState<LoadParams>({
    pagination: {
      pageSize: TABLE_PAGESIZE,
      current: TABLE_START_PAGE
    },
    filters: {},
    sorts: [],
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

  /**
   * 获得查询前的参数
   */
  const getParams = () => {
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
      let searchParams: AnyKeyProps = getParams()
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
  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    let newParams: LoadParams = {
      ...loadParams
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
    }
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
      <Table
        bordered
        onExpand={onExpand}
        columns={ayTableFields}
        components={getComponents(editMode)}
        dataSource={tableData}
        loading={loading}
        rowSelection={rowSelection}
        pagination={{
          showTotal: total => `共 ${total} 条`,
          showQuickJumper: true,
          ...pagination,
          total,
          current: loadParams.pagination.current
        }}
        onChange={handleTableChange}
        rowKey={rowKey || 'id'}
        size={size}
        scroll={{ x: scrollX, y: height }}
        {...tableExtend}
      />
    </Card>
  )
})
