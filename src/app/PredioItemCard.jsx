'use client'
import { Button, Modal, Space } from 'antd'
import Card from 'antd/es/card/Card'
import React, { useState } from 'react'
import { ExtraElementsCards } from './ExtraElementsCards'
import { useModal } from './customHooks/useModal'
import { UpdatedPredioModal } from './Components/modal/updatedPredioModal'
import Link from 'next/link'

export const PredioItemCard = ({predio}) => {
    
    //Para modal de información
    const {abrirModal:abrirModalInfo,cerrarModal:cerrarModalInfo,modal:modalInfo}=useModal()

    //Para modal de actualización
    const {abrirModal:abrirModalActualizacion,cerrarModal:cerrarModalActualizacion,modal:modalActualizacion}=useModal()

  return (
    
    <>
    
         <Card  
                title={predio.nombre}
                extra={<ExtraElementsCards predio={predio} idPredio={predio.id_predio} abrirModalInfo={abrirModalInfo} abrirModalActualizacion={abrirModalActualizacion}></ExtraElementsCards>}
                style={{
                width: 300,
                boxShadow: '1px 2px 4px rgba(0, 0, 0, 0.3)'
                }
                }
            >
                <p><strong>Número Predial :</strong> {predio.numero_predial}</p>
                <p><strong>Avalúo:</strong>     $ {predio.avaluo}</p>
                <p><strong>{predio.departamento} , {predio.municipio}</strong></p>
            
            </Card>
            
            {/* Modal información predios */}
            <Modal title={`Información del predio  ${predio.nombre} ` }open={modalInfo} onCancel={cerrarModalInfo} onOk={cerrarModalInfo}>
                <ul>
                    <li><strong>Nombre :</strong> {predio.nombre}</li>
                    <li><strong>Número Predial :</strong> {predio.numero_predial}</li>
                    <li><strong>Departamento</strong> {predio.departamento}</li>
                    <li><strong>Municipio :</strong> {predio.municipio}</li>
                    <li><strong>Avalúo :</strong> ${predio.avaluo}</li>
                    
                </ul>
            <div>
            <Space size={30} style={{marginTop:20}}>

              <Button type='primary'><Link href={`/propietarios/${predio.id_predio}`}>Ver propietarios</Link></Button>
              <Button type='primary'><Link href={`/construcciones/${predio.id_predio}`}>Ver construcciones</Link></Button>
              <Button type='primary'><Link href={`/terrenos/${predio.id_predio}`}>Ver terrenos</Link></Button>

            </Space>
                
            </div>
                
                    
            </Modal>

            {/* Modal actualización predio */}
            <UpdatedPredioModal idPredio={predio.id_predio} predio={predio}  cerrarModalActualizacion={cerrarModalActualizacion} modalActualizacion={modalActualizacion}></UpdatedPredioModal>
    
    </>
  )
}
