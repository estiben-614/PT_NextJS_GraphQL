
'use client'

import { useAddPredioMutation, useDeletePredioByIdMutation, useGetPredioByIdQuery, useGetPrediosQuery, useUpdatePredioByIdMutation } from "../../redux/api/Predios/predioApi"

export default  function Home() {
  // const {data}=useGetPrediosQuery()
  const {data}=useGetPredioByIdQuery(114)
  console.log(data)

  //Boton agregar predio
  // const [addPredio, { isLoading, isError, error }] = useAddPredioMutation()
  
  const onButton=async()=>{
    try{
      const variables={
        avaluo:151,
        nombre:'Prueba ya',
        departamento:'sdf',
        municipio:'sdfs',
        numero_predial:188458
  
      }
  
      const result= await addPredio(variables)
      console.log(result)
    }
    catch(error){
      console.error(error)
    }
  }

  //FIN 
  

  //Boton eliminar predio segun id
  // const [deletePredioById,{ isLoading, isError, error }]=useDeletePredioByIdMutation()

  const onDelete=async()=>{
  try{
    const result=await deletePredioById(3570)
    console.log(result)
  }catch(error){
    console.error(error)
  }
}
//FIN 

//Boton actualizar predio segun ID
const [updatePredioById]=useUpdatePredioByIdMutation()
const onUpdate = async () => {
  try {

    //Toca recuperar todos los elementos y allí pasar un objeto completo que incluya las modificaciones
    const variables={
      id_predio: 244,
      avaluo: 84949,
      departamento: 'Nuevo Departamento 2',
      municipio: 'Nuevo Municipio',
      nombre: 'Nombre Actualizado',
  }

    const result = await updatePredioById(variables);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
};


  
  
  return (
  
  <>
  <h1>Page</h1>
    <button onClick={onButton}>Enviar</button>
    <button onClick={onDelete}>Eliminar</button>
    <button onClick={onUpdate}>Actualizar</button>
  </>
  
  
  )
}
