import React from 'react'
import Layout from './BasicLayout'
import { ConfigProvider } from 'antd'
import { IRouteComponentProps } from 'umi'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import './layout.less'
import ThemeButton from '../hooks/useTheme'
moment.locale('zh-cn')

export default ({ children, ...props }: IRouteComponentProps) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Layout {...props}>
        <>
          <ThemeButton>切换颜色</ThemeButton>
          {children}
        </>
      </Layout>
    </ConfigProvider>
  )
}
