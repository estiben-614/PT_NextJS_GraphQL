import React from 'react'
import Construcciones from './Construcciones'
import { AddConstruccionModal } from '@/app/Components/modal/AddConstruccionModal'

export default function page({params}) {
  const {id}=params
 
  
  return (
    <>
      <AddConstruccionModal id={id}></AddConstruccionModal>
      <Construcciones id={id}></Construcciones>
    </>
  )
}
