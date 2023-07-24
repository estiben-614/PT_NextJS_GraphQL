'use client'
import { UpdatedConstruccionModal } from '@/app/Components/modal/UpdatedConstruccionModal';
import { useModal } from '@/app/customHooks/useModal';
import { Button, Space, Table, message } from 'antd'
import { Typography } from 'antd';
const { Title } = Typography;
import React, { useState } from 'react'


export const TablaConstrucciones = ({construcciones,deleteConstruccionById,refetch}) => {

  //Modal editar construccion
  const {abrirModal:abrirModalConstrucciones, cerrarModal:cerrarModalConstrucciones, modal:modalConstrucciones}=useModal()

    
  const [construccion, setConstruccion] = useState(null)  

  // Mensajes
  const successMessage = () => {
    message.success('Construcción eliminada');
  };

  const errorMessage = () => {
    message.error('Ocurrió un error, intentelo de nuevo');
  };


  //Eliminar construccion según su id
    const handleEliminar=async(id)=>{

      const confirmacion=window.confirm('¿Está seguro que desea eliminar la construcción')
      if(confirmacion){
        
        try {
          const construccionEliminado=await deleteConstruccionById(id)
          successMessage()
          refetch()
        } catch (error) {
          errorMessage()
        }
      }
    }

    //Abrir modal y recuperamos al construccion con ese id
    const handleEditar=(id)=>{  
      //Buscamos al construccion con ese ID
      const construccionById=construcciones.find(construccion=>(
          construccion.id==id
      ))
      
      setConstruccion(construccionById)
      abrirModalConstrucciones()
  }
  const columns=[
    {
    title:'Tipo de construcción',
    dataIndex:'tipo_construccion',
    key:'tipo_construccion'
    },
    {
    title:'Número de pisos',
    dataIndex:'numero_pisos',
    key:'numero_pisos'
    },
    {
    title:'Área total [m²]',
    dataIndex:'area_total',
    key:'area_total'
    },
    {
    title:'Dirección',
    dataIndex:'direccion_terreno',
    key:'direccion_terreno'
    },
    {
        title:'Acciones',
        key:'acciones',
        render:(fila)=>(
            <>  
                <Space size={10}>
                    <Button type='primary' onClick={()=>handleEditar(fila.id)}>Editar</Button>
                    <Button type='primary' danger onClick={()=>handleEliminar(fila.id)}>Eliminar</Button>
                </Space>
            </>
        )
    }
    ]
  return (  
    <>  
        <Title>Construcciones</Title>
        <Table  dataSource={construcciones} columns={columns} rowKey="id" scroll ={{x:600}}></Table>

        {
                (construccion) && (
                    <UpdatedConstruccionModal refetch={refetch} construccion={construccion} abrirModalConstrucciones={abrirModalConstrucciones} cerrarModalConstrucciones={cerrarModalConstrucciones} modalConstrucciones={modalConstrucciones}></UpdatedConstruccionModal>
                )
        }
    </>
    
  )
}
