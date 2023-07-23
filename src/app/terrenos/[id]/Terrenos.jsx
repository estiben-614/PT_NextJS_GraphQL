'use client'
import React from 'react'
import { useDeleteTerrenoByIdMutation, useGetTerrenosByIdPredioQuery } from '../../../../redux/api/Terreno/terrenosApi'
import TablaTerrenos from './TablaTerrenos'
import { useGetConstruccionesByIdPredioQuery } from '../../../../redux/api/Construcciones/construccionesApi'

export default function Terrenos({id}) {
    let terrenos=[]
    //Recuperamos las terrenos según el id del predio
    const {data,refetch}=useGetTerrenosByIdPredioQuery(id)

    //Función para borrar terreno por id
    const [deleteTerrenoById]=useDeleteTerrenoByIdMutation()

    //Función para vetificar si los terrenos tienes construcciones
    const {data:construcciones}=useGetConstruccionesByIdPredioQuery(id)

    
    if(data){
        terrenos=data.data.terrenos
    }

  return (
    <TablaTerrenos construcciones={construcciones} terrenos={terrenos} refetch={refetch} deleteTerrenoById={deleteTerrenoById}></TablaTerrenos>
  )
}
