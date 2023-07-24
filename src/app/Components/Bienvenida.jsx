'use client'
import { Button, Typography } from 'antd';
import Link from 'next/link';
const { Title } = Typography;
import 'animate.css';


export default function Bienvenida() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title className='animate__animated animate__fadeInDown'>Bienvenido al Sistema Nacional de Catastro</Title>
      <div style={{ margin: '20px 0' }}>
        <Button type='primary' className='animate__animated animate__fadeInUp'><Link href={'/predios'}>Ir a la gestión de predios</Link></Button>
      </div>
    </div>
  );
}
