'use client'
import React from 'react'
import { useDeleteConstruccionByIdMutation, useGetConstruccionesByIdPredioQuery } from '../../../../redux/api/Construcciones/construccionesApi'
import { TablaConstrucciones } from './TablaConstrucciones'

export default function Construcciones({id}) {
    let construcciones=[]
    //Recuperamos las construcciones según el id del predio
    const {data,refetch}=useGetConstruccionesByIdPredioQuery(id)

    //Función para borrar propietario por id
    const [deleteConstruccionById]=useDeleteConstruccionByIdMutation()

    
    if(data){
      construcciones=data.data.construcciones
    }

  return (
    <TablaConstrucciones construcciones={construcciones} refetch={refetch} deleteConstruccionById={deleteConstruccionById}></TablaConstrucciones>
  )
}
