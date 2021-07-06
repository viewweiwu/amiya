import React, { useRef } from 'react'
import { AyButton, AyDialogFormField, AyDialogForm, success } from 'amiya'
import { Space } from 'antd'
import { detailApi, addApi, updateApi, professionOptions } from '../api'

export default function AyDialogFormDemo() {
  const formRef = useRef<any>()

  const fields: Array<AyDialogFormField> = [
    {
      title: '姓名',
      key: 'cname'
    },
    {
      title: '初始HP',
      key: 'defaultHp'
    },
    {
      title: '职业',
      key: 'profession',
      type: 'select',
      options: professionOptions
    }
  ]

  const handleAdd = () => {
    formRef.current.add().then(data => {
      console.log(data)
      success('新增成功')
    })
  }

  const handleUpdate = () => {
    detailApi().then(res => {
      formRef.current.update(res.data).then(data => {
        console.log(data)
        success('编辑成功')
      })
    })
  }

  const handleView = () => {
    detailApi().then(res => {
      formRef.current.view(res.data)
    })
  }

  return (
    <div className="demo">
      <Space>
        <AyButton onClick={handleAdd}>新增</AyButton>
        <AyButton onClick={handleUpdate}>编辑</AyButton>
        <AyButton onClick={handleView}>详情</AyButton>
      </Space>
      <AyDialogForm ref={formRef} fields={fields} addApi={addApi} updateApi={updateApi} />
    </div>
  )
}
