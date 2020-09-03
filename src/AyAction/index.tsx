import React, { useContext } from 'react'
import AyButton from '../AyButton'
import { AySearchTableContext } from '../AySearchTable'
import { success, info } from '../AyMessage'
import { Modal, Popconfirm } from 'antd'
const { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } = require('@ant-design/icons')

interface AyActionProps {
  /** 子元素 */
  children: string
  action?: string
  record?: AnyKeyProps
  [key: string]: any
}

export default function AyAction(props: AyActionProps) {
  const searchTable: any = useContext(AySearchTableContext)
  const { action, children, record } = props

  /**
   * 新增事件
   */
  const handleAdd = () => {
    searchTable?.formRef?.current?.add().then(() => {
      success(children + '成功')
    })
  }

  const handleUpdate = () => {
    searchTable?.formRef?.current?.update(record).then(() => {
      success(children + '成功')
    })
  }

  const handleBatchDelete = () => {
    let selection = searchTable?.selection || []
    if (!selection.length) {
      info('请先选择一条数据')
      return
    }

    if (searchTable?.deleteApi) {
      Modal.confirm({
        title: '确定',
        content: `您勾选了 ${selection.length} 个，确定要删除吗？`,
        icon: <ExclamationCircleOutlined />,
        onOk: () => {
          let params: AnyKeyProps = {
            [searchTable?.rowKey || 'id']: selection.map((row: any) => row[searchTable?.rowKey || 'id'])
          }
          searchTable?.deleteApi(params).then((data: any) => {
            success('批量删除成功')
            searchTable?.clearSelection()
            searchTable?.tableRef.current.refresh()
          })
        }
      })
    }
  }

  const handleDelete = () => {
    if (searchTable?.deleteApi && record) {
      const params = {
        [searchTable?.rowKey || 'id']: record[searchTable?.rowKey || 'id']
      }
      searchTable?.deleteApi(params).then((data: any) => {
        success('删除成功')
        searchTable?.tableRef.current.refresh()
      })
    }
  }

  // 根据不同类型返回不同的按钮
  switch (action) {
    // 新增
    case 'add':
      const addProps: AnyKeyProps = {
        type: 'primary',
        icon: <PlusOutlined />,
        onClick: handleAdd,
        ...props
      }
      return <AyButton {...addProps} />
    // 修改
    case 'update':
      const updateProps: AnyKeyProps = {
        onClick: handleUpdate,
        ...props
      }
      return <AyButton {...updateProps} />
    // 删除
    case 'delete':
      const deleteProps: AnyKeyProps = {
        ...props
      }
      return (
        <Popconfirm title={props.confirmMsg || `你确定要${props.children}此行吗？`} onConfirm={() => handleDelete()}>
          <AyButton {...deleteProps} />
        </Popconfirm>
      )
    // 批量删除
    case 'batch-delete':
      const batchDeleteProps: AnyKeyProps = {
        icon: <DeleteOutlined />,
        onClick: handleBatchDelete,
        ...props
      }
      return <AyButton {...batchDeleteProps} />
  }

  return <AyAction {...props} />
}
