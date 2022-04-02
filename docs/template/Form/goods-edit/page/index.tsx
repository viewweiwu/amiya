import React, { useEffect, useRef, useState } from 'react'
import { Anchor, Card, Space } from 'antd'
import { AnyKeyProps, AyButton, AyField, AyFields, AyForm, FormValues, Record } from 'amiya'
import SkuEdit from './components/SkuEdit'
import UploadImage from './components/UploadImage'
// @ts-ignore
import data from './data/data.json'

const { Link } = Anchor

const unitOptions = [
  { label: 'cm', value: 1 },
  { label: 'fm', value: 2 },
  { label: 'mm', value: 3 }
]

export default function Demo() {
  // 提交的数据
  const [submitValues, setSubmitValues] = useState<AnyKeyProps>({})
  // 当前 sku 表格数据
  const [skuData, setSkuData] = useState<Array<Record>>([])
  // sku 对应的图片对象
  const [skuImageMap, setSkuImageMap] = useState<Record>({})
  const formRef = useRef<any>()

  /**
   * 更新上传图片
   * @param name 当前 sku 值
   * @param value 新图片
   */
  const handleChange = (name: string, value: string) => {
    let newMap = { ...skuImageMap }
    newMap[name] = value
    setSkuImageMap(newMap)
  }

  // 改变 sku 表格数据后，删除多余的 key，保留已经选中的 key
  useEffect(() => {
    let newMap = { ...skuImageMap }
    let names = skuData.map(item => item.name)
    for (let key in newMap) {
      if (!names.includes(key)) {
        delete newMap[key]
      }
    }
    setSkuImageMap(newMap)
  }, [skuData])

  const handleSubmit = (values: FormValues) => {
    // TODO 必填校验
    setSubmitValues({ ...values, skuMap: skuImageMap })
  }

  const fillData = () => {
    formRef.current.setFieldsValue(data)
  }

  return (
    <Card>
      <div style={{ position: 'relative' }}>
        <AyForm
          ref={formRef}
          style={{ marginRight: 100 }}
          formLayout="vertical"
          onConfirm={values => handleSubmit(values)}
          gutter={12}
        >
          <AyFields>
            <AyField title="基础信息" key="__base" id="base" type="card" collapsible>
              <AyField
                title="店铺"
                type="select"
                key="shopId"
                required
                span={12}
                options={[
                  { label: '选项A', value: 1 },
                  { label: '选项B', value: 2 }
                ]}
              />
              <AyField title="商店名称" key="name" required span={12} maxLength={120} showCount />
              <AyField
                title="主营类目"
                type="select"
                key="category"
                required
                span={12}
                options={[
                  { label: '选项A', value: 1 },
                  { label: '选项B', value: 2 }
                ]}
              />
              <AyField
                title="商品保存状态"
                type="select"
                key="saveStatus"
                span={12}
                options={[
                  { label: '选项A', value: 1 },
                  { label: '选项B', value: 2 }
                ]}
              />
              <AyField title="商品描述" type="textarea" required key="remark" rows={5} maxLength={3000} showCount />
            </AyField>
            <AyField title="商品信息" key="__goods" id="goods" type="card" collapsible>
              <AyField key="sku" type="custom" renderContent={() => <SkuEdit onDataChange={setSkuData} />} />
            </AyField>
            <AyField title="媒体管理" key="__images" type="card" id="images" collapsible>
              <AyField
                title="商品图片"
                key="goodsImage"
                type="custom"
                required
                help="*最多可以上传 9 张"
                defaultValue={[]}
                multiple
                renderContent={() => <UploadImage multiple max={9} />}
              />
              <AyField
                title="SKU 图片"
                key="__skuImage"
                type="custom"
                hidden={skuData.length === 0}
                renderContent={() => (
                  <Space>
                    {skuData.map(sku => (
                      <div key={sku.name}>
                        <UploadImage
                          value={skuImageMap[sku.name]}
                          onChange={value => handleChange(sku.name, value as string)}
                        />
                        <div style={{ textAlign: 'center', transform: 'translateX(-4px)' }}>{sku.name}</div>
                      </div>
                    ))}
                  </Space>
                )}
              />
            </AyField>
            <AyField title="运费信息" key="__freight" id="freight" type="card" collapsible>
              <AyField key="__freightTitle" render={() => <h3>包裹尺寸</h3>} />
              <AyField title="长" key="__long" type="input-group" span={8}>
                <AyField key="long" type="number" />
                <AyField key="longUnit" type="select" options={unitOptions} defaultValue={1} readonly />
              </AyField>
              <AyField title="宽" key="__wide" type="input-group" span={8}>
                <AyField key="wide" type="number" />
                <AyField key="wideUnit" type="select" options={unitOptions} defaultValue={1} readonly />
              </AyField>
              <AyField title="高" key="__height" type="input-group" span={8}>
                <AyField key="height" type="number" />
                <AyField key="heightUnit" type="select" options={unitOptions} defaultValue={1} readonly />
              </AyField>
              <AyField title="重量" key="__weight" type="input-group" span={8}>
                <AyField key="weight" type="number" />
                <AyField
                  key="weightUnit"
                  type="select"
                  options={[
                    { label: 'kg', value: 1 },
                    { label: 'g', value: 2 }
                  ]}
                  readonly
                  defaultValue={1}
                />
              </AyField>
            </AyField>
          </AyFields>
          <Space>
            <AyButton htmlType="submit" type="primary">
              提交
            </AyButton>
            <AyButton onClick={fillData}>填充数据</AyButton>
          </Space>
        </AyForm>
        <div style={{ position: 'absolute', right: 0, top: 0 }}>
          <Anchor offsetTop={90}>
            <Link href="#base" title="基础信息" />
            <Link href="#goods" title="商品信息" />
            <Link href="#images" title="媒体管理" />
            <Link href="#freight" title="运费信息" />
          </Anchor>
        </div>
      </div>
      {submitValues.name && <pre>{JSON.stringify(submitValues, null, 2)}</pre>}
    </Card>
  )
}
