'use client'
import { useModal } from '@/app/customHooks/useModal'
import { Button, Form, Input, Modal, Select, message } from 'antd'
import {  useState } from 'react'

import { useAddConstruccionesByIdPredioMutation, useGetConstruccionesByIdPredioQuery } from '../../../../redux/api/Construcciones/construccionesApi'
export const AddConstruccionModal = ({id}) => {

    //Modal crear construccion
    const {abrirModal:abrirModalConstrucciones, cerrarModal:cerrarModalConstrucciones, modal:modalConstrucciones}=useModal()


    //Mutacion
    const [addConstruccionesByIdPredio]=useAddConstruccionesByIdPredioMutation()
    const {refetch}=useGetConstruccionesByIdPredioQuery(id)

    const [construccion, setConstruccion] = useState({
                area_total:null,
                direccion_terreno:null,
                id_predio:id,
                numero_pisos:null,
                tipo_construccion:null,
    })

    //Select
    const handleSelect=(value)=>{
            setConstruccion({...construccion,tipo_construccion:value})
        }
        
    

     // Input
    const handleInput = (evento) => {
        const { name, value } = evento.target;
        setConstruccion({
        ...construccion,
        [name]: name === 'numero_pisos' || name === 'area_total' ? parseFloat(value) : value,
        });

    };
    
    // Mensajes
    const successMessage = () => {
        message.success('Construcción creada con éxito');
    };
    
    const errorMessage = () => {
        message.error('Ocurrió un error al crear la construcción, revise que los datos estén correctos');
    };

    const reiniciarEstados=()=>{
        setConstruccion({
                area_total:null,
                direccion_terreno:null,
                id_predio:id,
                numero_pisos:null,
                tipo_construccion:null,
        })
        
    }

    //Acción modal
    const accion=async()=>{
        try {
            if(!construccion.area_total || !construccion.direccion_terreno || !construccion.numero_pisos || !construccion.tipo_construccion){
                errorMessage()
            }

            else{
                const construccionCreada=await addConstruccionesByIdPredio(construccion)
                successMessage()
                reiniciarEstados()
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

    

   
  return (
    <>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button type="primary" onClick={abrirModalConstrucciones}>
                Agregar construccion
            </Button>
        </div>

        <Modal title={`Agregar construcción`} open={modalConstrucciones} onCancel={cerrarModalConstrucciones} onOk={cerrarModalConstrucciones} 
                footer={[
                    <Button type="primary" key="cancelar" onClick={cerrarModalConstrucciones}>
                            Cancelar
                    </Button>,
                    <Button type="primary" key="create" onClick={accion}>
                            Agregar
                    </Button>,
                ]}>
            
            <Form {...layout}>
                <Form.Item label="* Tipo de construcción">
                    <Select onChange={handleSelect} value={undefined} allowClear>
                        <Select.Option value="Industrial">Industrial</Select.Option>
                        <Select.Option value="Comercial">Comercial</Select.Option>
                        <Select.Option value="Residencial">Residencial</Select.Option>
                    </Select>
                 </Form.Item>

                 <Form.Item label="* Número de pisos">
                    <Input type='number' name="numero_pisos"   onChange={handleInput} value={construccion.numero_pisos}></Input>
                </Form.Item>

                <Form.Item label="* Área total [m²]">
                     <Input type='number' name="area_total"  onChange={handleInput} value={construccion.area_total}></Input>
                </Form.Item>

                <Form.Item label="* Dirección">
                     <Input type='text' name="direccion_terreno" onChange={handleInput} value={construccion.direccion_terreno}></Input>
                </Form.Item>
                 
            </Form>
        </Modal>
    </>
  )
            }
