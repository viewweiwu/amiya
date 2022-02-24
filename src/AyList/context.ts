import { AnyKeyProps } from 'lib'
import { createContext } from 'react'

export const AyListContext = createContext<AnyKeyProps>({
  // 当前列表的数据
  data: [],
  // 已经禁用的 row 组成的 key
  disabledKeys: [],
  // 设置禁用的选项
  setDisabledKeys: (keys: Array<string>) => {}
})
