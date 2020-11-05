import React, { useState, useCallback, useEffect, forwardRef, useImperativeHandle, ReactNode } from 'react'
import { Table, Space, Card, Tag, Tooltip } from 'antd'
import { TABLE_PAGESIZE, TABLE_START_PAGE, TABLE_CTRL_KEY } from '../constant'
import { AyTableField, AyTableProps, RenderProps } from './ay-table'
import { Option } from '../AyForm/ay-form'
import { clearEmpty } from '../utils'
import { AnyKeyProps } from '../types/AnyKeyProps'
import './ay-table.less'
import moment from 'moment'

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

let renderMap: AnyKeyProps = {}

export const registerTableRender = (key: string, render: (props: RenderProps) => ReactNode) => {
  renderMap[key] = render
}

registerTableRender('__options', ({ field, text }: RenderProps) => {
  let option = field.options.find((option: Option) => option.value === text)
  return option ? option.label : text
})

registerTableRender('__elipsis', ({ text, field }: RenderProps) => {
  return (
    <Tooltip placement={field.placement || 'topLeft'} title={text}>
      <span>{text || ''}</span>
    </Tooltip>
  )
})

registerTableRender('date', ({ text, field }: RenderProps) => {
  return moment(text).format('YYYY-MM-DD HH:mm:SS')
})

/**
 * 重新过滤配置项
 *
 * 1、先过滤隐藏项目
 * 2、过滤成 antd Table 需要的 columns
 *
 * @param fields 配置项目
 */
const getAyTableFields = (fields: Array<any>, ctrl?: AyTableField): Array<AyTableField> => {
  let tableFields = fields
    .filter((field) => {
      if (field.__extraTouched) {
        return field.__hidden === false
      }
      return field.hidden !== true
    })
    .map((field) => {
      let tableField: AnyKeyProps = {
        key: field.key,
        dataIndex: field.key,
        ...field,
        title: field.__alias || field.title
      }
      if (field.render) {
        tableField.render = field.render
      }

      // options 自动注册
      if (field.options && !field.render && !tableField.renderType) {
        tableField.renderType = '__options'
      }

      // 多余显示 ...
      if (field.ellipsis) {
        tableField.ellipsis = {
          showTitle: false
        }
        tableField.renderType = '__ellipsis'
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
    })

  if (ctrl && ctrl.render && tableFields.every((field) => field.key !== 'ctrl')) {
    ctrl.key = TABLE_CTRL_KEY
    ctrl.title = ctrl.title || '操作'
    ctrl.order = 999
    ctrl.__order = 999
    tableFields.push(ctrl)
  }
  tableFields = tableFields.sort((a: AyTableField, b: AyTableField) => {
    return a.order - b.order
  })
  if (tableFields.some((field) => field.__extraTouched)) {
    tableFields = tableFields.sort((a: AyTableField, b: AyTableField) => {
      return (a.__order || 0) - (b?.__order || 0)
    })
  }

  return tableFields
}

interface LoadParams {
  /** 分页参数 */
  pagination: {
    /** 当前第 n 页 */
    current: number
    /** 每页多少条 */
    size: number
  }
  /** 查询额外参数 */
  search: AnyKeyProps
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
    filterData,
    beforeSearch,
    onExpand,
    pagination,
    tableExtend,
    defaultSearchValue,
    btnBefore
  } = props
  /** 表格配置 */
  const ayTableFields: Array<AyTableField> = getAyTableFields(fields, ctrl)
  /** 表格数据 */
  const [tableData, setTableData] = useState<Array<AnyKeyProps>>(data || [])
  /** 是否正在加载 */
  const [loading, setLoading] = useState<boolean>(false)
  /** 总共多少条 */
  const [total, setTotal] = useState<number>(0)
  /** 表格查询的数据 */
  const [loadParams, setLoadParams] = useState<LoadParams>({
    pagination: {
      size: TABLE_PAGESIZE,
      current: TABLE_START_PAGE
    },
    search: clearEmpty(defaultSearchValue || {})
  })

  /**
   * 获得查询前的参数
   */
  const getParams = () => {
    let searchParams: AnyKeyProps = {
      currentPage: loadParams.pagination.current,
      pageSize: loadParams.pagination.size,
      ...loadParams.search
    }
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
      if (defaultSearchFilter) {
        searchParams = defaultSearchFilter(searchParams)
      }
      setLoading(true)
      api(searchParams)
        .then((data) => {
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
        newLoadParams.pagination.size = pageSize
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

  /**
   * 监听分页改变事件，设置当前页 或 设置每页页数
   * @param current 当前第几页
   * @param pageSize 每页多少条
   */
  const onPageChange = (current: number, pageSize?: number) => {
    updateLoadParams({ current, pageSize })
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
    }
  }))

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    setTableData(data || [])
  }, [data])

  return (
    <Card className={`ay-table ${className}`}>
      {title || btnBefore || children ? (
        <header className="ay-table-header">
          <div className="ay-table-header-left">
            <Space size="large">{title && <h2 className="ay-table-title">{title}</h2>}</Space>
          </div>
          <div className="ay-table-header-right">
            <Space>
              {btnBefore}
              {total ? (
                <span className="table-analysis-item">
                  <span>数量：</span>
                  <Tag color="cyan">{total} 条</Tag>
                </span>
              ) : null}
              {children}
            </Space>
          </div>
        </header>
      ) : (
        ''
      )}
      {header}
      <Table
        bordered
        onExpand={onExpand}
        columns={ayTableFields}
        dataSource={tableData}
        loading={loading}
        rowSelection={rowSelection}
        pagination={
          pagination !== undefined
            ? pagination
            : {
                total,
                current: loadParams.pagination.current,
                onChange: onPageChange,
                showTotal: (total) => `共 ${total} 条`
              }
        }
        rowKey={rowKey || 'id'}
        size={size}
        scroll={{ x: scrollX }}
        {...tableExtend}
      />
    </Card>
  )
})
