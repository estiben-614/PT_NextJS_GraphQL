import { ApartmentOutlined, BankOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
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
            <ApartmentOutlined />
            <span>Construcciones</span>
          </>
        ),
      },
      {
        href: `/terrenos/${id}`,
        title: (
          <>
            <BankOutlined />
            <span>Terreno</span>
          </>
        ),
      },
    ]}
  />
);
export default MyBreadcrumb;