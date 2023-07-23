'use client'
import React, { useEffect, useState } from 'react'
import { useAddTerrenoByIdPredioMutation, useGetTerrenosByIdPredioQuery } from '../../../../redux/api/Terreno/terrenosApi'
import { Button, Form, Input, Modal, Select, message } from 'antd'
import { useModal } from '@/app/customHooks/useModal'

export default function AddTerrenosModal({id}) {
  //Modal crear construccion
  const {abrirModal:abrirModalTerrenos, cerrarModal:cerrarModalTerrenos, modal:modalTerrenos}=useModal()
  const [mostrarBtnCrear, setMostrarBtnCrear] = useState(true)

  //Mutacion
  const [addTerrenosByIdPredio]=useAddTerrenoByIdPredioMutation()
  const {data,refetch}=useGetTerrenosByIdPredioQuery(id)
  
  //Condición para mostrar si se muestra o no el btn de crear Terreno
  useEffect(() => {
    if (data && data.data.terrenos && data.data.terrenos.length > 0) {
      console.log({data})
      setMostrarBtnCrear(false);
    } else {
      setMostrarBtnCrear(true);
    }
  }, [data])

  const [terreno, setTerreno] = useState({
            area:null,
            valor_comercial:null,
            fuentes_agua:null,
            construcciones:null,
            id_predio:id
  })


     //Select
     const handleSelectFuentes=(value)=>{
      setTerreno({...terreno,fuentes_agua:value})
  }
   const handleSelectConstrucciones=(value)=>{
    setTerreno({...terreno,construcciones:value})
  }

  // Input
  const handleInput = (evento) => {
      const { name, value } = evento.target;
      setTerreno({
      ...terreno,
      [name]: name === 'valor_comercial' || name === 'area' ? parseFloat(value) : value,
      });

  };

    // Mensajes
  const successMessage = () => {
      message.success('Terreno creado con éxito');
      };
  
  const errorMessage = () => {
      message.error('Ocurrió un error al crear  el terreno, revise que los datos estén correctos');
      }  

  const reiniciarEstados=()=>{
        setTerreno({
          area:null,
          valor_comercial:null,
          fuentes_agua:null,
          construcciones:null,
          id_predio:id

        })
        
    }     

    //Acción modal
    const accion=async()=>{
      try {
          if(!terreno.area || !terreno.valor_comercial){
              errorMessage()
          }

          else{
              const terrenoCreado=await addTerrenosByIdPredio(terreno)
              successMessage()
              reiniciarEstados()
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
  return (
    <>
        {   (mostrarBtnCrear) &&
            (
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <Button type="primary" onClick={abrirModalTerrenos}>
                  Agregar terreno
              </Button>
              </div>
            )
        }
        

        <Modal title={`Editar terreno`} open={modalTerrenos} onOk={cerrarModalTerrenos} onCancel={cerrarModalTerrenos} footer={[
          <Button key="cancelar" type="primary" onClick={cerrarModalTerrenos}>
              Cancelar
          </Button>,
          <Button key="Crear" type="primary" onClick={accion}>
              Crear
          </Button>,]}>     

          <Form {...layout}>

                  <Form.Item label="* Área">
                      <Input type='number' name="area"   onChange={handleInput} value={terreno.area}></Input>
                  </Form.Item>

                  <Form.Item label="* Valor comercial">
                      <Input type='number' name="valor_comercial"   onChange={handleInput} value={terreno.valor_comercial}></Input>
                  </Form.Item>

                  <Form.Item label="* Fuentes de agua">
                      <Select onChange={handleSelectFuentes} value={terreno.fuentes_agua} allowClear>
                          <Select.Option value={true}>Si</Select.Option>
                          <Select.Option value={false}>No</Select.Option>
                      </Select>
                  </Form.Item>

                  <Form.Item label="* Construcciones">
                      <Select onChange={handleSelectConstrucciones} value={terreno.construcciones} allowClear>
                          <Select.Option value={true}>Si</Select.Option>
                          <Select.Option value={false}>No</Select.Option>
                      </Select>
                  </Form.Item>

                  
                  
          </Form>

      </Modal>
    </>
  )
}
