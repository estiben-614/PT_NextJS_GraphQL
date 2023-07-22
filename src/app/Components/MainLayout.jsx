  'use client'
  import React, { useState} from 'react';
  import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
  } from '@ant-design/icons';
  import { Layout, Menu, Button, theme } from 'antd';
  import Link from 'next/link';
import { routes } from '../helpers/routes';
import { Navigation } from './Navigation';

  const { Header, Sider, Content } = Layout;
  const MainLayout = ({children}) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgLayout },
    } = theme.useToken();
  
    return (
      <Layout style={{ minHeight: '100vh' ,margin:0,padding:0 }}>      
      <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Navigation></Navigation>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgLayout
              ,
            }}
          >
            
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />

            
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: 'white',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  };
  export default MainLayout;