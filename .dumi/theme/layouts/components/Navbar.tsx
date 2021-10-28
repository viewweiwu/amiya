import type { FC } from 'react';
import React, { useContext } from 'react';
import { Menu } from 'antd';
import { context, Link, NavLink } from 'dumi/theme';
import 'dumi-theme-default/src/components/Navbar.less';

interface INavbarProps {
  location: any;
  selectedKeys: string[];
  navPrefix?: React.ReactNode;
}

const Navbar: FC<INavbarProps> = ({ navPrefix, location, selectedKeys }) => {
  const {
    base,
    config: { mode, title, logo },
    nav: navItems,
  } = useContext(context);

  return (
    <div className="__dumi-default-navbar" data-mode={mode}>
      <span>
        {/* logo & title */}
        <Link
          className="__dumi-default-navbar-logo"
          style={{
            backgroundImage: logo && `url('${logo}')`,
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
                <NavLink to={nav.path === '/components' ? '/components/快速开始' : nav.path} key={nav.path}>
                  {nav.title}
                </NavLink>
              ) : (
                nav.title
              )}
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
};

export default Navbar;
