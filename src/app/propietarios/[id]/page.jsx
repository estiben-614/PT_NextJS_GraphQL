import React from 'react'
import TablasPropietarios from './TablasPropietarios'
import { AddPropietarioModal } from '@/app/Components/modal/AddPropietarioModal'

export default function page({params}) {
    const {id}=params

  return (
    <>      
            <AddPropietarioModal id={id}></AddPropietarioModal>
            <TablasPropietarios id={id} ></TablasPropietarios>

    </>
  )
}

