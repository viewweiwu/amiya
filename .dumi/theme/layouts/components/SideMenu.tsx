import React, { useContext, useMemo } from 'react'
import { context, Link } from 'dumi/theme'
import { Menu } from 'antd'

const { ItemGroup, Item: MenuItem } = Menu

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

    if (menu.children && menu.children.some(item => item.visible !== false)) {
      return (
        <ItemGroup key={menu.path} title={menu.title}>
          {menu.children && renderMenu(menu.children, newParent)}
        </ItemGroup>
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
