import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb, Dropdown, Icon ,message, Avatar } from 'antd';
import { Route, Link } from "react-router-dom";

import ArticleList from "./Article/List";
import ArticleAdd from "./Article/Edit";
import Dashboard from "./Dashboard";
import User from "./User";
import Tags from "./Tags";
import Links from "./Links";

import  { logout }  from '../config/api.js'
import "../static/styles/home.css";

const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

function Home (props) {

  const [ collapsed, setCollapsed ] = useState(false)
  const [ theme ] = useState('light')

  const onCollapsed = () => setCollapsed(!collapsed)

  // const handleClickArticle = e => {
  //   if (e.key === 'addArticle') {
  //     props.history.push('/index/add')
  //   } else {
  //     props.history.push('/index/list')
  //   }
  // }

  const handleLogout = async () => {
    try {
      const resp = await logout();
      message.success(resp.desc);
      props.history.push('/login')
    } catch (error) {
      
    }
  }
  const sider = (
    <Sider theme={theme} collapsible collapsed={collapsed} onCollapse={onCollapsed}>
      <div className="logo">blog</div>
      <Menu defaultSelectedKeys={ ['1'] } mode="inline">

        <Menu.Item key="dashboard">
          <Link to="/index">
            <Icon type="dashboard" />
            <span>工作台</span>
          </Link>
        </Menu.Item>
        
        <Menu.Item key="addArticle">
          <Link to="/index/add">
            <Icon type="edit" />
            <span>写文章</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="articleList">
          <Link to="/index/list">
            <Icon type="unordered-list" />
            <span>文章列表</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="tags">
          <Link to="/index/tags">
            <Icon type="tags" />
            <span>标签</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="link">
          <Link to="/index/links">
            <Icon type="link" />
            <span>友链管理</span>
          </Link>
        </Menu.Item>

        <Menu.Item key="user">
          <Link to="/index/user">
            <Icon type="user" />
            <span>个人中心</span>
          </Link>
        </Menu.Item>

        {/* <SubMenu
          key="sub1"
          onClick={handleClickArticle}
          title={
            <span>
              <Icon type="desktop" />
              <span>文章管理</span>
            </span>
          }
        >
        </SubMenu> */}
      </Menu>
    </Sider>
  )

  const avatarMenu = (
    <Menu>
      <Menu.Item>
        <Icon type="user" />
        <span>个人中心</span>
      </Menu.Item>
      <Menu.Item>
        <Icon type="setting" />
        <span>个人设置</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="10" onClick={handleLogout}>
        <Icon type="logout" />
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      { sider }
      <Layout>
        <Header className="header" >
          <section>
            <div className="sider-trigger" onClick={onCollapsed}>
              { collapsed
                ? <Icon type="menu-unfold" className="menu-fold"/>
                : <Icon type="menu-fold" className="menu-fold"/>
              }
            </div>
            <Breadcrumb>
              <Breadcrumb.Item>后台管理</Breadcrumb.Item>
              <Breadcrumb.Item>工作台</Breadcrumb.Item>
            </Breadcrumb>
          </section>

          <Dropdown className="header-avatar" overlay={avatarMenu}>
            <div>
              <Avatar icon="user" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />
              <span className="username">wencaizhang</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: '16px' }}>
          
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index/" exact  component={Dashboard} />
              <Route path="/index/add/" exact   component={ArticleAdd} />
              <Route path="/index/add/:id"  exact   component={ArticleAdd} />
              <Route path="/index/list/"   component={ArticleList} />
              <Route path="/index/links"   component={Links} />
              <Route path="/index/user"   component={User} />
              <Route path="/index/tags"   component={Tags} />
            </div>
          </div>

        </Content>
        <Footer style={{ textAlign: 'center' }}>blog</Footer>
      </Layout>
    </Layout>
  )
}

export default Home;