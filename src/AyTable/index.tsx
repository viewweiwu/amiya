import React, { useState, ReactNode, useCallback, useEffect, forwardRef, useImperativeHandle } from 'react'
import AyButton from '../AyButton'
import { Table, Space, Card, Tag } from 'antd'
import { TABLE_PAGESIZE, TABLE_START_PAGE, TABLE_CTRL_KEY } from '../constant'
import { TableRowSelection } from 'antd/lib/table/interface'
import { AyTableField } from './ay-table'
import { Option } from '../AyForm/ay-form'
import { clearEmpty } from '../utils'
import './ay-table.less'
const { DownloadOutlined } = require('@ant-design/icons')

let defaultSearchFilter = (params: AnyKeyProps) => {
  return params
}

let defaultDataFilter = (params: AnyKeyProps) => {
  return params
}

export const setDefaultSearchFilter = (cb: (params: AnyKeyProps) => AnyKeyProps) => {
  defaultSearchFilter = cb
}

export const setDefaultDataFilter = (cb: (params: AnyKeyProps) => AnyKeyProps) => {
  defaultDataFilter = cb
}

interface AyTableProps {
  title?: string | ReactNode
  children?: ReactNode
  header?: ReactNode
  api?(params: AnyKeyProps): Promise<AnyKeyProps>
  /** 列表项 */
  fields: Array<AyTableField>
  /** 列表数据 */
  data?: Array<any>
  /** 操作列 */
  ctrl?: AyTableField
  /** 表格前面的 selection */
  rowSelection?: TableRowSelection<AnyKeyProps>
  /** 表格查询完成监听 */
  onLoad?(records: Array<AnyKeyProps>, data: any): void
  /** rowKey */
  rowKey?: string
  /** 横向滚动宽度 */
  scrollX?: number
  /** 加载玩数据过滤 */
  filterData?(data: AnyKeyProps): AnyKeyProps
  /** 查询前过滤 */
  beforeSearch?(data: AnyKeyProps): AnyKeyProps
  /** 展开事件 */
  onExpand?(expanded: boolean, record: AnyKeyProps): void
  /** 分页参数 */
  pagination?: any
  className?: string
  /** talbe 其它属性 */
  tableExtend?: AnyKeyProps
  /** 默认查询数据 */
  defaultSearchValue?: AnyKeyProps
  /** 在导入前面插入按钮 */
  btnBefore?: ReactNode
  /** 统计数据，放在导入按钮前面 */
  dataAnalysis?: Array<Option>
  /** 是否展示导出按钮 */
  exportVisible?: boolean
}

/**
 * 重新过滤配置项
 *
 * 1、先过滤隐藏项目
 * 2、过滤成 antd Table 需要的 columns
 *
 * @param fields 配置项目
 */
const getAyTableField = (fields: Array<any>, ctrl?: AyTableField): Array<AyTableField> => {
  let tableFields = fields
    .filter((field) => {
      return field.hidden !== true
    })
    .map((field) => {
      let tableField: AnyKeyProps = {
        key: field.key,
        dataIndex: field.key,
        ...field
      }
      if (field.render) {
        tableField.render = field.render
      }
      if (field.options && !field.render) {
        tableField.render = (text: string) => {
          let row = field.options.find((option: Option) => option.value === text)
          if (row) {
            if (field.renderType === 'tag') {
              return <Tag color={row.color}>{row ? row.label : text}</Tag>
            } else if (row.color) {
              return (
                <span>
                  <span className={`circle ${row.color}`}></span>
                  {row ? row.label : text}
                </span>
              )
            }
          }
          return row ? row.label : text
        }
      }
      return tableField
    })

  if (ctrl && ctrl.render && tableFields.every((field) => field.key !== 'ctrl')) {
    ctrl.key = TABLE_CTRL_KEY
    ctrl.title = ctrl.title || '操作'
    tableFields.push(ctrl)
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
    btnBefore,
    dataAnalysis,
    exportVisible
  } = props
  /** 表格配置 */
  const ayTableFields: Array<AyTableField> = getAyTableField(fields, ctrl)
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
      console.log('列表查询数据', searchParams)
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

  const handleDownLoad = () => {
    if (api) {
      let downloadParams = getParams()
      downloadParams._download = true
      downloadParams._downloadTitle = title || ''
      api(downloadParams)
    }
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
              {dataAnalysis
                ? dataAnalysis.map((option: Option) => (
                    <span className="table-analysis-item" key={option.label}>
                      <span>{option.label}：</span>
                      <Tag color="cyan">{option.value.toLocaleString()}</Tag>
                    </span>
                  ))
                : null}
              {total ? (
                <span className="table-analysis-item">
                  <span>数量：</span>
                  <Tag color="cyan">{total} 条</Tag>
                </span>
              ) : null}
              {exportVisible && api && (
                <AyButton icon={<DownloadOutlined />} onClick={handleDownLoad}>
                  导出
                </AyButton>
              )}
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
        pagination={pagination !== undefined ? pagination : { total, current: loadParams.pagination.current, onChange: onPageChange, showTotal: (total) => `共 ${total} 条` }}
        rowKey={rowKey || 'id'}
        scroll={{ x: scrollX }}
        {...tableExtend}
      />
    </Card>
  )
})
