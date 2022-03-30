import React, { ReactNode, Ref, useEffect, useRef, useState } from 'react'
import {
  AySearchTable,
  Record,
  AnyKeyProps,
  AyButton,
  AyDialogForm,
  AyForm,
  FormValues,
  AySearchTableField,
  AyFormField,
  AyTableProps,
  Option
} from 'amiya'
import { Card, message, Tag } from 'antd'
import Tabs from '../TableTabs'
import SearchData from '../SearchData'
import { FilterOutlined } from '@ant-design/icons'
import '../../less/index.less'

interface IProps extends AyTableProps {
  /** 列表请求接口 */
  api: (searchValues: FormValues) => Promise<FormValues>
  /** 表格主要查询区域 */
  fields: Array<AySearchTableField>
  /** 顶部表单配置 */
  topFields?: Array<AyFormField>
  /** 弹窗筛选配置 */
  extendFields?: Array<AyFormField>
  /** 表格标题 tab 选项 */
  tabs?: Array<Option>
  /** 表格标题 tab 选项请求接口 */
  tabsApi?: () => Promise<FormValues>
  /** 表格额外查询数据 */
  searchValues?: FormValues
  children?: ReactNode
  tableRef?: any
  topFormRef?: any
  [key: string]: any
}

const filterData = (res: AnyKeyProps) => {
  let newData: Record[] = []
  res.content.forEach((record: Record) => {
    let { details } = record
    if (details.length) {
      for (let i = 0; i < details.length; i++) {
        let childRecord: Record = details[i]
        let newRecord = {
          ...record,
          key: childRecord.id + `record${i}`,
          child: childRecord,
          rowSpan: i > 0 ? 0 : details.length
        }
        newData.push(newRecord)
      }
    } else {
      newData.push(record)
    }
  })
  return newData
}

export default function Demo(props: IProps) {
  const {
    api,
    fields,
    topFields = [],
    extendFields = [],
    tabs = [],
    tabsApi,
    children,
    tableRef: otherTableRef,
    topFormRef: otherTopFormRef,
    searchValues: otherSearchValues,
    ...otherProps
  } = props
  const tableRef = useRef<any>()
  const topFormRef = useRef<any>()

  /** 筛选弹窗是否可见 */
  const [extendVisible, setExtendVisible] = useState(false)
  /** 筛选弹窗的值 */
  const [extendValues, setExtendValues] = useState<FormValues>({})
  /** 顶部 Tab 选项 */
  const [tabOptions, setTabOptions] = useState(tabs || [])
  /** 当前命中的 Tab */
  const [activeTab, setActiveTab] = useState<string>(tabOptions[0].value)
  /** 查询数据 */
  const [searchValues, setSearchValues] = useState<FormValues>({})

  if (otherTableRef) {
    otherTableRef.current = tableRef.current
  }

  if (otherTopFormRef) {
    otherTopFormRef.current = topFormRef.current
  }

  const beforeSearch = (values: FormValues) => {
    setSearchValues({ ...values.search })
    return values
  }

  const handleLoad = () => {
    loadTabCount()
  }
  const loadTabCount = () => {
    if (!tabsApi) {
      return
    }
    tabsApi().then((data: any) => {
      let newTabOptions = [...tabs]
      data.forEach((row: AnyKeyProps) => {
        let option = newTabOptions.find(option => option.value === row.status)
        if (option) {
          option.count = row.count
        }
      })

      setTabOptions(newTabOptions)
    })
  }

  return (
    <div className="table">
      <AySearchTable
        fields={fields}
        api={api}
        filterData={filterData}
        useOriginPagination={false}
        rowKey="key"
        onLoad={handleLoad}
        tableExtend={{ bordered: false }}
        searchExtend={{ inline: true }}
        beforeSearch={beforeSearch}
        extendSearchParams={{
          ...extendValues,
          ...otherSearchValues,
          activeTab
        }}
        before={
          <Card className="top-form-card" bodyStyle={{ padding: 0 }}>
            <AyForm style={{ marginTop: 20 }} fields={topFields} ref={topFormRef} />
          </Card>
        }
        center={
          <div style={{ marginBottom: 12 }}>
            <AyButton icon={<FilterOutlined />} onClick={() => setExtendVisible(true)}>
              筛选
            </AyButton>
            <div style={{ marginTop: 12 }}>
              <SearchData
                extendValues={extendValues}
                searchValues={searchValues}
                keyMap={{
                  keyword: searchValues['keywordType'] === 1 ? '商品名称' : 'SKU'
                }}
                searchFields={fields}
                extendFields={extendFields}
                noVisibleKeys={['keywordType', 'activeTab', ...Object.keys(otherSearchValues)]}
                onRemoveSearchValue={key => {
                  tableRef.current.getSearchRef().setFieldsValue({
                    [key]: undefined
                  })
                  tableRef.current.reset()
                }}
                onRemoveExtendValue={key => {
                  setExtendValues({
                    ...extendValues,
                    [key]: undefined
                  })
                  tableRef.current.reset()
                }}
                clearAll={() => {
                  tableRef.current.getSearchRef().resetFields()
                  setExtendValues({})
                  tableRef.current.reset()
                }}
              />
            </div>
          </div>
        }
        scrollX={1600}
        ref={tableRef}
        title={
          <Tabs
            value={activeTab}
            options={tabOptions}
            onChange={value => {
              setActiveTab(value)
              tableRef.current.reset()
            }}
          />
        }
        {...(otherProps as any)}
      >
        {children}
      </AySearchTable>
      <AyDialogForm
        title="筛选"
        visible={extendVisible}
        onClose={() => setExtendVisible(false)}
        onSuccess={({ values }) => {
          setExtendValues(values)
          tableRef.current.reset()
        }}
        fields={extendFields}
        initialValues={{
          ...extendValues
        }}
        addApi={extendData => Promise.resolve(extendData) as any}
        formExtend={{ className: 'full-width' }}
      />
    </div>
  )
}

export const useSearchTable = () => {
  const tableRef = useRef<any>()
  const topFormRef = useRef<any>()

  return {
    tableRef,
    topFormRef
  }
}
