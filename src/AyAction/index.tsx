import React, { useContext } from 'react'
import AyButton from '../AyButton'
import { AySearchTableContext } from '../AySearchTable'
import { success, info } from '../AyMessage'
import { Modal } from 'antd'
import { AyActionProps } from './ay-action'
import { AnyKeyProps } from '../types/AnyKeyProps'
const { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } = require('@ant-design/icons')

export const actionMap: AnyKeyProps = {}

/**
 * 注册一个 action
 */
export const registerAction = function (
  actionName: string,
  action: (props: AnyKeyProps, record: AnyKeyProps, searchTable: AnyKeyProps) => AnyKeyProps
) {
  actionMap[actionName] = action
}

/**
 * 注册【新增】事件
 */
registerAction('add', (props, _record, searchTable) => {
  return {
    type: 'primary',
    icon: <PlusOutlined />,
    onClick: () => {
      searchTable.formRef?.current?.add().then(() => {
        success(props.children + '成功')
        searchTable.tableRef.current.refresh()
      })
    },
    ...props
  }
})

/**
 * 注册【修改】事件
 */
registerAction('update', (props, record, searchTable) => {
  return {
    onClick: () => {
      searchTable.formRef?.current?.update(record).then(() => {
        success(props.children + '成功')
        searchTable.tableRef.current.refresh()
      })
    },
    ...props
  }
})

/**
 * 注册【详情】事件
 */
registerAction('view', (props, record, searchTable) => {
  return {
    onClick: () => {
      searchTable.formRef?.current?.view(record)
    },
    ...props
  }
})

/**
 * 注册【删除】事件
 */
registerAction('delete', (props, record, searchTable) => {
  return {
    confirm: true,
    confirmMsg: '你确定要删除此行吗？',
    onConfirm: () => {
      if (searchTable?.deleteApi && record) {
        const params = [record[searchTable?.rowKey || 'id']]
        searchTable?.deleteApi(params).then((data: any) => {
          success('删除成功')
          searchTable?.tableRef.current.refresh()
        })
      }
    },
    ...props
  }
})

/**
 * 注册【批量删除】事件
 */
registerAction('batch-delete', (props, _record, searchTable) => {
  return {
    icon: <DeleteOutlined />,
    tableFooterExtraOnly: true,
    onClick: () => {
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
            let params: Array<string> = selection.map((row: any) => row[searchTable?.rowKey || 'id'])
            searchTable?.deleteApi(params).then((data: any) => {
              success('批量删除成功')
              searchTable?.clearSelection()
              searchTable?.tableRef.current.refresh()
            })
          }
        })
      }
    },
    ...props
  }
})

/**
 * 获得转换后 action props
 * @param props 当前 props
 * @param searchTable searchTable 对象
 */
export const getActionProps = (props: AyActionProps, searchTable: any) => {
  const { action, record } = props
  let targetAction = actionMap[action || '']
  if (targetAction) {
    let actionProps: AnyKeyProps = targetAction(props, record, searchTable)
    return actionProps
  }
  return props
}

export default function AyAction(props: AyActionProps) {
  const searchTable: any = useContext(AySearchTableContext)
  const actionProps = getActionProps(props, searchTable)
  return <AyButton {...actionProps} />
}
