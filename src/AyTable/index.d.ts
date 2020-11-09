import { AyTableProps } from './ay-table'
import { AnyKeyProps } from '../types/AnyKeyProps'

/**
 * 自定义查询前过滤
 * @param params 查询参数
 */
export declare function setDefaultSearchFilter(params: AnyKeyProps): AnyKeyProps

/**
 * 自定义查询后过滤
 * @param params 查询参数
 */
export declare function setDefaultDataFilter(params: AnyKeyProps): AnyKeyProps

/**
 * 自定义表格渲染
 * @param params 渲染参数
 */
export declare function registerTableRender(key: 'string', params: AnyKeyProps): void

declare const AyTable: React.ForwardRefExoticComponent<AyTableProps & React.RefAttributes<HTMLDivElement>>

export default AyTable
