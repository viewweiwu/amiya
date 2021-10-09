import { defineConfig } from 'dumi'

export default defineConfig({
  title: 'Amiya',
  favicon: '/amiya/images/logo.jpg',
  logo: '/amiya/images/logo.jpg',
  outputPath: 'docs-dist',
  publicPath: '/amiya/',
  base: '/amiya/',
  mode: 'site',
  navs: [
    {
      title: '介绍',
      path: '/guild'
    },
    {
      title: '组件',
      path: '/components'
    },
    {
      title: '更新日志',
      path: '/changelog'
    },
    {
      title: 'GitHub',
      path: 'https://github.com/viewweiwu/amiya'
    }
  ]
})
