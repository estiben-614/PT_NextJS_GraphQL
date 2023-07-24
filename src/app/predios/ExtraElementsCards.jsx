'use client'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space, message } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useDeletePredioByIdMutation, useGetPrediosQuery } from '../../../redux/api/Predios/predioApi'

export const ExtraElementsCards = ({idPredio,predio,abrirModalInfo,abrirModalActualizacion}) => {

    const [deletePredioById]=useDeletePredioByIdMutation()

    //Obtenemos el refetch de los predios
    const { refetch } = useGetPrediosQuery();

    // Mensajes
  const successMessage = () => {
    message.success(`El predio ${predio.nombre} se eliminó con éxito`);
  };

  const errorMessage = () => {
    message.error('Ocurrió un error, intentelo de nuevo');
  };

    const onDeletePredio=async()=>{
      const confirmacion=window.confirm('¿Está seguro que desea eliminar el predio')

      if(confirmacion){

        try{

            await deletePredioById(idPredio)
            refetch() //actualizamos
            successMessage()
          }catch(error){
            errorMessage(   )
          }
      }
    }
  return (
    <>
    <Space direction="horizontal" >
        {/* Abre el modal de modal de Actualizacion */}
        <Button icon={<EditOutlined /> }onClick={abrirModalActualizacion} ></Button>
        <Button icon={<DeleteOutlined />} onClick={onDeletePredio}></Button>

        {/* Abre el modal de información */}
        <Link href="#" onClick={abrirModalInfo}>Más</Link>
    </Space>
    </>
  )
}
