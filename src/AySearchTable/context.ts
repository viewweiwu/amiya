import { AnyKeyProps } from '@/types/AnyKeyProps'
import { createContext } from 'react'

export const AySearchTableContext = createContext<AnyKeyProps>({
  // 查询区域表单控制
  formRef: { current: undefined },
  // 表格控制
  tableRef: { current: undefined },
  // 当前已经选中的数据
  selection: [],
  // 删除接口
  deleteApi: Promise.resolve(),
  // rowKey
  rowKey: '',
  // 设置选项
  setSelection: (selection: Array<AnyKeyProps>) => {},
  // 清空选项
  clearSelection: () => {},
  // 添加选项
  addSelection: (rows: Array<AnyKeyProps>) => {},
  // 移除选项, index 可不传
  removeSelection: (index: number | null, record: AnyKeyProps) => {},
  // 当前查询表格控制
  searchTableRef: { current: undefined }
})
