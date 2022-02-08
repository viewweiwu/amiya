import React from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'
import './less/index.less'

export default function Index() {
  return (
    <div className="home-root">
      <div className="hero">
        <h1>
          <span className="title">
            <span className="text">Amiya</span>
            <span className="line"></span>
          </span>
        </h1>
        <div className="desc">
          <p>
            <mark>Ant Design</mark> 的二次封装，提供页面级别的组件，保留原有功能样式，简化使用。
          </p>
        </div>
        <a href="./guild/快速开始" className="btn">
          去使用
          <ArrowRightOutlined />
        </a>
      </div>
      <div className="bg">
        <div className="layer">
          <div className="square square-left"></div>
          <div className="square square-center"></div>
          <div className="square square-top"></div>
          <div className="circle circle-top"></div>
          <div className="circle circle-center"></div>
        </div>
      </div>
    </div>
  )
}
