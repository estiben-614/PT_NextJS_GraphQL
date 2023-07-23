'use client'
import { Button, Form, Modal, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { FormPersonaJuridica } from './FormPersonaJuridica'
import { useUpdatePropietarioByIdMutation } from '../../../../redux/api/Propietarios/propietariosApi'
import { FormPersonaNatural } from './FormPersonaNatural'

export const UpdatedPropietarioModal = ({abrirModalPropietarios,cerrarModalPropietarios,modalPropietarios,propietario,refetch}) => {
    const [propietarioActualizar, setPropietarioActualizar] = useState({})
    const [updatePropietarioById]=useUpdatePropietarioByIdMutation()

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
        setPropietarioActualizar({
          ...propietarioActualizar,
          [name]: name === 'avaluo' || name === 'numero_predial' ? parseFloat(value) : value,
        });
    }

    // Mensajes
    const successMessage = () => {
        message.success('Predio actualizado');
    };

    const errorMessage = () => {
        message.error('Ocurrió un error al actualizar el predio, intentelo mas tarde');
    };

    
    //accion modal
    const accion=async()=>{
        
        try {

            if(propietarioActualizar.tipo_persona=='PN'){
                if( !propietarioActualizar.nombre_pn || !propietarioActualizar.apellido_pn || !propietarioActualizar.numero_documento_pn ||!propietarioActualizar.direccion || !propietarioActualizar.telefono){
                    errorMessage();
                    return 
                  }
                else{
                    const propietarioActualizado=await updatePropietarioById(propietarioActualizar)

                }
                }
                else if(propietarioActualizar.tipo_persona=='PJ'){
                    if( !propietarioActualizar.nit_pj || !propietarioActualizar.razon_social_pj ||!propietarioActualizar.direccion || !propietarioActualizar.telefono){
                        errorMessage();
                        return 
                    }
                    else{
                        const propietarioActualizado=await updatePropietarioById(propietarioActualizar)
    
                    }
                }
              successMessage();
              refetch()
              cerrarModalPropietarios()
              setPropietarioActualizar({...propietarioActualizar,tipo_persona:undefined})
        } catch (error) {
            errorMessage()
        }
    }

    

    //Actualizamos el estado cada vez que se seleccione un propietario nuevo
    useEffect(() => {
        setPropietarioActualizar({
            apellido_pn:propietario.apellido_pn,
            direccion:propietario.direccion,
            email:propietario.email,
            nit_pj:propietario.nit_pj,
            nombre_pn:propietario.nombre_pn,
            numero_documento_pn:propietario.numero_documento_pn,
            razon_social_pj:propietario.razon_social_pj,
            telefono:propietario.telefono,
            tipo_persona:propietario.tipo_persona,
            tipo_documento_pn:propietario.tipo_documento_pn,
            id:propietario.id
        });
      }, [propietario]);

     //Select
     const handleSelect=(value)=>{
            setPropietarioActualizar({...propietarioActualizar,tipo_documento_pn:value})
        }
  return (
    <Modal title={`Editar propietario`} open={modalPropietarios} onOk={cerrarModalPropietarios} onCancel={cerrarModalPropietarios} footer={[
        <Button key="cancelar" type="primary" onClick={cerrarModalPropietarios}>
            Cancelar
        </Button>,
        <Button key="editar" type="primary" onClick={accion}>
            Editar
        </Button>,]}>     

        <Form {...layout}> 
            {   //Si es una persona juridica 
                (propietario.tipo_persona=='PJ') && (
                    <FormPersonaJuridica handleInput={handleInput} propietario={propietarioActualizar}></FormPersonaJuridica>
                )
            }

            {   //Si es una persona natural 
                (propietario.tipo_persona=='PN') && (
                    <FormPersonaNatural handleSelect={handleSelect} handleInput={handleInput} propietario={propietarioActualizar}></FormPersonaNatural>
                )
            }

        </Form>

    </Modal>
  )
}
