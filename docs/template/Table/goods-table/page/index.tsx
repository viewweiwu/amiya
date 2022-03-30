import React, { useEffect, useMemo, useRef, useState } from 'react'
import SearchTable, { useSearchTable } from './components/SearchTable'
import { apiGetCount, apiGetCountryOptions, apiGetList, apiGetShopOptions } from './api'
import { defaultTabOptions, extendFields, fields, onCell } from './config'
import { AyAction, useOptions, Option, AyFormField, AnyKeyProps, AyCtrl, Record } from 'amiya'
import { message } from 'antd'

const useTopFields = () => {
  const firstLoadRef = useRef(true)
  // 国家选项
  const { options: countryOptions } = useOptions(apiGetCountryOptions, {
    transform: (option: Option) => {
      return {
        ...option,
        cover: <span className="cover">{option.cover}</span>
      }
    },
    // 加载国家后设置默认国家ID
    onLoad: ({ options }: AnyKeyProps) => {
      setCountryId(options[0].value)
    }
  })
  // 国家 ID
  const [countryId, setCountryId] = useState('')
  // 店铺选项
  const { options: shopOptions, load: loadShopOptions } = useOptions(apiGetShopOptions, {
    autoload: false,
    params: { countryId },
    onLoad: ({ options }: AnyKeyProps) => {
      firstLoadRef.current = false
      setShopId(options[0].value)
    }
  })
  // 店铺 ID
  const [shopId, setShopId] = useState('')
  // 扩展查询参数
  const searchValues = useMemo(() => {
    return {
      shopId,
      countryId
    }
  }, [shopId, countryId])

  useEffect(() => {
    if (countryId) {
      loadShopOptions()
    }
  }, [countryId])

  const topFields: Array<AyFormField> = useMemo(() => {
    return [
      {
        title: '国家/地区',
        key: 'countryId',
        type: 'card-group',
        options: countryOptions,
        cancelable: false,
        onChange: (value: string) => {
          setCountryId(value)
        }
      },
      {
        title: '店铺',
        key: 'shopId',
        type: 'tag-group',
        options: shopOptions,
        cancelable: false,
        onChange: (value: string) => {
          setShopId(value)
        }
      }
    ]
  }, [countryOptions, shopOptions])

  return {
    topFields,
    searchValues,
    firstLoadRef
  }
}

export default function Demo() {
  const { tableRef, topFormRef } = useSearchTable()
  const { topFields, searchValues, firstLoadRef } = useTopFields()

  useEffect(() => {
    if (topFormRef.current) {
      topFormRef.current.setFieldsValue(searchValues)
    }

    if (tableRef.current && !firstLoadRef.current) {
      tableRef.current.reset()
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
