'use client'

import {  Space } from 'antd'
import React  from 'react'
import { PredioItemCard } from './PredioItemCard'
import { useGetPrediosQuery } from '../../redux/api/Predios/predioApi'

export const PrediosCard = () => {
    let predios=null
    

    //Recuperamos los predios
    const {data}=useGetPrediosQuery()
    if(data){
        const {predio}=data.data
        predios=predio
        console.log(data)
        
    }

   
    
  return (
    <>

    {   (predios) &&
        predios.map(predio=>(
            <Space direction="horizontal" style={{
                margin:20
            }}  >
                
               <PredioItemCard predio={predio}></PredioItemCard>
          </Space>
        ))
    }


    
    
    </>
  )
}