'use client'
import { Button, Space, Table } from 'antd'
import { Typography } from 'antd';
const { Title } = Typography;
import React from 'react'


export const TablaPropietariosNaturales = ({propietariosNaturales}) => {
    
    
  const columns=[
    {
    title:'Tipo Documento',
    dataIndex:'tipo_documento_pn',
    key:'tipo_documento_pn'
    },
    {
    title:'Número documento',
    dataIndex:'numero_documento_pn',
    key:'numero_documento_pn'
    },
    {
    title:'Nombre',
    dataIndex:'nombre_pn',
    key:'nombre_pn'
    },
    {
    title:'Apellidos',
    dataIndex:'apellido_pn',
    key:'apellido_pn'
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
        <Title>Personas naturales</Title>
        <Table  dataSource={propietariosNaturales} columns={columns} rowKey="id"></Table>
    
    </>
    
  )
}
