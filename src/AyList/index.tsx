import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react'
import { List, Space, Card } from 'antd'
import { TABLE_DEFAULT_ROW_KEY, TABLE_PAGESIZE, TABLE_START_PAGE } from '../constant'
import { LoadParams, AyListProps } from '../AyTable/ay-table'
import { clearEmpty, getKey } from '../utils'
import { AnyKeyProps } from '../types/AnyKeyProps'
import { defaultDataFilter, defaultSearchFilter } from '../AyTable'
import { AyListContext } from './context'
import locale from '../locale'

export default forwardRef(function AyList(props: AyListProps, ref) {
  const {
    className,
    header,
    api,
    data,
    children,
    title,
    listHeader,
    renderItem,
    listExtend,
    onLoad,
    rowKey = TABLE_DEFAULT_ROW_KEY,
    autoload,
    filterData,
    beforeSearch,
    pagination,
    defaultSearchValue,
    extendSearchParams,
    btnBefore,
    onParamsChange
  } = props
  /** 是否已经初始化 */
  const initRef = useRef<boolean>(false)
  /** 表格查询的数据 */
  const [loadParams, setLoadParams] = useState<LoadParams>({
    pagination: {
      pageSize: pagination?.pageSize || TABLE_PAGESIZE,
      current: pagination?.current || TABLE_START_PAGE
    },
    filters: {},
    sorts: [],
    search: clearEmpty(defaultSearchValue || {})
  })
  /** 表格数据 */
  const [tableData, setTableData] = useState<Array<AnyKeyProps>>(data || [])
  /** 是否正在加载 */
  const [loading, setLoading] = useState<boolean>(false)
  /** 总共多少条 */
  const [total, setTotal] = useState<number>(0)
  /** 禁用的选项的 key */
  const [disabledKeys, setDisabledKeys] = useState([])

  useEffect(() => {
    setTableData(data || [])
  }, [data])

  useEffect(() => {
    if (onParamsChange) {
      onParamsChange(loadParams)
    }
    if (initRef.current) {
      // 如果已经初始化，变动触发加载数据
      loadData()
    } else if (autoload !== false && !initRef.current) {
      // 尚未初始化 且 默认加载，触发加载数据
      loadData()
    }
  }, [loadParams])

  useEffect(() => {
    initRef.current = true
  }, [])

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
  const loadData = () => {
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
  }

  /**
   * 改变表格查询数据
   * @param pageSize 每页多少条
   * @param current 当前第几页
   * @param search 查询数据
   */
  const updateLoadParams = ({
    pageSize,
    current,
    search
  }: {
    pageSize?: number
    current?: number
    search?: AnyKeyProps
  }) => {
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
  }

  const handleTableChange = (page: number, size: number) => {
    let newParams: LoadParams = {
      ...loadParams
    }
    newParams.pagination = {
      pageSize: size,
      current: page
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
      let index = newTableData.findIndex(row => getKey(row, rowKey) === key)
      if (index >= 0) {
        newTableData.splice(index, 1)
        setTableData(newTableData)
      }
    },
    getApiParams
  }))

  useEffect(() => {
    setTableData(data || [])
  }, [data])

  /**
   * 是否拥有头部
   */
  const hasHeader = (): boolean => {
    if (title || btnBefore) {
      return true
    }
    // 检查是否拥有除了 AyFields 以外的子元素
    if (children) {
      let checkChildren = Array.isArray(children) ? [...children] : [children]
      // @ts-ignore
      if (checkChildren.filter(node => node?.type?.componentName !== 'AyFields').length > 0) {
        return true
      }
    }
    return false
  }

  return (
    <AyListContext.Provider
      value={{
        data: tableData,
        disabledKeys,
        setDisabledKeys
      }}
    >
      <Card className={`ay-list ${className || ''}`}>
        {hasHeader() ? (
          <header className="ay-list-header">
            <div className="ay-list-header-left">
              <Space>{typeof title === 'string' ? <h2 className="ay-list-title">{title}</h2> : title}</Space>
            </div>
            <div className="ay-list-header-right">
              <Space>
                {btnBefore}
                {children}
              </Space>
            </div>
          </header>
        ) : null}
        {header}
        {listHeader}
        <List
          itemLayout="horizontal"
          dataSource={tableData}
          loading={loading}
          pagination={
            pagination !== false
              ? {
                  showTotal: total => `${locale.table.totalBefore} ${total} ${locale.table.totalAfter}`,
                  showQuickJumper: true,
                  ...pagination,
                  total,
                  onChange: handleTableChange,
                  current: loadParams.pagination.current,
                  pageSize: loadParams.pagination.pageSize
                }
              : false
          }
          renderItem={renderItem}
          {...listExtend}
        ></List>
      </Card>
    </AyListContext.Provider>
  )
})
