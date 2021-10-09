import { defineConfig } from 'dumi'

export default defineConfig({
  title: 'Amiya',
  favicon: '/amiya/images/logo.jpg',
  logo: '/amiya/images/logo.jpg',
  outputPath: 'docs-dist',
  publicPath: '/amiya/',
  base: '/amiya/',
  mode: 'site',
  menus: {
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    '/form': [
      {
        title: '菜单项',
        path: '菜单路由（可选）',
        children: ['/form/卡片表单.md']
      }
    ]
  },
  navs: [
    {
      title: '体验',
      path: '/'
    },
    {
      title: '组件',
      path: '/ccomponents'
    },
    {
      title: 'GitHub',
      path: 'https://github.com/viewweiwu/amiya'
    }
  ]
})
