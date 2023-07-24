  
  import React from 'react'
  import { PrediosPorDepartamento } from './Components/Graficas/PrediosPorDepartamento'
  import { TipoDeConstrucciones } from './Components/Graficas/TipoDeConstrucciones'
  import { Typography } from 'antd';
import Bienvenida from './Components/Bienvenida';
import Graficas from './Components/Graficas/Graficas';
  const { Title } = Typography;
  export default function page() {
    return (
      <>
          <Bienvenida></Bienvenida>
          <Graficas></Graficas>
        
      </>
    )
  }
