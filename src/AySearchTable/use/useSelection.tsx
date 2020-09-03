/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { ReactNode, useState, ReactText, useEffect } from 'react'
import Alert from 'antd/lib/alert'
import { Tag, Popover } from 'antd'
import AmButton from '../../AyButton'

interface Row extends AnyKeyProps {}

interface UseSelectionProps {
  /** 表格 rowKey */
  rowKey: string
  /** ☑️表格选择框类型 */
  selectionType?: 'checkbox' | 'radio'
  /** 📢表格选择改变触发事件 */
  onSelectionChange?(selection: Array<Row>): void
  selectShowKey?: string
}

interface UseSelectionReturns {
  /** 头部元素 */
  header: ReactNode
  /** 生成的 antd rowSelection */
  rowSelection: AnyKeyProps | undefined
  /** ☑️已选中的选项 */
  selection: Array<Row>
  /** 清空所有选项 */
  clearSelection(): void
}

export default function useSelection(_props: UseSelectionProps): UseSelectionReturns {
  const { rowKey, selectionType, onSelectionChange, selectShowKey } = _props
  const [selectionKeys, setSelectionKeys] = useState<Array<ReactText>>([])
  const [selection, setSelection] = useState<Array<Row>>([])

  let rowSelection: AnyKeyProps | undefined

  if (selectionType) {
    rowSelection = {
      type: selectionType,
      selectedRowKeys: selectionKeys,
      onSelect: (record: Row, selected: boolean) => {
        selected ? addSelection(record) : removeSelection(null, record)
      },
      onSelectAll: (selected: boolean, selectedRows: Array<Row>, changeRows: Array<Row>) => {
        selected ? addSelectionArray(selectedRows) : removeSelectionArray(changeRows)
      }
    }
  }

  /**
   * 清空所有选项
   */
  const clearSelection = () => {
    setSelectionKeys([])
    setSelection([])
  }

  /**
   * 添加选项（单个）
   * @param row 某一条选项
   */
  const addSelection = (row: AnyKeyProps) => {
    let newKeys = [...selectionKeys]
    let newSelection = [...selection]

    newKeys.push(row[rowKey])
    newSelection.push(row)

    setSelectionKeys(newKeys)
    setSelection(newSelection)
  }

  /**
   * 添加选项（数组）
   * @param rows 项目列表
   */
  const addSelectionArray = (rows: Array<AnyKeyProps>) => {
    let newKeys = [...selectionKeys]
    let newSelection = [...selection]

    rows.forEach((row) => {
      if (!row) {
        return
      }
      let key = row[rowKey]
      if (!newKeys.includes(key)) {
        newKeys.push(key)
        newSelection.push(row)
      }
    })

    setSelectionKeys(newKeys)
    setSelection(newSelection)
  }

  /**
   * 移除某个选项
   * @param i 移除选项的 index
   */
  const removeSelection = (i: number | null, record?: AnyKeyProps) => {
    let newKeys = [...selectionKeys]
    let newSelection = [...selection]

    if (i === null && record) {
      i = newKeys.findIndex((key) => key === record[rowKey])
    }

    if (typeof i === 'number') {
      newKeys.splice(i, 1)
      newSelection.splice(i, 1)
    }

    setSelectionKeys(newKeys)
    setSelection(newSelection)
  }

  /**
   * 移除一组选项
   * @param rows 移除选项
   */
  const removeSelectionArray = (rows: Array<Row>) => {
    let newKeys = [...selectionKeys]
    let newSelection = [...selection]

    rows.forEach((row) => {
      let index = newKeys.findIndex((item) => item === row[rowKey])
      if (index >= 0) {
        newKeys.splice(index, 1)
        newSelection.splice(index, 1)
      }
    })

    setSelectionKeys(newKeys)
    setSelection(newSelection)
  }

  /** Popover 弹窗的提示 */
  const popContent = (
    <div className="am-search-poper">
      {selection.map((row, i) => {
        return (
          <Tag key={row[rowKey || 'id']} closable className="mb" onClose={() => removeSelection(i)}>
            {row[selectShowKey || 'name']}
          </Tag>
        )
      })}
    </div>
  )

  /** 头部已选中的提示 */
  const header = selectionKeys.length ? (
    <Alert
      className="am-search-table-alert"
      message={
        <div>
          <span>
            已选择：
            <Popover title="已经选中的选项" content={popContent}>
              <a>{selection.length}</a>
            </Popover>{' '}
            条
          </span>
          <AmButton className="ml" type="link" size="small" onClick={clearSelection}>
            清空
          </AmButton>
        </div>
      }
      showIcon
    />
  ) : (
    ''
  )

  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selection)
    }
  }, [onSelectionChange, selection])

  return { header, rowSelection, selection, clearSelection }
}
