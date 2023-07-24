'use client'
import React, { useState } from 'react';
import { Button, Form, Input, Modal, message } from 'antd';
import { useAddPredioMutation, useGetPrediosQuery } from '../../../../redux/api/Predios/predioApi';

export const AddPredioModal = () => {
  const { refetch } = useGetPrediosQuery();

  const [addPredio] = useAddPredioMutation();
  const [modal, setModal] = useState(false);
  const [predio, setPredio] = useState({
    numero_predial: null,
    nombre: '',
    avaluo: null,
    departamento: '',
    municipio: '',
  });

  // Input
  const handleInput = (evento) => {
    const { name, value } = evento.target;
    setPredio({
      ...predio,
      [name]: name === 'avaluo' || name === 'numero_predial' ? parseFloat(value) : value,
    });
  };

  // Modal
  const abrirModal = () => {
    setModal(true);
    resetearPredio()
  };

  const resetearPredio = () => {
    setPredio({
        numero_predial: null,
        nombre: '',
        avaluo: null,
        departamento: '',
        municipio: '',
    });
  };

  const cerrarModal = () => {
    setModal(false);
    resetearPredio();
  };
  
 

  // Mensajes
  const successMessage = () => {
    message.success('Predio creado');
  };

  const errorMessage = () => {
    message.error('Ocurrió un error al crear el predio, revise que los datos estén correctos');
  };

  // Accion a realizar
  const accion = async () => {
    //Si crea el predio bien
    try {
      const predioCreado = await addPredio(predio);
      //Si retorna algun error
      if(predioCreado.data.errors || !predio.departamento  || !predio.municipio ){
        errorMessage();
        return 
      }
      successMessage();
      
      refetch(); // Actualizamos
      console.log({ predioCreado });
    } catch (e) {
      errorMessage();
    }
    cerrarModal();
  };
  

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
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }} className='animate__animated animate__fadeInUp'>
          <Button type="primary" onClick={abrirModal}>
            Agregar Predio
          </Button>
      </div>

      <Modal
        title={`Registrar Predio`}
        open={modal}
        onCancel={cerrarModal}
        onOk={cerrarModal}
        footer={[
          <Button key="cancelar" type="primary" onClick={cerrarModal}>
            Cancelar
          </Button>,
          <Button key="crear" type="primary" onClick={accion}>
            Registrar
          </Button>,
        ]}
      >
        <Form {...layout} initialValues={{
      remember: true,
    }}   >

          <Form.Item label="* Número Predial">
            <Input type='number' name="numero_predial" onChange={handleInput} value={predio.numero_predial}></Input>
          </Form.Item>
          <Form.Item label="* Nombre" >
            <Input type='text' name="nombre" onChange={handleInput} value={predio.nombre}></Input>
          </Form.Item>
          <Form.Item label="* Avalúo">
            <Input type='number' name="avaluo" onChange={handleInput} value={predio.avaluo}></Input>
          </Form.Item>
          <Form.Item label="* Departamento">
            <Input type='text' name="departamento"  onChange={handleInput} value={predio.departamento}></Input>
          </Form.Item>
          <Form.Item label="Municipio">
            <Input  name="municipio" type="text" onChange={handleInput} value={predio.municipio}></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
