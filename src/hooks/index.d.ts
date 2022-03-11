import useOptions from './useOptions'
import { IConfig } from './use-options'

/**
 * 自定义查询后过滤
 * @param api 请求的接口
 * @param config 配置的参数
 */
export declare function setDefaultDataFilter(
  api: Promise<any>,
  config: IConfig
): {
  options: Array<Option>
  tree: Array<Option>
  loading: boolean
  data: any
  load: () => void
}

export default useOptions
