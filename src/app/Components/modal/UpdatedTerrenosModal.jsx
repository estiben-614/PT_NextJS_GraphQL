import { Button, Form, Input, Modal, Select, message } from 'antd';
import React, { useEffect, useState } from 'react'
import { useUpdateTerrenoByIdMutation } from '../../../../redux/api/Terreno/terrenosApi';

export default function UpdatedTerrenosModal({abrirModalTerrenos,cerrarModalTerrenos,modalTerrenos,terreno,refetch}) {
    const [terrenoActualizar, setTerrenoActualizar] = useState({})
    const [updateTerrenoById]=useUpdateTerrenoByIdMutation()

     //Select
     const handleSelectFuentes=(value)=>{
        setTerrenoActualizar({...terrenoActualizar,fuentes_agua:value})
    }
     const handleSelectConstrucciones=(value)=>{
        setTerrenoActualizar({...terrenoActualizar,construcciones:value})
    }

    // Input
    const handleInput = (evento) => {
        const { name, value } = evento.target;
        setTerrenoActualizar({
        ...terrenoActualizar,
        [name]: name === 'valor_comercial' || name === 'area' ? parseFloat(value) : value,
        });

    };

    // Mensajes
    const successMessage = () => {
    message.success('Terreno editado con éxito');
    };

    const errorMessage = () => {
    message.error('Ocurrió un error al editar  el terreno, revise que los datos estén correctos');
    }

    //Acción modal
    const accion=async()=>{
        try {
            console.log(terrenoActualizar)
            if(!terrenoActualizar.area || !terrenoActualizar.valor_comercial ){
                errorMessage()
                return
            }

            else{
                const construccionActualizada=await updateTerrenoById(terrenoActualizar)
                successMessage()
                cerrarModalTerrenos()
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
        setTerrenoActualizar({
            area:terreno.area,
            valor_comercial:terreno.valor_comercial,
            fuentes_agua:terreno.fuentes_agua,
            construcciones:terreno.construcciones,
            id:terreno.id
        });
      }, [terreno]);
    
  return (
    <Modal title={`Editar terreno`} open={modalTerrenos} onOk={cerrarModalTerrenos} onCancel={cerrarModalTerrenos} footer={[
        <Button key="cancelar" type="primary" onClick={cerrarModalTerrenos}>
            Cancelar
        </Button>,
        <Button key="editar" type="primary" onClick={accion}>
            Editar
        </Button>,]}>     

        <Form {...layout}>

                <Form.Item label="* Área [m²]">
                    <Input type='number' name="area"   onChange={handleInput} value={terrenoActualizar.area}></Input>
                </Form.Item>

                <Form.Item label="* Valor comercial">
                    <Input type='number' name="valor_comercial"   onChange={handleInput} value={terrenoActualizar.valor_comercial}></Input>
                </Form.Item>

                <Form.Item label="* Fuentes de agua">
                    <Select onChange={handleSelectFuentes} value={terrenoActualizar.fuentes_agua} allowClear>
                        <Select.Option value={true}>Si</Select.Option>
                        <Select.Option value={false}>No</Select.Option>
                    </Select>
                 </Form.Item>

                <Form.Item label="* Construcciones">
                    <Select onChange={handleSelectConstrucciones} value={terrenoActualizar.construcciones} allowClear>
                        <Select.Option value={true}>Si</Select.Option>
                        <Select.Option value={false}>No</Select.Option>
                    </Select>
                 </Form.Item>

                 
                 
        </Form>

    </Modal>
  )
}
