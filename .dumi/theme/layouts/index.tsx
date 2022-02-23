import React from 'react'
import Layout from './BasicLayout'
import { ConfigProvider } from 'antd'
import { IRouteComponentProps } from 'umi'
import zhCN from 'antd/es/locale/zh_CN'
import jaJP from 'antd/es/locale/ja_JP'
import enUS from 'antd/es/locale/en_US'
import moment from 'moment'
import 'moment/locale/zh-cn'
import './layout.less'
moment.locale('zh-cn')

let localeMap = {
  zh_CN: zhCN,
  en_US: enUS,
  ja_JP: jaJP
}

let locale = localStorage.getItem('AMIYA_LOCALE') || 'zh_CN'

export default ({ children, ...props }: IRouteComponentProps) => {
  return (
    <ConfigProvider locale={localeMap[locale]}>
      <Layout {...props}>{children}</Layout>
    </ConfigProvider>
  )
}
