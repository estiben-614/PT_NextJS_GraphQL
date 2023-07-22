import { Modal } from 'antd'
import React, { useState } from 'react'

export const useModal = () => {

    const [modal, setModal] = useState(false)

    const abrirModal=()=>{
        setModal(true)
    }
    const cerrarModal=()=>{
        setModal(false)
    }

  return {
    abrirModal,
    cerrarModal,
    modal,
    setModal
  }
}
