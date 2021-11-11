import { usePrefersColor } from '@umijs/preset-dumi/lib/theme'
import { Button, Popover, Radio, Space } from 'antd'
import { BgColorsOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'

function loadCss(target, cb) {
  let before = document.querySelectorAll('.amiya-theme')
  let css = document.createElement('link')
  css.rel = 'stylesheet'
  css.href = `https://sunflower-assets.oss-cn-hangzhou.aliyuncs.com/css/` + target.name + '.css'
  css.className = 'amiya-theme'
  document.getElementsByTagName('head')[0].appendChild(css)
  css.onload = () => {
    // 删除之前存在的
    if (before.length) {
      before.forEach(node => node.parentElement.removeChild(node))
    }
    cb()
  }
}

export let linkList = [
  {
    dark: false,
    name: 'default',
    cn: '默认',
    color: '#1890ff'
  },
  {
    dark: false,
    name: 'cyan',
    cn: '明青',
    color: '#13c2c2'
  },
  {
    dark: false,
    name: 'dust',
    cn: '薄暮',
    color: '#f5222d'
  },
  {
    dark: false,
    name: 'geekblue',
    cn: '极客蓝',
    color: '#2f54eb'
  },
  {
    dark: false,
    name: 'green',
    cn: '极光绿',
    color: '#52c41a'
  },
  {
    dark: false,
    name: 'purple',
    cn: '酱紫',
    color: '#722ed1'
  },
  {
    dark: false,
    name: 'sunset',
    cn: '日暮',
    color: '#fa8c16'
  },
  {
    dark: false,
    name: 'volcano',
    cn: '火山',
    color: '#fa541c'
  },
  {
    dark: true,
    name: 'dark',
    cn: '默认',
    color: '#1890ff'
  },
  {
    dark: true,
    name: 'dark-cyan',
    cn: '明青',
    color: '#13c2c2'
  },
  {
    dark: true,
    name: 'dark-dust',
    cn: '薄暮',
    color: '#f5222d'
  },
  {
    dark: true,
    name: 'dark-geekblue',
    cn: '极客蓝',
    color: '#2f54eb'
  },
  {
    dark: true,
    name: 'dark-green',
    cn: '极光绿',
    color: '#52c41a'
  },
  {
    dark: true,
    name: 'dark-purple',
    cn: '酱紫',
    color: '#722ed1'
  },
  {
    dark: true,
    name: 'dark-sunset',
    cn: '日暮',
    color: '#fa8c16'
  },
  {
    dark: true,
    name: 'dark-volcano',
    cn: '火山',
    color: '#fa541c'
  }
]

export default function ThemeButton(props) {
  const [name, setName] = useState<string>(localStorage.getItem('AMIYA_COLOR') || 'default')
  const [dumiColor, setDumiColor] = usePrefersColor()
  const [loading, setLoading] = useState(false)

  const handleThemeChange = (value: string) => {
    setName(value)
  }

  useEffect(() => {
    let target = linkList.find(item => item.name === name)
    setLoading(true)
    loadCss(target, () => {
      let style = document.createElement('style')
      style.id = 'color'
      style.innerHTML = `
        ::selection {
          background: ${target.color};
          color: #fff;
        }
        .markdown a,
        .__dumi-default-previewer .ant-alert-content a,
        .ay-search-table-footer-actions a {
          color: ${target.color}!important
        }
        ul[role='slug-list'] li > a.active,
        [data-prefers-color=dark] .__dumi-default-layout-toc li a:hover {
          color: ${target.color}!important;
        }
        .__dumi-default-layout-toc li a.active::before {
          background: ${target.color}!important;
        }
        .__dumi-default-search > ul li a:hover {
          color: ${target.color}!important;
        }

      `
      document.head.appendChild(style)
      localStorage.setItem('AMIYA_COLOR', name)
      if (target.dark) {
        document.body.classList.add('dark')
        setDumiColor('dark')
      } else {
        document.body.classList.remove('dark')
        setDumiColor('light')
      }
      setLoading(false)
    })
  }, [name])

  return (
    <Popover
      title="请选择主题色"
      content={
        <Radio.Group value={name} onChange={e => handleThemeChange(e.target.value)}>
          <Space direction="vertical">
            {linkList.map(link => (
              <Radio value={link.name}>
                <Space>
                  <span className="__amiya-theme-color" style={{ background: link.color }}></span>
                  {link.dark ? '暗-' + link.cn : link.cn}
                </Space>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      }
    >
      <Button
        className="__amiya-theme"
        shape="circle"
        type="primary"
        loading={loading}
        icon={<BgColorsOutlined />}
      ></Button>
    </Popover>
  )
}
