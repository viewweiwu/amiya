import React, { useEffect, useRef, useState } from 'react'
import { Checkbox, Col, Form, Input, InputNumber, Row, Select } from 'antd'
import { AyAction, AyField, AyFields, AySearchTable, AySelect, Record } from 'amiya'
import PopoverEdit from '../PopoverEdit'

export type SkuValue = { skus: Array<Record>; data: Array<Record> }

interface IProps {
  onChange?: (value: SkuValue) => void
  onDataChange?: (data: Array<Record>) => void
  value?: SkuValue
}

const defaultSkuOptions = [{ value: '蓝色' }, { value: '红色' }, { value: '大' }, { value: '小' }]

const priceOptions = [
  { label: '¥', value: 1 },
  { label: '$', value: 2 }
]

function loop(arr: Array<Array<string> | string>, nextArr: Array<string>) {
  let newArr: Array<Array<string>> = []
  arr.forEach(curr => {
    nextArr.forEach(next => {
      if (Array.isArray(curr)) {
        newArr.push([...curr, next])
      } else {
        newArr.push([curr, next])
      }
    })
  })
  return newArr
}

export default function SkuEdit(props: IProps) {
  const { value, onChange, onDataChange } = props
  // 是否支持多 SKU
  const [multiple, setMultiple] = useState<boolean>(true)
  // 当前 SKU 值
  const [skus, setSkus] = useState<Array<Record>>(value?.skus || [{ id: 1 }])
  // 当前表格数据
  const [data, setData] = useState<Array<Record>>(value?.data || [])
  // 是否首次加载完成
  const firstLoadRef = useRef(true)

  useEffect(() => {
    if (!firstLoadRef.current && value) {
      setData(value.data)
      setSkus(value.skus)
    }
    firstLoadRef.current = false
  }, [value])

  /**
   * 刷新表格数据
   * @param record 当前行数据
   * @param index 当前行 index
   */
  const refreshRecord = (record: Record, index: number) => {
    let newData: Array<Record> = [...data]
    newData[index] = record
    setData(newData)

    triggerChange(newData, skus)
  }

  /**
   * 刷新 sku 数据
   * @param record 当前行数据
   * @param index 当前行 index
   */
  const refreshSkuRecord = (record: Record, index: number) => {
    let newSkus: Array<Record> = [...skus]
    newSkus[index] = record
    setSkus(newSkus)
    return skus
  }

  /** 添加一个 SKU */
  const addSku = () => {
    setSkus([...skus, { id: Date.now() }])
  }

  /** 生成表格数据 */
  const createTableData = (skus: Array<Record>) => {
    // 新生成的表格选项
    let list: Array<Array<string> | string> = []
    // 当前 sku 计算出来的选项
    let values = skus.filter(sku => sku.value && sku.value.length > 0).map(sku => sku.value)

    // 获得表格选项数据
    values.forEach((next, i) => {
      if (i === 0) {
        list = next
      } else {
        list = loop(list, next)
      }
    })

    // 生成表格数据 name 视为表格唯一 key
    let newList = list.map(row => ({
      unit: 1,
      name: typeof row === 'string' ? row : row.join(' / ')
    }))

    // 如果跟原本表格数据有相同行，则不采用新生成的
    let newData: Array<Record> = []
    newList.forEach(row => {
      let inDataRecord = data.find(record => record.name === row.name)
      // 发现有相同行数据，沿用相同行数据
      if (inDataRecord) {
        newData.push(inDataRecord)
      } else {
        // 使用新数据
        newData.push(row)
      }
    })

    // 设置表格数据
    setData(newData)
    // 触发表格更新、数据更新
    triggerDataChange(newData)
    triggerChange(newData, skus)
  }

  /**
   * 改变规格类型
   * @param value 当前 label 值
   * @param sku 当前 sku 对象
   * @param index 当前下标
   */
  const handleChangeSkuLabel = (value: string, sku: Record, index: number) => {
    sku.label = value
    let skus = refreshSkuRecord(sku, index)
    // 触发刷新数据
    triggerChange(data, skus)
  }

  /**
   * 改变规格值
   * @param value 当前规格值
   * @param sku 当前 sku 对象
   * @param index 当前下标
   */
  const handleChangeSku = (value: Array<number>, sku: Record, index: number) => {
    sku.value = value
    let skus = refreshSkuRecord(sku, index)
    // 触发创建表格，里面触发刷新数据
    createTableData(skus)
  }

  /**
   * 批量更新表格数据
   * @param values 编辑后的值
   */
  const handleBatchEdit = (values: { [key: string]: any }) => {
    if (!data.length) {
      return
    }

    let newData = data.map(record => {
      return { ...record, ...values }
    })

    // 设置新数据
    setData(newData)
    // 触发表单值改变
    triggerChange(newData, skus)
    // 触发表格数据更新
    triggerDataChange(newData)
  }

  /**
   * 切换选中时，生成表格和 SKU 的默认数据
   * @param checked 是否选中
   */
  const toggleMultiple = (checked: boolean) => {
    if (checked) {
      let defaultSku = [{ id: 1 }]
      setSkus([...defaultSku])
      setData([])
      triggerDataChange([])
      triggerChange([], defaultSku)
    } else {
      let defaultData = [{ name: '默认规格', unit: 1 }]
      setSkus([])
      setData([...defaultData])
      triggerDataChange(defaultData)
      triggerChange(defaultData, [])
    }
  }

  /**
   * 触发数据更新
   * @param data 当前表格数据
   * @param skus 当前 SKU 数据
   */
  const triggerChange = (data: Array<Record>, skus: Array<Record>) => {
    if (onChange) {
      onChange({
        skus,
        data
      })
    }
  }

  /**
   * 触发表格更新
   * @param data 当前表格数据
   */
  const triggerDataChange = (data: Array<Record>) => {
    if (onDataChange) {
      onDataChange(data)
    }
  }

  return (
    <div>
      <Checkbox
        checked={multiple}
        onChange={e => {
          setMultiple(e.target.checked)
          toggleMultiple(e.target.checked)
        }}
      >
        产品有多种规格，如果您的产品有不同的颜色，尺寸，请选择此项。
      </Checkbox>
      <div style={{ marginTop: 24 }}>
        {skus.map((sku, index) => {
          return (
            <Row gutter={16} key={sku.id}>
              <Col span={12}>
                <Form.Item label="规格类型" required>
                  <Input
                    value={sku.label}
                    onChange={e => {
                      handleChangeSkuLabel(e.target.value, sku, index)
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="规格值" required>
                  <Select
                    mode="tags"
                    value={sku.value}
                    options={defaultSkuOptions}
                    onChange={value => handleChangeSku(value, sku, index)}
                  />
                </Form.Item>
              </Col>
            </Row>
          )
        })}
        {multiple && skus.length < 3 && (
          <AyAction action="add" onClick={addSku} style={{ marginBottom: 16 }}>
            添加规格组
          </AyAction>
        )}
      </div>
      {data.length > 0 && (
        <AySearchTable rowKey="name" data={data} extraVisible={false} compact pagination={false} editMode="col">
          <AyFields>
            <AyField title="规格名称" key="name" />
            <AyField
              title={
                //  批量价格编辑
                <PopoverEdit
                  hidden={!multiple}
                  title="批量编辑价格"
                  options={priceOptions}
                  onChange={(value: number | undefined, unit) => handleBatchEdit({ price: value, unit })}
                >
                  价格
                </PopoverEdit>
              }
              key="price"
              width={200}
              render={(value: number, record: Record, index: number) => {
                return (
                  <InputNumber
                    value={value}
                    onChange={value => {
                      record.price = value
                      refreshRecord(record, index)
                    }}
                    addonBefore={
                      // 单位选择
                      <AySelect
                        value={record.unit}
                        onChange={value => {
                          record.unit = value
                          refreshRecord(record, index)
                        }}
                        options={priceOptions}
                      />
                    }
                  />
                )
              }}
            />
            <AyField
              title={
                //  批量编辑库存
                <PopoverEdit
                  hidden={!multiple}
                  title="批量编辑库存"
                  onChange={(value: number | undefined) => handleBatchEdit({ stock: value })}
                >
                  库存
                </PopoverEdit>
              }
              key="stock"
              width={200}
              render={(value: number, record: Record, index: number) => {
                return (
                  <InputNumber
                    value={value}
                    onChange={value => {
                      record.stock = value
                      refreshRecord(record, index)
                    }}
                  />
                )
              }}
            />
            <AyField
              title={
                //  批量编辑 SKU
                <PopoverEdit
                  hidden={!multiple}
                  title="批量编辑SKU"
                  onChange={(value: number | undefined) => handleBatchEdit({ code: value })}
                >
                  SKU
                </PopoverEdit>
              }
              key="code"
              width={200}
              render={(value: number, record: Record, index: number) => {
                return (
                  <InputNumber
                    value={value}
                    onChange={value => {
                      record.code = value
                      refreshRecord(record, index)
                    }}
                  />
                )
              }}
            />
          </AyFields>
        </AySearchTable>
      )}
    </div>
  )
}
