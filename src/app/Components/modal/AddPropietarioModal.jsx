'use client'
import { useModal } from '@/app/customHooks/useModal'
import { Button, Form, Input, Modal, Select, message } from 'antd'

import {  useState } from 'react'
import { useAddPropietarioByIdPredioMutation, useGetPropietariosByIdPredioQuery, useGetPropietariosQuery } from '../../../../redux/api/Propietarios/propietariosApi'
import { FormPersonaNatural } from './FormPersonaNatural'
import { FormPersonaJuridica } from './FormPersonaJuridica'
export const AddPropietarioModal = ({id}) => {

    //Modal Propietario
    const {abrirModal:abrirModalPropietario,cerrarModal:cerrarModalPropietario,modal:modalPropietario}=useModal()

    //Estados para los tipos de persona
    const [mostrarCamposPN, setMostrarCamposPN] = useState(false)
    const [mostrarCamposPJ, setMostrarCamposPJ] = useState(false)

    //Mutacion
    const [addPropietarioByIdPredio]=useAddPropietarioByIdPredioMutation()
    const {refetch}=useGetPropietariosByIdPredioQuery(id)

    const [propietario, setPropietario] = useState({
        apellido_pn:null,
        direccion:null,
        email:null,
        id_predio:null,
        nit_pj:null,
        nombre_pn:null,
        numero_documento_pn:null,
        razon_social_pj:null,
        telefono:null,
        tipo_documento_pn: null,
        tipo_persona:null,
        id_predio:id
    })

    //Select
    const handleSelect=(value)=>{
        if(value=='PN' || value=='PJ'){
            (value=='PN') ? (setMostrarCamposPN(true),setMostrarCamposPJ(false)):(setMostrarCamposPJ(true),setMostrarCamposPN(false))
            setPropietario({...propietario,tipo_persona:value})
        }
        else if (value=='CC' || value=='Pasaporte'){
            setPropietario({...propietario,tipo_documento_pn:value})
            }
        }
        
    

     // Input
    const handleInput = (evento) => {
        const { name, value } = evento.target;
        setPropietario({
        ...propietario,
        [name]: name === 'avaluo' || name === 'numero_predial' ? parseFloat(value) : value,
        });
        console.log(propietario)

    };
    
    // Mensajes
    const successMessage = () => {
        message.success('Propietario creado con éxito');
    };
    
    const errorMessage = () => {
        message.error('Ocurrió un error al crear el propietario, revise que los datos estén correctos');
    };

    const reiniciarEstados=()=>{
        setPropietario({
            apellido_pn:null,
            direccion:null,
            email:null,
            id_predio:null,
            nit_pj:null,
            nombre_pn:null,
            numero_documento_pn:null,
            razon_social_pj:null,
            telefono:null,
            tipo_documento_pn: null,
            tipo_persona:null,
            id_predio:id
        })
        setMostrarCamposPJ(false)
        setMostrarCamposPN(false)
    }

    //Acción modal
    const accion=async()=>{
        try {
            if(mostrarCamposPN){
                if( !propietario.nombre_pn || !propietario.apellido_pn || !propietario.numero_documento_pn ||!propietario.direccion || !propietario.telefono){
                    errorMessage();
                    return 
                  }
                else{
                    const propietarioCreado=await addPropietarioByIdPredio(propietario)
                }
            }
            else if(mostrarCamposPJ){
                if( !propietario.nit_pj || !propietario.razon_social_pj ||!propietario.direccion || !propietario.telefono){
                    errorMessage();
                    return 
                }
                else{
                    const propietarioCreado=await addPropietarioByIdPredio(propietario)

                }
            }
            
            successMessage()
            reiniciarEstados()
            cerrarModalPropietario()
            refetch()
            
            
        } catch (error) {
            console.log(error)
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

    

   
  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button type="primary" onClick={abrirModalPropietario}>
                Agregar Propietario
            </Button>
        </div>

        <Modal title={`Agregar propietario`} open={modalPropietario} onCancel={cerrarModalPropietario} onOk={cerrarModalPropietario} 
                footer={[
                    <Button type="primary" onClick={cerrarModalPropietario}>
                            Cancelar
                    </Button>,
                    <Button type="primary" onClick={accion}>
                            Crear
                    </Button>,
                ]}>
            
            <Form {...layout}>
                <Form.Item label="Tipo de persona">
                    <Select onChange={handleSelect} value={undefined} allowClear>
                        <Select.Option value="PN">Persona Natural</Select.Option>
                        <Select.Option value="PJ">Persona Jurídica</Select.Option>
                    </Select>
                 </Form.Item>
                 {
                        (mostrarCamposPN) && (
                            <FormPersonaNatural handleInput={handleInput} handleSelect={handleSelect} propietario={propietario}></FormPersonaNatural>)
                    }

                    {
                        (mostrarCamposPJ) && ( <FormPersonaJuridica handleInput={handleInput} propietario={propietario}></FormPersonaJuridica>)
                    }
            </Form>
        </Modal>
    </>
  )
}
