'use client'
import { Button, Space, Table } from 'antd'
import { Typography } from 'antd';
const { Title } = Typography;
import React from 'react'

export const TablaPropietariosJuridicos = ({propietariosJuridicos}) => {
    const columns=[
        {
        title:'NIT',
        dataIndex:'nit_pj',
        key:'nit_pj'
        },
        {
        title:'Razón social',
        dataIndex:'razon_social_pj',
        key:'razon_social_pj'
        },
        {
        title:'Dirección',
        dataIndex:'direccion',
        key:'direccion'
        },
        {
        title:'Teléfono',
        dataIndex:'telefono',
        key:'telefono'
        },
        {
        title:'Email',
        dataIndex:'email',
        key:'email'
        },
        {
            title:'Acciones',
            key:'acciones',
            render:(fila)=>(
                <>  
                    <Space size={10}>
                        <Button type='primary'>Editar</Button>
                        <Button type='primary' danger>Eliminar</Button>
                    </Space>
                </>
            )
        }
        ]
      return (  
        <>  
            <Title>Personas jurídicas</Title>
            <Table  dataSource={propietariosJuridicos} columns={columns} rowKey="id"></Table>
        
        </>
        
      )
}
