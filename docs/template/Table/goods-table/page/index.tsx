import React, { useEffect, useRef } from 'react'
import SearchTable, { useSearchTable } from './components/SearchTable'
import { apiGetCount, apiGetList } from './api'
import { defaultTabOptions, extendFields, fields, onCell, useTopFields } from './config'
import { AyAction, AyCtrl, Record } from 'amiya'
import { message } from 'antd'

export default function Demo() {
  const { tableRef, topFormRef } = useSearchTable()
  const { topFields, searchValues, firstLoad } = useTopFields()

  useEffect(() => {
    if (tableRef.current && !firstLoad) {
      tableRef.current.reset()
    }
  }, [searchValues, firstLoad])

  useEffect(() => {
    if (topFormRef.current) {
      topFormRef.current.setFieldsValue(searchValues)
    }
  }, [searchValues])

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

  return (
    <div>
      <SearchTable
        api={apiGetList}
        tabsApi={apiGetCount}
        tabs={defaultTabOptions}
        topFields={topFields}
        tableRef={tableRef}
        topFormRef={topFormRef}
        fields={fields}
        extendFields={extendFields}
        searchValues={searchValues}
        autoload={false}
        ctrl={ctrl}
        deleteApi={() => Promise.resolve()}
      >
        <AyAction action="add" onClick={() => message.success('添加商品')}>
          添加商品
        </AyAction>
        <AyAction action="batch-delete">批量删除</AyAction>
      </SearchTable>
    </div>
  )
}
