import React from 'react'
import { connect } from 'dva'
import { Layout, Menu } from 'antd'
import {
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import style from './index.less'
import MyHeader from './components/Header'

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const mapStateToProps = (state:any) => {
  return {
    collapsed: state.common.collapsed,
  }
}

const BasicLayout = (props: any) => {
  const { history, location, dispatch, collapsed } = props;
  const { routes } = props.routes[0];
  const defaultSelectedKey = location.pathname || '/'
  // 菜单
  const handleMenuItem = (item:any) => {
    const { key, keyPath } = item;
    console.log('menu', item)
    //面包屑导航
    const breadcrumbData:any[] = [];
    const getRouteTitle = (key:any,menu:any) => {
      menu.map(item => {
        const {path, title, routes} = item;
        if (key === '/') return '';
        if (key === path) {
          return breadcrumbData.unshift(title)
        }
        if (routes) {
          return getRouteTitle(key,routes)
        }
      })
    }
    keyPath.forEach(i => {
      getRouteTitle(i,routes);
    })
    dispatch({
      type: 'common/save',
      payload: {breadcrumb: breadcrumbData,defaultSelectedKey: [key]}
    })
    history.push(key)
  }
  const renderMenu = (menu:any[]):any => {
    return menu.map(item => {
      const { routes, title, path } = item;
      if (path === '/login' || path === '/404') return '';
      if (routes && Array.isArray(routes)) {
        return(
          <SubMenu key={path} icon={<MailOutlined />} title={title}>
            { renderMenu(routes) }
          </SubMenu>
        )
      }
      return(
        <Menu.Item key={path} icon={<UserOutlined />}>
          { title }
        </Menu.Item>
      )
    })
  }

  if (location.pathname === '/login') {
    return (
      <> {props.children} </>
    )
  }

  return (
    <Layout>
      <Sider
        className={style['z-layout-sider']}
        trigger={null} 
        collapsible 
        collapsed={collapsed}
      >
        {/* logo */}
        <div className={style['z-logo']}>{collapsed ? 'React' : 'React UMI'}</div>
        {/* 菜单栏 */}
        <Menu 
          className={style['z-menu']} 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={[defaultSelectedKey]}
          onClick={handleMenuItem}
        >
          { renderMenu(routes) }
        </Menu>

      </Sider>

      <Layout
        className={collapsed ? style['site-layout'] : style['site-layout-collapsed']}
      >
        {/* 顶部导航 */}
        <MyHeader />
        
        {/* 主体内容 */}
        <Content className={style['z-layout-content']}>
          { props.children }
        </Content>
      </Layout>
    </Layout>
  )
}

// BasicLayout.wrappers = ['@/wrappers/auth']

export default connect(mapStateToProps, null)(BasicLayout);