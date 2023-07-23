'use client'
import { Form, Input, Select } from 'antd'
import React from 'react'

export const FormPersonaNatural = ({handleInput,handleSelect,propietario}) => {
  return (
    <>
                            <Form.Item label="* Tipo de documento">
                                <Select onChange={handleSelect} value={propietario.tipo_documento_pn}>
                                    <Select.Option value="CC">Cédula de ciudadania</Select.Option>
                                    <Select.Option value="Pasaporte">Pasaporte</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item label="* Número documento">
                                <Input type='number' name="numero_documento_pn"   onChange={handleInput} value={propietario.numero_documento_pn}></Input>
                            </Form.Item>

                            <Form.Item label="* Nombre">
                                <Input type='text' name="nombre_pn"  onChange={handleInput} value={propietario.nombre_pn}></Input>
                            </Form.Item>

                            <Form.Item label="* Apellido">
                                <Input type='text' name="apellido_pn" onChange={handleInput} value={propietario.apellido_pn}></Input>
                            </Form.Item>
                            <Form.Item label="* Dirección">
                                <Input type='text' name="direccion" onChange={handleInput} value={propietario.direccion}></Input>
                            </Form.Item>
                            <Form.Item label="* Teléfono">
                                <Input type='text' name="telefono" onChange={handleInput} value={propietario.telefono}></Input>
                            </Form.Item>
                            <Form.Item label="Email">
                                <Input type='email' name="email" onChange={handleInput} value={propietario.email}></Input>
                            </Form.Item>
                        </>
  )
}
