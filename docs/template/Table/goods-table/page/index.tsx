import React, { useEffect } from 'react'
import SearchTable, { useSearchTable } from './components/SearchTable'
import { apiGetCount, apiGetList } from './api'
import { defaultTabOptions, extendFields, fields, onCell, useTopFields } from './config'
import { AyAction, AyCtrl, Record } from 'amiya'
import { message } from 'antd'

export default function Demo() {
  // 表格控制，顶部表单控制
  const { tableRef, topFormRef } = useSearchTable()
  // 顶部联动太恶心了，单独提出去
  const { topFields, searchValues, firstLoad } = useTopFields()

  useEffect(() => {
    if (tableRef.current && !firstLoad) {
      // 刷新数据
      tableRef.current.reset()
    }
  }, [searchValues, firstLoad])

  useEffect(() => {
    // 设置表单数据
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
          <AyAction>审批</AyAction>
          <AyAction>复制</AyAction>
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
