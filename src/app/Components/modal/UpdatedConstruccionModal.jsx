'use client'
import { Button, Form, Input, Modal, Select, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useUpdateConstruccionByIdMutation } from '../../../../redux/api/Construcciones/construccionesApi'

export const UpdatedConstruccionModal = ({abrirModalConstrucciones,cerrarModalConstrucciones,modalConstrucciones,construccion,refetch}) => {
    const [construccionActualizar, setConstruccionActualizar] = useState({})
    const [updateConstruccionById]=useUpdateConstruccionByIdMutation()
    
     //Select
     const handleSelect=(value)=>{
        setConstruccionActualizar({...construccionActualizar,tipo_construccion:value})
    }

    // Input
    const handleInput = (evento) => {
        const { name, value } = evento.target;
        setConstruccionActualizar({
        ...construccionActualizar,
        [name]: name === 'numero_pisos' || name === 'area_total' ? parseFloat(value) : value,
        });

    };
   // Mensajes
   const successMessage = () => {
    message.success('Construcción editada con éxito');
    };

    const errorMessage = () => {
    message.error('Ocurrió un error al editar  la construcción, revise que los datos estén correctos');
    };

    

    //Acción modal
    const accion=async()=>{
        try {
            console.log(construccionActualizar)
            if(!construccionActualizar.area_total || !construccionActualizar.direccion_terreno || !construccionActualizar.numero_pisos || !construccionActualizar.tipo_construccion){
                errorMessage()
                return
            }

            else{
                const construccionActualizada=await updateConstruccionById(construccionActualizar)
                successMessage()
                cerrarModalConstrucciones()
                refetch()
            }
            
            
        } catch (error) {
            errorMessage()
        }

    }

    const layout = {
        labelCol: {
        span: 8,
        },
        wrapperCol: {
        span: 16,
        },
    };
    //Actualizamos el estado cada vez que se seleccione una construccion  nuevo
    useEffect(() => {
        setConstruccionActualizar({
            area_total:construccion.area_total,
            direccion_terreno:construccion.direccion_terreno,
            numero_pisos:construccion.numero_pisos,
            tipo_construccion:construccion.tipo_construccion,
            id:construccion.id
        });
      }, [construccion]);


  return (
    <Modal title={`Editar construcción`} open={modalConstrucciones} onOk={cerrarModalConstrucciones} onCancel={cerrarModalConstrucciones} footer={[
        <Button key="cancelar" type="primary" onClick={cerrarModalConstrucciones}>
            Cancelar
        </Button>,
        <Button key="editar" type="primary" onClick={accion}>
            Editar
        </Button>,]}>     

        <Form {...layout}>
                <Form.Item label="* Tipo de construcción">
                    <Select onChange={handleSelect} value={construccionActualizar.tipo_construccion} allowClear>
                        <Select.Option value="Industrial">Industrial</Select.Option>
                        <Select.Option value="Comercial">Comercial</Select.Option>
                        <Select.Option value="Residencial">Residencial</Select.Option>
                    </Select>
                 </Form.Item>

                 <Form.Item label="* Número de pisos">
                    <Input type='number' name="numero_pisos"   onChange={handleInput} value={construccionActualizar.numero_pisos}></Input>
                </Form.Item>

                <Form.Item label="* Área total">
                     <Input type='number' name="area_total"  onChange={handleInput} value={construccionActualizar.area_total}></Input>
                </Form.Item>

                <Form.Item label="* Dirección">
                     <Input type='text' name="direccion_terreno" onChange={handleInput} value={construccionActualizar.direccion_terreno}></Input>
                </Form.Item>
                 
        </Form>

    </Modal>
  )
}
