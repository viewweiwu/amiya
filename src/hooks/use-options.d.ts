export type Transform =
  | {
      label: string
      value: string
      children: string
      parentId: string
    }
  | ((option: Option, index: number, level: number) => Option)

export interface IConfig {
  /** 地址路径 */
  path?: Array<string>
  /** 请求传递的参数 */
  params?: AnyKeyProps
  /** 转换方法 */
  transform?: Transform
  /** 是否保留原始数据 */
  keepOrigin?: boolean
  /** 是否转换成树 */
  toTree?: boolean
  /** 是否自动加载 */
  autoload?: boolean
  /** 请求完成监听 */
  onLoad?: () => void
}
export type useOptions = (
  api: Promise<any>,
  config: IConfig
) => {
  options: Array<Option>
  tree: Array<Option>
  loading: boolean
  data: any
  load: () => void
}
