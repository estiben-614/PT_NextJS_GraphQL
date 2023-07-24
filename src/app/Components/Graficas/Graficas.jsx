'use client'
import React from 'react'
import { PrediosPorDepartamento } from './PrediosPorDepartamento'
import { TipoDeConstrucciones } from './TipoDeConstrucciones'
import Title from 'antd/es/typography/Title'


export default function Graficas() {
    return (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }} className='animate__animated animate__fadeInUp'>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title level={4}>Predios por departamento</Title>
            <PrediosPorDepartamento />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Title level={4}>Tipos de construcciones en predios</Title>
            <TipoDeConstrucciones />
          </div>
        </div>
      </>
    );
  }