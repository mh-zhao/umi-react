import React, { useState, useEffect  } from 'react'
import { connect } from 'dva'
import { Layout, Menu, Row, Col, Dropdown, Breadcrumb } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  MailOutlined,
  UserOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import style from './index.less'
import {fullScreen, exitFullscreen} from '@/utils/index'

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const mapStateToProps = (state:any) => {
  return {
    breadcrumb: state.common.breadcrumb,
    isFull: state.common.isFull
  }
}

const BasicLayout = (props: any) => {
  const [collapsed, toggle] = useState(false);
  const { history, location, breadcrumb, isFull, dispatch } = props;
  const { routes } = props.routes[0];
  const usetBtn = (
    <Menu onClick={(e) => onUserBtn(e)} style={{marginTop:15}}>
      <Menu.Item key="0">
        个人中心
      </Menu.Item>
      <Menu.Item key="1">
        退出登录
      </Menu.Item>
    </Menu>
  )
  const onUserBtn = (e:any) => {
    (e:any) => e.preventDefault()
    if(e.key === '1') {
      history.push('/login');
    }
  }
  // 菜单
  const handleMenuItem = (item:any) => {
    const { key, keyPath } = item;
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
      payload: {breadcrumb: breadcrumbData}
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
  // 全屏
  const onFull = () => {
    dispatch({
      type: 'common/save',
      payload: {isFull: !isFull}
    })
    if (isFull) {
      exitFullscreen()
    } else {
      fullScreen();
    }
  }

  const resizeEvent = () => {
    const isFull = !!(document.webkitIsFullScreen || document.mozFullScreen || 
        document.msFullscreenElement || document.fullscreenElement
    );
    dispatch({
      type: 'common/save',
      payload: {isFull}
    })
    console.log('1111')
  }
  window.addEventListener('resize',resizeEvent);

  const changeLanguage = () => {
    window.removeEventListener('resize', resizeEvent)
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
          defaultSelectedKeys={['/']}
          onClick={handleMenuItem}
        >
          { renderMenu(routes) }
        </Menu>

      </Sider>

      <Layout
        className={collapsed ? style['site-layout'] : style['site-layout-collapsed']}
      >
        {/* 顶部导航 */}
        <Header className={!collapsed ? style['z-layout-header'] : `${style['z-layout-header']} ${style['z-layout-header-collapsed']}`}>
          <Row>
            <Col span={12}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => toggle(!collapsed),
              })}
              {/* 面包屑导航 */}
              <Breadcrumb className={style['z-breadcrumb']}>
                <Breadcrumb.Item><a href="">首页</a></Breadcrumb.Item>
                {
                  breadcrumb.map((item, index) => {
                    return (
                      <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                    )
                  })
                }
              </Breadcrumb>

            </Col>
            <Col span={12} className={style['z-header-right']}>
              <span onClick={onFull}>
              {
                isFull ?
                  <FullscreenExitOutlined />
                  :
                  <FullscreenOutlined />
              }
              </span>
            
            <GlobalOutlined onClick={changeLanguage} />

              <Dropdown overlay={usetBtn}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  admin <DownOutlined />
                </a>
              </Dropdown>
            </Col>
          </Row>
        </Header>
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