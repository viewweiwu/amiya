import { defineConfig } from 'dumi'

export default defineConfig({
  title: 'Amiya',
  favicon: '/amiya/images/logo.png',
  logo: '/amiya/images/logo.png',
  outputPath: 'docs-dist',
  publicPath: '/amiya/',
  base: '/amiya/',
  mode: 'site',
  mock: {},
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }
    ]
  ],
  themeConfig: {
    darkSwitch: false
  },
  navs: [
    {
      title: '教程',
      path: '/guild'
    },
    {
      title: '组件',
      path: '/components'
    },
    {
      title: '示例',
      path: '/template'
    },
    {
      title: '更新日志',
      path: '/changelog'
    },
    {
      title: 'GitHub',
      path: 'https://github.com/viewweiwu/amiya'
    }
  ],
  menus: {
    '/guild': [
      {
        path: '/guild/quick-start',
        title: '快速开始',
        meta: {}
      },
      {
        title: '基础使用',
        path: '/guild/normal',
        meta: {},
        children: [
          {
            path: '/guild/normal/form',
            title: 'Form 表单基础',
            meta: {}
          },
          {
            path: '/guild/normal/table',
            title: 'Table 表格基础',
            meta: {}
          }
        ]
      }
    ],
    '/components': [
      {
        title: '表单 Form',
        path: '/components/form',
        meta: {},
        children: [
          {
            path: '/components/form',
            title: 'AyForm 表单',
            meta: {}
          },
          {
            path: '/components/form/ay-dialog-form',
            title: 'AyDialogForm 弹窗表单',
            meta: {}
          },
          {
            path: '/components/form/ay-search',
            title: 'AySearch 查询表单',
            meta: {}
          },
          {
            path: '/components/form/card-group',
            title: 'AyGroupCard 卡片选择',
            meta: {}
          },
          {
            path: '/components/form/date-format',
            title: 'Date 表单日期的格式化',
            meta: {}
          },
          {
            path: '/components/form/card-form',
            title: '卡片表单',
            meta: {}
          },
          {
            path: '/components/form/group-form',
            title: '组合表单',
            meta: {}
          }
        ]
      },
      {
        title: '表格 Table',
        path: '/components/table',
        meta: {},
        children: [
          {
            path: '/components/table',
            title: 'AySearchTable 查询表格',
            meta: {}
          },
          {
            path: '/components/table/ay-search-list',
            title: 'AySearchList 查询列表',
            meta: {}
          },
          {
            path: '/components/table/radio-table',
            title: '单选表格',
            meta: {}
          },
          {
            path: '/components/table/edit-table',
            title: '可编辑表格',
            meta: {}
          },
          {
            path: '/components/table/right-search',
            title: '右侧查询',
            meta: {}
          },
          {
            path: '/components/table/extra-config',
            title: '扩展按钮配置',
            meta: {}
          },
          {
            path: '/components/table/selection-ctrl',
            title: '控制表格选中',
            meta: {}
          },
          {
            path: '/components/table/drawer-dialog',
            title: '新增编辑改侧边',
            meta: {}
          },
          {
            path: '/components/table/disabled-row',
            title: '禁用表格选项',
            meta: {}
          },
          {
            path: '/components/table/sort-filter',
            title: '筛选与排序',
            meta: {}
          },
          {
            path: '/components/table/custom-render',
            title: '自定义渲染列',
            meta: {}
          },
          {
            path: '/components/table/compact-table',
            title: '表头合并',
            meta: {}
          }
        ]
      },
      {
        title: '按钮 Button',
        path: '/components/button',
        meta: {},
        children: [
          {
            path: '/components/button/ay-action',
            title: 'AyAction',
            meta: {}
          },
          {
            path: '/components/button/ay-button',
            title: 'AyButton',
            meta: {}
          },
          {
            path: '/components/button/ay-ctrl',
            title: 'AyCtrl',
            meta: {}
          }
        ]
      },
      {
        path: '/components/ay-card',
        title: 'AyCard',
        meta: {}
      },
      {
        path: '/components/ay-dialog',
        title: 'AyDialog',
        meta: {}
      },
      {
        title: '全局方法',
        path: '/components/Global',
        meta: {},
        children: [
          {
            path: '/components/Global/set-default-search-filter',
            title: 'AySearchTable 全局请求前处理',
            meta: {
              order: 1
            }
          },
          {
            path: '/components/Global/set-default-data-filter',
            title: 'AySearchTable 全局请求返回处理',
            meta: {
              order: 2
            }
          },
          {
            path: '/components/Global/set-search-table-default-value',
            title: 'AySearchTable 全局右侧按钮配置',
            meta: {
              order: 3
            }
          },
          {
            path: '/components/Global/date-shortcut',
            title: 'Date 表单日期快捷选项',
            meta: {}
          },
          {
            path: '/components/Global/register-action',
            title: '注册 action 事件',
            meta: {}
          },
          {
            path: '/components/Global/register-field',
            title: '注册自定义表单类型',
            meta: {}
          },
          {
            path: '/components/Global/register-table-render',
            title: '注册自定义表格渲染列',
            meta: {}
          },
          {
            path: '/components/Global/set-permission-list',
            title: '按钮权限控制',
            meta: {}
          },
          {
            path: '/components/Global/set-search-default-visible-row',
            title: '表格折叠行数设置',
            meta: {}
          },
          {
            path: '/components/Global/set-table-default-props',
            title: '设置表格默认属性',
            meta: {}
          }
        ]
      }
    ],
    '/template': [
      {
        title: '表单 Form',
        path: '/template/form',
        meta: {},
        children: [
          {
            path: '/template/form/coupon',
            title: '创建优惠券表单',
            meta: {}
          },
          {
            path: '/template/form/step-form',
            title: '步骤表单',
            meta: {}
          },
          {
            path: '/template/form/link',
            title: '联动表单',
            meta: {}
          },
          {
            path: '/template/form/setting',
            title: '设置中心模拟界面',
            meta: {}
          }
        ]
      },
      {
        title: '列表 List',
        path: '/template/list',
        meta: {},
        children: [
          {
            path: '/template/list/cnode-list',
            title: 'CNode 列表',
            meta: {}
          },
          {
            path: '/template/list/card-list',
            title: '商品卡片列表',
            meta: {}
          }
        ]
      },
      {
        title: '表格 Table',
        path: '/template/table',
        meta: {},
        children: [
          {
            path: '/template/table/account-list',
            title: '员工管理',
            meta: {}
          },
          {
            path: '/template/table/inline-search',
            title: '查询区域简化',
            meta: {}
          }
        ]
      },
      {
        title: '其它',
        path: '/template/other',
        meta: {},
        children: [
          {
            path: '/template/other/how-to-add-template',
            title: '如何贡献示例',
            meta: {
              order: 1
            }
          }
        ]
      }
    ]
  }
})
