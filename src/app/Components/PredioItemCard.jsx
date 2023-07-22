'use client'
import { Modal } from 'antd'
import Card from 'antd/es/card/Card'
import React, { useState } from 'react'
import { ExtraElementsCards } from './ExtraElementsCards'

export const PredioItemCard = ({predio}) => {
    const [modal, setModal] = useState(false)

    const abrirModal=()=>{
        setModal(true)
    }
    const cerrarModal=()=>{
        setModal(false)
    }
  return (
    
    <>
         <Card
                title={predio.nombre}
                extra={<ExtraElementsCards nombrePredio={predio.nombre}idPredio={predio.id_predio} abrirModal={abrirModal}></ExtraElementsCards>}
                style={{
                width: 300}
                }
            >
                <p><strong>Número Predial :</strong> {predio.numero_predial}</p>
                <p><strong>Avalúo:</strong>     $ {predio.avaluo}</p>
                <p><strong>{predio.departamento} , {predio.municipio}</strong></p>
            
            </Card>

            <Modal title={`Información del predio  ${predio.nombre} ` }open={modal} onCancel={cerrarModal} onOk={cerrarModal}>
                <ul>
                    <li><strong>Nombre :</strong> {predio.nombre}</li>
                    <li><strong>Número Predial :</strong> {predio.numero_predial}</li>
                    <li><strong>Departamento</strong> {predio.departamento}</li>
                    <li><strong>Municipio :</strong> {predio.municipio}</li>
                    <li><strong>Avalúo :</strong> ${predio.avaluo}</li>
                    
                </ul>
                    
            </Modal>
    
    </>
  )
}
