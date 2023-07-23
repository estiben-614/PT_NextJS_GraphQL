'use client'
import { Form, Input } from 'antd'
import React from 'react'

export const FormPersonaJuridica = ({handleInput,propietario}) => {
  return (
    <>
                                <Form.Item label="* NIT">
                                    <Input type='number' name="nit_pj"   onChange={handleInput} value={propietario.nit_pj}></Input>
                                </Form.Item>

                                <Form.Item label="* Razón social">
                                    <Input type='text' name="razon_social_pj"  onChange={handleInput} value={propietario.razon_social_pj}></Input>
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
