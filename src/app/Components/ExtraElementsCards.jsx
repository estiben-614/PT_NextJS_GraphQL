'use client'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Button, Space, message } from 'antd'
import Link from 'next/link'
import React from 'react'
import { useDeletePredioByIdMutation, useGetPrediosQuery } from '../../../redux/api/Predios/predioApi'

export const ExtraElementsCards = ({abrirModal,idPredio,nombrePredio}) => {

    const [deletePredioById]=useDeletePredioByIdMutation()

    //Obtenemos el refetch
    const { refetch } = useGetPrediosQuery();

    // Mensajes
  const successMessage = () => {
    message.success(`El predio ${nombrePredio} se eliminó con éxito`);
  };

  const errorMessage = () => {
    message.error('Ocurrió un error, intentelo de nuevo');
  };

    const onDeletePredio=async()=>{
        try{
            await deletePredioById(idPredio)
            refetch() //actualizamos
            successMessage()
          }catch(error){
            errorMessage(   )
          }
    }
  return (
    <>
    <Space direction="horizontal" >

        <Button icon={<EditOutlined />} onClick={abrirModal}></Button>
        <Button icon={<DeleteOutlined />} onClick={onDeletePredio}></Button>


        <Link href="#" onClick={abrirModal}>More</Link>
    </Space>
    </>
  )
}
