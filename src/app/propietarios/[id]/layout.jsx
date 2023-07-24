'use client'
import MyBreadcrumb from '@/app/Components/Breadcrump'
import React from 'react'

export default function layout({children,params}) {
  const {id}=params
  return (
    <div>
        <MyBreadcrumb id={id}></MyBreadcrumb>
        {children}
    </div>
  )
}
