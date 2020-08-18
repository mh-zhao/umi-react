import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { history } from 'umi'
import { Layout, Menu, Row, Col, Dropdown, Breadcrumb } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  GlobalOutlined,
  BgColorsOutlined
} from '@ant-design/icons';
import style from '../index.less'
import {fullScreen, exitFullscreen} from '@/utils/index'

const { Header } = Layout;

const mapStateToProps = (state:any) => {
  return {
    breadcrumb: state.common.breadcrumb,
    isFull: state.common.isFull,
    collapsed: state.common.collapsed
  }
}

@connect(mapStateToProps)

class MyHeader extends React.Component {
  constructor(props:any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.addEventListener('resize',this.resizeEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeEvent)
  }
  

  toggle = () => {
    const { dispatch, collapsed } = this.props
    dispatch({
      type: 'common/save',
      payload: {collapsed: !collapsed}
    })
  }

  // 全屏
  onFull = () => {
    const { dispatch, isFull } = this.props;
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

  resizeEvent = () => {
    const { dispatch } = this.props;
    const isFull = !!(document.webkitIsFullScreen || document.mozFullScreen || 
        document.msFullscreenElement || document.fullscreenElement
    );
    dispatch({
      type: 'common/save',
      payload: {isFull}
    })
    console.log('1111')
  }
  
  renderBtn = () => {
    return (
      <Menu onClick={this.onBtn} style={{marginTop:15}}>
        <Menu.Item key="0">
          个人中心
        </Menu.Item>
        <Menu.Item key="1">
          退出登录
        </Menu.Item>
      </Menu>
    )
  }

  onBtn = (e:any) => {
    const {key} = e;
    if (key === '1') {
      history.push('/login')
    }
  }

  changeLanguage = () => {

  }

  changeBg = () => {

  }

  render() {
    const { collapsed, breadcrumb, isFull} = this.props;
    return (
      <>
        <Header className={!collapsed ? style['z-layout-header'] : `${style['z-layout-header']} ${style['z-layout-header-collapsed']}`}>
          <Row>
            <Col span={12}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => this.toggle(),
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
              <span onClick={this.onFull}>
              {
                isFull ?
                  <FullscreenExitOutlined />
                  :
                  <FullscreenOutlined />
              }
              </span>

              <BgColorsOutlined onClick={this.changeBg} />
            
              <GlobalOutlined onClick={this.changeLanguage} />

              <Dropdown overlay={this.renderBtn}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  admin <DownOutlined />
                </a>
              </Dropdown>
            </Col>
          </Row>
        </Header>
      </>
    );
  }
}

MyHeader.propTypes = {
  breadcrumb: PropTypes.array,
  isFull: PropTypes.bool,
  collapsed: PropTypes.bool
};

export default MyHeader;