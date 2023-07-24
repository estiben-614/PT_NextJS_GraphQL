import { ApartmentOutlined, AuditOutlined, BankOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import React from 'react';
const MyBreadcrumb = ({id}) => (
  <Breadcrumb
    items={[
      {
        href: '/',
        title: <HomeOutlined />,
      },
      {
        href: `/predios`,
        title: (
          <>
            <AuditOutlined /> 
            <span>Predios</span>
          </>
        ),
      },
      {
        href: `/propietarios/${id}`,
        title: (
          <>
            <UserOutlined />
            <span>Propietarios</span>
          </>
        ),
      },
      {
        href: `/construcciones/${id}`,
        title: (
          <>
            <BankOutlined />
            <span>Construcciones</span>
          </>
        ),
      },
      {
        href: `/terrenos/${id}`,
        title: (
          <>
            <ApartmentOutlined />
            <span>Terreno</span>
          </>
        ),
      },
    ]}
  />
);
export default MyBreadcrumb;