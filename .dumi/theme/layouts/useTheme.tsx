import { usePrefersColor } from '@umijs/preset-dumi/lib/theme'
import { Button, Popover, Radio, Space } from 'antd'
import { BgColorsOutlined } from '@ant-design/icons'
import React, { useState, useEffect } from 'react'

function loadCss(href) {
  let before = document.querySelectorAll('.amiya-theme')
  let css = document.createElement('link')
  css.rel = 'stylesheet'
  css.href = href
  css.className = 'amiya-theme'
  document.getElementsByTagName('head')[0].appendChild(css)
  css.onload = () => {
    // 删除之前存在的
    if (before.length) {
      before.forEach(node => node.parentElement.removeChild(node))
    }
  }
}

let linkList = [
  {
    dark: false,
    name: 'default',
    link: 'https://cdn.weipaitang.com/static/public/20211018b15007db-ed5e-07dbed5e-8abf-aad3d6a72fe8.css',
    cn: '默认',
    color: '#1890ff'
  },
  {
    dark: false,
    name: 'cyan',
    link: 'https://cdn.weipaitang.com/static/public/202110186c130751-4fbf-07514fbf-58e5-fcf1245df452.css',
    cn: '明青',
    color: '#13c2c2'
  },
  {
    dark: false,
    name: 'dust',
    link: 'https://cdn.weipaitang.com/static/public/202110181edd98e8-f3aa-98e8f3aa-3531-beb880035c15.css',
    cn: '薄暮',
    color: '#f5222d'
  },
  {
    dark: false,
    name: 'geekblue',
    link: 'https://cdn.weipaitang.com/static/public/20211018e1e32268-56d7-226856d7-0fbc-e532dda50c33.css',
    cn: '极客蓝',
    color: '#2f54eb'
  },
  {
    dark: false,
    name: 'green',
    link: 'https://cdn.weipaitang.com/static/public/20211018b993b9b8-a2f2-b9b8a2f2-cf58-d55fae347a89.css',
    cn: '极光绿',
    color: '#52c41a'
  },
  {
    dark: false,
    name: 'purple',
    link: 'https://cdn.weipaitang.com/static/public/20211018523261b9-1757-61b91757-fc1f-b18ebb64f0dd.css',
    cn: '酱紫',
    color: '#722ed1'
  },
  {
    dark: false,
    name: 'sunset',
    link: 'https://cdn.weipaitang.com/static/public/202110181b845e9b-5c47-5e9b5c47-c9ba-8cc955f9f161.css',
    cn: '日暮',
    color: '#fa8c16'
  },
  {
    dark: false,
    name: 'volcano',
    link: 'https://cdn.weipaitang.com/static/public/20211018a8cf4ded-14cc-4ded14cc-f12d-ef447488990a.css',
    cn: '火山',
    color: '#fa541c'
  },
  {
    dark: true,
    name: 'dark',
    link: 'https://cdn.weipaitang.com/static/public/202110185bac743e-16da-743e16da-0217-b57061dfa4d6.css',
    cn: '默认',
    color: '#1890ff'
  },
  {
    dark: true,
    name: 'dark-cyan',
    link: 'https://cdn.weipaitang.com/static/public/20211018bc9d9124-edc9-9124edc9-a6ad-9719ecd375f2.css',
    cn: '明青',
    color: '#13c2c2'
  },
  {
    dark: true,
    name: 'dark-dust',
    link: 'https://cdn.weipaitang.com/static/public/20211018b441adeb-4c5a-adeb4c5a-b30c-5f1121d866b2.css',
    cn: '薄暮',
    color: '#f5222d'
  },
  {
    dark: true,
    name: 'dark-geekblue',
    link: 'https://cdn.weipaitang.com/static/public/20211018943a56de-376c-56de376c-7736-716c43ac6310.css',
    cn: '极客蓝',
    color: '#2f54eb'
  },
  {
    dark: true,
    name: 'dark-green',
    link: 'https://cdn.weipaitang.com/static/public/20211018d5e6ec26-0fac-ec260fac-c114-397320d773f1.css',
    cn: '极光绿',
    color: '#52c41a'
  },
  {
    dark: true,
    name: 'dark-purple',
    link: 'https://cdn.weipaitang.com/static/public/2021101897a6e441-cba0-e441cba0-4fc2-6e5f2990e32c.css',
    cn: '酱紫',
    color: '#722ed1'
  },
  {
    dark: true,
    name: 'dark-sunset',
    link: 'https://cdn.weipaitang.com/static/public/2021101820be720b-b610-720bb610-105a-0d17f4935c0d.css',
    cn: '日暮',
    color: '#fa8c16'
  },
  {
    dark: true,
    name: 'dark-volcano',
    link: 'https://cdn.weipaitang.com/static/public/20211018d933c1b4-c4d3-c1b4c4d3-620f-adf88d6c5fe1.css',
    cn: '火山',
    color: '#fa541c'
  }
]

export default function ThemeButton(props) {
  const [name, setName] = useState<string>(localStorage.getItem('AMIYA_COLOR') || 'default')
  const [dumiColor, setDumiColor] = usePrefersColor()

  const handleThemeChange = (value: string) => {
    setName(value)
  }

  useEffect(() => {
    let target = linkList.find(item => item.name === name)
    loadCss(target.link)
    localStorage.setItem('AMIYA_COLOR', name)
    if (target.dark) {
      document.body.classList.add('dark')
      setDumiColor('dark')
    } else {
      document.body.classList.remove('dark')
      setDumiColor('light')
    }
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
      <Button className="__amiya-theme" shape="circle" type="primary" icon={<BgColorsOutlined />}></Button>
    </Popover>
  )
}
