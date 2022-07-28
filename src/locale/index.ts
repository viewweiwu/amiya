import { AnyKeyProps } from '../types/AnyKeyProps'
import zhCN from './zh_CN'
import enUS from './en_US'
import jaJP from './ja_JP'

export let activeLang = localStorage.getItem('AMIYA_LOCALE') || 'zh_CN'

let langMap: AnyKeyProps = {
  zh_CN: zhCN,
  en_US: enUS,
  ja_JP: jaJP
}

export const isJP = () => {
  return activeLang === 'ja_JP'
}

/** 设置语言 */
export const setLanguage = (lang: string) => {
  activeLang = lang
  localStorage.setItem('AMIYA_LOCALE', lang)
}

export default langMap[activeLang]
