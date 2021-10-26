import { Button, Col, Form, Input, message, Modal, Row, Select, Space } from 'antd'
import { addApi, updateApi, professionOptions } from '../../docs/components/api'
import React, { useEffect, useState } from 'react'
import { layout, ModalDetail } from './AntdTable'

interface ModalEditProps {
  detail: ModalDetail
  onClose: () => void
  onSuccess: () => void
}

const titleMap = {
  add: '编辑',
  update: '修改',
  view: '详情'
}

export default function ModalEdit(props: ModalEditProps) {
  const { detail, onClose, onSuccess } = props
  const { visible, mode, record } = detail
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)

  const handleOk = () => {
    form.submit()
  }

  const onFinish = (values: any) => {
    let params = {
      sort_id: record.sort_id,
      ...values
    }
    let api = mode === 'add' ? addApi : updateApi
    setLoading(true)
    api(params)
      .then(() => {
        onSuccess()
        message.success(mode === 'add' ? '新增成功' : '编辑成功')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    form.resetFields()
    form.setFieldsValue(detail.record)
  }, [detail])

  return (
    <Modal
      title={titleMap[mode]}
      visible={visible}
      onCancel={onClose}
      footer={
        mode === 'view' ? (
          <Button onClick={onClose}>关闭</Button>
        ) : (
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button type="primary" onClick={handleOk}>
              确定
            </Button>
          </Space>
        )
      }
    >
      <Form {...layout} style={{ paddingRight: 20 }} form={form} onFinish={onFinish}>
        <Form.Item label="姓名" name="cn" rules={[{ required: true }]}>
          <Input disabled={mode === 'view'} placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item label="英文名" name="en" rules={[{ required: true }]}>
          <Input disabled={mode === 'view'} placeholder="请输入英文名" />
        </Form.Item>
        <Form.Item label="日文名" name="jp" rules={[{ required: true }]}>
          <Input disabled={mode === 'view'} placeholder="请输入日文名" />
        </Form.Item>
        <Form.Item label="职业" name="class">
          <Select disabled={mode === 'view'} placeholder="请选择职业" options={professionOptions} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
