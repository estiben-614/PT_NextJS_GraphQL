'use client'
import { Button, Form, Input, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import {useGetPrediosQuery, useUpdatePredioByIdMutation } from '../../../../redux/api/Predios/predioApi'

export const UpdatedPredioModal = ({predio,cerrarModalActualizacion,modalActualizacion,idPredio,refetch}) => {

    //Recuperamos los valores del predio
    const [predioActualizar, setPredioActualizar] = useState({
        nombre: predio.nombre,
        avaluo: predio.avaluo,
        departamento: predio.departamento,
        municipio: predio.municipio,
        id_predio:idPredio
    })   

    
    
    const [updatePredioById]=useUpdatePredioByIdMutation()
    const { refetch } = useGetPrediosQuery();
    

    const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

    const handleInput=(evento)=>{
        const { name, value } = evento.target;
        setPredioActualizar({
          ...predioActualizar,
          [name]: name === 'avaluo' || name === 'numero_predial' ? parseFloat(value) : value,
        });
        console.log(predioActualizar)
        console.log({predioActualizar})
    }
    
    // Mensajes
  const successMessage = () => {
    message.success('Predio actualizado');
  };

  const errorMessage = () => {
    message.error('Ocurrió un error al actualizar el predio, intentelo mas tarde');
  };

    //Acción del modal
    const accion=async()=>{
        try {
            const predioActualizado=await updatePredioById(predioActualizar) 
            if(predioActualizado.data.error ){
                errorMessage();
                return 
              }
              console.log(predioActualizado)
              successMessage();
              refetch()
              cerrarModalActualizacion()
        } catch (error) {
          errorMessage()
            
        }
    }

    //Actualizamos el estado cada vez que se seleccione un predio nuevo
    useEffect(() => {
        setPredioActualizar({
          nombre: predio.nombre,
          avaluo: predio.avaluo,
          departamento: predio.departamento,
          municipio: predio.municipio,
          id_predio: idPredio,
        });
      }, [predio, idPredio]);
    
  return (
    <>  
        <Modal title={`Editar de datos del predio ${predio.nombre}`} open={modalActualizacion} onOk={cerrarModalActualizacion} onCancel={cerrarModalActualizacion} footer={[
                <Button type="primary" onClick={cerrarModalActualizacion}>
                    Cancelar
                </Button>,
                <Button type="primary" onClick={accion}>
                    Editar
                </Button>,
        ]}>
            <Form {...layout} initialValues={{remember: true}}>

                <Form.Item label="Número Predial">
                    <Input type='number' name="numero_predial" onChange={handleInput} value={predio.numero_predial}></Input>
                </Form.Item>
                <Form.Item label="Nombre" >
                    <Input type='text' name="nombre" onChange={handleInput} value={predioActualizar.nombre}></Input>
                </Form.Item>
                <Form.Item label="Avalúo">
                    <Input type='number' name="avaluo" onChange={handleInput} value={predioActualizar.avaluo}></Input>
                </Form.Item>
                <Form.Item label="Departamento">
                    <Input type='text' name="departamento"  onChange={handleInput} value={predioActualizar.departamento}></Input>
                </Form.Item>
                <Form.Item label="Municipio">
                    <Input  name="municipio" type="text" onChange={handleInput} value={predioActualizar.municipio}></Input>
                </Form.Item>
            </Form>


        </Modal>
    </>
  )
}
