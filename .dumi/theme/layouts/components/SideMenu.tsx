import React, { useContext, useMemo } from 'react'
import { context, Link, NavLink } from 'dumi/theme'
import { Menu } from 'antd'

const { SubMenu, Item: MenuItem } = Menu

/**
 * 渲染菜单
 * @param menuList 菜单列表
 */
const renderMenu = (menuList: any[], p: any[]) => {
  if (!menuList || !menuList.length) {
    return null
  }
  return menuList.map(menu => {
    let newParent = [...p, menu]
    // 菜单若不可见，直接跳过
    if (menu.visible === false) {
      return null
    }

    if (menu.children && menu.children.some(item => item.visible !== false)) {
      return (
        <SubMenu icon={menu.icon} key={menu.path} title={menu.title}>
          {menu.children && renderMenu(menu.children, newParent)}
        </SubMenu>
      )
    } else {
      return (
        <MenuItem icon={menu.icon} key={menu.path}>
          <Link to={menu.path}>{menu.title}</Link>
        </MenuItem>
      )
    }
  })
}

export default function SideMenu(props) {
  console.log(props)
  const {
    config: { mode },
    menu,
    meta
  } = useContext(context)
  const isHiddenMenus =
    Boolean((meta.hero || meta.features || meta.gapless) && mode === 'site') || meta.sidemenu === false || undefined

  const { pathname } = props.location

  if (isHiddenMenus) {
    return null
  }

  const openKeys = useMemo(() => {
    return menu.filter(item => item.children && item.children.length).map(item => item.path)
  }, [menu])

  return (
    <div className="__amiya-menu">
      <Menu mode="inline" selectedKeys={[pathname]} openKeys={openKeys}>
        {renderMenu(menu, [])}
      </Menu>
    </div>
  )
}
