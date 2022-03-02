import { AnyKeyProps } from '../../types/AnyKeyProps'
import { Record } from '../../types/Record'
import { Checkbox } from 'antd'
import React, { useContext } from 'react'
import { AySearchTableContext } from '../../AySearchTable/context'
import { AyListContext } from '../../AyList/context'
import { getKey } from '../../utils'

export default function Selection(props: AnyKeyProps) {
  const { selection, rowKey, addSelection, setSelection } = useContext(AySearchTableContext)
  const { data, disabledKeys } = useContext(AyListContext)
  // 获取到已选中的行组成的 keys
  let keys = selection.map((row: Record) => getKey(row, rowKey))
  // 获取到没有被禁用的列
  let noDisabledData = data.filter((row: Record) => !disabledKeys.includes(getKey(row, rowKey)))

  // 是否全选
  const isAllChekced =
    noDisabledData.every((row: Record) => keys.includes(getKey(row, rowKey))) && noDisabledData.length > 0
  // 是否半选
  const isIndeterminate =
    noDisabledData.some((row: Record) => keys.includes(getKey(row, rowKey))) &&
    !isAllChekced &&
    noDisabledData.length > 0

  // 切换选中
  const toggleChecked = () => {
    // 去选取消所有选项
    if (isAllChekced) {
      // 当前列表数据组成的 keys
      let dataKeys = data.map((row: Record) => getKey(row, rowKey))
      // 过滤掉当前页面所有的 keys 剩下的选项
      let newSelection = selection.filter((row: Record) => !dataKeys.includes(getKey(row, rowKey)))
      // 设置新的选项
      setSelection(newSelection)
    } else {
      // 添加新选项，是个数组
      addSelection(noDisabledData.filter((row: Record) => !keys.includes(getKey(row, rowKey))))
    }
  }
  return <Checkbox indeterminate={isIndeterminate} {...props} checked={isAllChekced} onChange={e => toggleChecked()} />
}
