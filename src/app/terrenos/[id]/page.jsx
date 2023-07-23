import AddTerrenosModal from '@/app/Components/modal/AddTerrenosModal'
import React from 'react'
import Terrenos from './Terrenos'

export default function page({params}) {
    const {id}=params
  return (
    <>
        <AddTerrenosModal id={id}></AddTerrenosModal>
        <Terrenos id={id}></Terrenos>
    </>
  )
}
