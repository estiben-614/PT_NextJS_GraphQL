'use client'
import { UpdatedPropietarioModal } from '@/app/Components/modal/UpdatedPropietarioModal';
import { useModal } from '@/app/customHooks/useModal';
import { Button, Space, Table, message } from 'antd'
import { Typography } from 'antd';

const { Title } = Typography;
import React, { useState } from 'react'

export const TablaPropietariosJuridicos = ({propietariosJuridicos,deletePropietarioById,refetch}) => {
    //Modal editar propietario
    const {abrirModal:abrirModalPropietarios, cerrarModal:cerrarModalPropietarios, modal:modalPropietarios}=useModal()

    
    const [propietario, setPropietario] = useState(null)  


    // Mensajes
    const successMessage = () => {
        message.success('Propietario eliminado');
    };

    const errorMessage = () => {
        message.error('Ocurrió un error, intentelo de nuevo');
    };


    //Eliminar propietario según su id
    const handleEliminar=async(id)=>{
        try {
          const propietarioEliminado=await deletePropietarioById(id)
          successMessage()
          refetch()
        } catch (error) {
          errorMessage()
        }
    }

    //Abrir modal y recuperamos al propietario con ese id
    const handleEditar=(id)=>{  
        //Buscamos al propietario con ese ID
        const propietarioById=propietariosJuridicos.find(propietario=>(
            propietario.id==id
        ))
        setPropietario(propietarioById)
        abrirModalPropietarios()
    }
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
                        <Button type='primary' onClick={()=>handleEditar(fila.id)}>Editar</Button>
                        <Button type='primary' danger onClick={()=>(handleEliminar(fila.id))}>Eliminar</Button>
                    </Space>
                </>
            )
        }
        ]
      return (  
        <>  
            <Title>Personas jurídicas</Title>
            <Table  dataSource={propietariosJuridicos} columns={columns} rowKey="id" scroll={{ x: 600 }}></Table>

            {
                (propietario) && (
                    <UpdatedPropietarioModal refetch={refetch} propietario={propietario} abrirModalPropietarios={abrirModalPropietarios} cerrarModalPropietarios={cerrarModalPropietarios} modalPropietarios={modalPropietarios}></UpdatedPropietarioModal>
                )
            }
        </>
        
      )
}
