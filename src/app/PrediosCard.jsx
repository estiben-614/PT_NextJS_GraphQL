'use client'

import {  Space } from 'antd'
import React  from 'react'
import { PredioItemCard } from './PredioItemCard'
import { useGetPrediosQuery } from '../../redux/api/Predios/predioApi'

export const PrediosCard = () => {
    let predios=null
    

    //Recuperamos los predios
    const {data,isLoading}=useGetPrediosQuery()
    if(data){
        const {predio}=data.data
        predios=predio
        
    }
    // if(isLoading){
    //   return <><h1>Cargando...</h1></>
    // }

   
    
  return (
    <>
    <marquee style={{marginTop:20}}>Para información de propietarios,construcciones y terrenos de click en más.</marquee>
    {   (predios) &&
        predios.map(predio=>(
            <Space direction="horizontal" style={{margin:20 }}  key={predio.id_predio} >
                
               <PredioItemCard  predio={predio}></PredioItemCard>
          </Space>
        ))
    }


    
    
    </>
  )
}
