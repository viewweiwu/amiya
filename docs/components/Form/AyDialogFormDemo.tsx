import React, { useRef } from 'react'
import { AyButton, AyDialogFormField, AyDialogForm, success, error } from 'amiya'
import { Space } from 'antd'
import { detailApi, addApi, updateApi, professionOptions, errorApi } from '../api'
import { AnyKeyProps } from 'es/types/AnyKeyProps'

export default function AyDialogFormDemo() {
  const formRef = useRef<any>()
  const formErrorRef = useRef<any>()

  const fields: Array<AyDialogFormField> = [
    {
      title: '姓名',
      key: 'cn'
    },
    {
      title: '初始HP',
      key: 'ori-hp'
    },
    {
      title: '职业',
      key: 'class',
      type: 'select',
      options: professionOptions
    }
  ]

  const handleAdd = () => {
    formRef.current.add().then((data: AnyKeyProps) => {
      console.log(data)
      success('新增成功')
    })
  }

  const handleUpdate = () => {
    // 获取详情
    detailApi(55).then(res => {
      formRef.current.update(res.data).then((data: AnyKeyProps) => {
        console.log(data)
        success('编辑成功')
      })
    })
  }

  const handleView = () => {
    detailApi(55).then(res => {
      formRef.current.view(res.data)
    })
  }

  const handleErrorAdd = () => {
    formErrorRef.current.add(
      {},
      {
        onError: (params: AnyKeyProps) => {
          error('请求失败，请看 log 参数')
          console.log(params)
        }
      }
    )
  }
  const handleErrorUpdate = () => {
    detailApi(55).then(res => {
      formErrorRef.current.update(res.data, {
        onError: (params: AnyKeyProps) => {
          error('请求失败，请看 log 参数')
          console.log(params)
        }
      })
    })
  }

  return (
    <div className="demo">
      <Space>
        <AyButton onClick={handleAdd}>新增</AyButton>
        <AyButton onClick={handleUpdate}>编辑</AyButton>
        <AyButton onClick={handleView}>详情</AyButton>
      </Space>
      <div style={{ marginTop: 16 }}>
        <Space>
          <AyButton onClick={handleErrorAdd}>失败新增</AyButton>
          <AyButton onClick={handleErrorUpdate}>失败编辑</AyButton>
        </Space>
      </div>
      <AyDialogForm ref={formRef} fields={fields} addApi={addApi} updateApi={updateApi} />
      <AyDialogForm
        dialogExtend={{ confirmText: '点我就会失败' }}
        ref={formErrorRef}
        fields={fields}
        addApi={errorApi}
        updateApi={errorApi}
      />
    </div>
  )
}
