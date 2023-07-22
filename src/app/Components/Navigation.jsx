'use client'
import React from 'react'
import { routes } from '../helpers/routes'
import Link from 'next/link'
import { Menu } from 'antd'

export const Navigation = () => {
  return (
    <>
     <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}>

              {routes.map(link=>(
                <Menu.Item key={link.route} icon={link.icon}>
                  <Link href={link.route} >{link.label}</Link>
                </Menu.Item>
              ))}
              
            </Menu>
    
    </>
  )
}
