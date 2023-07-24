import UpdatedTerrenosModal from '@/app/Components/modal/UpdatedTerrenosModal';
import { useModal } from '@/app/customHooks/useModal';
import { Button, message,Space,Table,Typography } from 'antd';
import Link from 'next/link';

const { Title } = Typography;

import React, { useState } from 'react'

export default function TablaTerrenos({terrenos,deleteTerrenoById,refetch,construcciones:cts}) {
    //Modal editar terreno
  const {abrirModal:abrirModalTerrenos, cerrarModal:cerrarModalTerrenos, modal:modalTerrenos}=useModal()


  
  const [terreno, setTerreno] = useState(null)  

  
  // Mensajes
  const successMessage = () => {
    message.success('Terreno eliminado');
  };

  const errorMessage = () => {
    message.error('Ocurrió un error, intentelo de nuevo');
  };


  //Eliminar terreno según su id
    const handleEliminar=async(id)=>{
        try {
          const terrenoEliminado=await deleteTerrenoById(id)
          successMessage()
          refetch()
        } catch (error) {
          errorMessage()
        }
    }
    //Abrir modal y recuperamos el terreno con ese id
    const handleEditar=async(id)=>{  
        //Buscamos al terreno con ese ID
        const terrenoById=terrenos.find(terreno=>(
            terreno.id==id
        ))
        setTerreno(terrenoById)
        abrirModalTerrenos()
    }

    const columns=[
        {
        title:'Área [m²]',
        dataIndex:'area',
        key:'area'
        },
        {
        title:'Valor comercial',
        dataIndex:'valor_comercial',
        key:'valor_comercial',
        render:(valor_comercial)=>((`$ ${valor_comercial}`))
        },
        {
        title:'Funtes de agua',
        dataIndex:'fuentes_agua',
        key:'fuentes_agua',
        render:(fuentes_agua)=>((fuentes_agua) ? 'SI' : 'NO')
        },
        {
        title:'Construcciones',
        dataIndex:'construcciones',
        key:'construcciones', //Verifica si existen construcciones registradas en ese predio y si no, lo lleva a que las cree
        render:(construcciones,record)=> cts?.data.construcciones.length>0 ? (
          <Link href={`/construcciones/${record.id_predio}`}>Ver construcciones</Link>
        ) : (
          <Link href={`/construcciones/${record.id_predio}`}>Registrar construcciones</Link>
        ),
        },
        {
            title:'Acciones',
            key:'acciones',
            render:(fila)=>(
                <>  
                    <Space size={10}>
                        <Button type='primary' onClick={()=>handleEditar(fila.id)}>Editar</Button>
                        <Button type='primary' danger onClick={()=>handleEliminar(fila.id)}>Eliminar</Button>
                    </Space>
                </>
            )
        }
        ]


  return (

    <>
      <Title>Terreno</Title>
        <Table  dataSource={terrenos} columns={columns} rowKey="id" scroll ={{x:600}}></Table>

        {
                (terreno) && (
                    <UpdatedTerrenosModal refetch={refetch} terreno={terreno} abrirModalTerrenos={abrirModalTerrenos} cerrarModalTerrenos={cerrarModalTerrenos} modalTerrenos={modalTerrenos}></UpdatedTerrenosModal>
                )
        }
    
    </>
  )
}
