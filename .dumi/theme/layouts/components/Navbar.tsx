import React, { useContext, useState } from 'react'
import { Menu } from 'antd'
import { context, Link, NavLink } from 'dumi/theme'
import 'dumi-theme-default/src/components/Navbar.less'

const Navbar = ({ navPrefix, location, selectedKeys }) => {
  const {
    base,
    config: { mode, title, logo },
    nav: navItems
  } = useContext(context)

  return (
    <div className="__dumi-default-navbar" data-mode={mode}>
      <span>
        {/* logo & title */}
        <Link
          className="__dumi-default-navbar-logo"
          style={{
            backgroundImage: logo && `url('${logo}')`
          }}
          to={base}
          data-plaintext={logo === false || undefined}
        >
          {title}
        </Link>

        {navPrefix}
      </span>
      {/* nav */}
      <Menu mode="horizontal" selectedKeys={selectedKeys} className="__amiya-nav">
        {navItems.map(nav => {
          return (
            <Menu.Item key={nav.path}>
              {nav.path ? (
                <NavLink to={nav.path} key={nav.path}>
                  {nav.title}
                </NavLink>
              ) : (
                nav.title
              )}
            </Menu.Item>
          )
        })}
      </Menu>
    </div>
  )
}

export default Navbar
