import React, { useRef, useState } from 'react'
import {
  Option,
  AySearchTable,
  Record,
  AnyKeyProps,
  AyCtrl,
  AyAction,
  AyButton,
  AyDialogForm,
  AyForm,
  FormValues
} from 'amiya'
import { Card, message, Tag } from 'antd'
import Tabs from './components/TableTabs'
import { apiGetCount, apiGetList } from './api'
import { FilterOutlined } from '@ant-design/icons'
import { defaultTabOptions, extendFields, fields, onCell, topFields } from './config'
import './less/index.less'
import SearchData from './components/SearchData'

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

export default function Demo() {
  const tableRef = useRef<any>()
  /** 筛选弹窗是否可见 */
  const [extendVisible, setExtendVisible] = useState(false)
  /** 筛选弹窗的值 */
  const [extendValues, setExtendValues] = useState<FormValues>({})
  /** 顶部 Tab 选项 */
  const [tabOptions, setTabOptions] = useState(defaultTabOptions)
  /** 当前命中的 Tab */
  const [activeTab, setActiveTab] = useState<number>(tabOptions[0].value)
  /** 查询数据 */
  const [searchValues, setSearchValues] = useState<FormValues>({})

  const loadTabCount = () => {
    apiGetCount().then((data: any) => {
      let newTabOptions = [...defaultTabOptions]
      data.forEach((row: AnyKeyProps) => {
        let option = newTabOptions.find(option => option.value === row.status)
        if (option) {
          option.count = row.count
        }
      })

      setTabOptions(newTabOptions)
    })
  }

  const ctrl = {
    width: 140,
    fixed: 'right',
    onCell,
    render: (value: string, record: Record) => {
      return (
        <AyCtrl className="table-ctrl" split={false} max={10}>
          <AyAction>编辑</AyAction>
          <AyAction>克隆</AyAction>
          <AyAction>同步</AyAction>
          <AyAction>下架</AyAction>
          <AyAction record={record} action="delete">
            删除
          </AyAction>
        </AyCtrl>
      )
    }
  }

  const beforeSearch = (values: FormValues) => {
    setSearchValues({ ...values.search })
    return values
  }

  return (
    <div className="table">
      <Card className="top-form-card" bodyStyle={{ padding: 0 }}>
        <AyForm style={{ marginTop: 20 }} fields={topFields} />
      </Card>
      <AySearchTable
        fields={fields}
        api={apiGetList}
        filterData={filterData}
        useOriginPagination={false}
        rowKey="key"
        ctrl={ctrl}
        onLoad={loadTabCount}
        deleteApi={() => Promise.resolve()}
        tableExtend={{ bordered: false }}
        searchExtend={{ inline: true }}
        beforeSearch={beforeSearch}
        extendSearchParams={extendValues}
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
                noVisibleKeys={['keywordType']}
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
        title={<Tabs value={activeTab} options={tabOptions} onChange={setActiveTab} />}
      >
        <AyAction action="add" onClick={() => message.success('添加商品')}>
          添加商品
        </AyAction>
        <AyAction action="batch-delete">批量删除</AyAction>
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
