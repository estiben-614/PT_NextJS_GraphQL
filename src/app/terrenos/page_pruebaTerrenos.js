
'use client'

import { useAddTerrenoByIdPredioMutation, useDeleteTerrenoByIdMutation, useGetTerrenosByIdPredioQuery, useGetTerrenosQuery, useUpdateTerrenoByIdMutation } from "../../../redux/api/Terreno/terrenosApi"
// import { useAddPredioMutation, useDeletePredioByIdMutation, useGetPredioByIdQuery, useGetPrediosQuery, useUpdatePredioByIdMutation } from "../../../redux/api/Terreno/terrenosApii"

export default  function Home() {
//   const {data}=useGetTerrenosQuery()

//Busca todos los terrenos relacionados a ese id_predio

//   const {data}=useGetTerrenosByIdPredioQuery(3620)
//   console.log(data)

  //Boton agregar terreno a partir del ID del predio, lo relaciona a este
//   const [addTerrenoByIdPredio, { isLoading, isError, error }] = useAddTerrenoByIdPredioMutation()
  
  const onButton=async()=>{
    try{
      const variables={
                area:1452,
                construcciones:true,
                fuentes_agua:true,
                id_predio:3620, //ID del predio al que se va a agregar
                valor_comercial:1161,
  
      }
  
      const result= await addTerrenoByIdPredio(variables)
      console.log(result)
    }
    catch(error){
      console.error(error)
    }
  }

  //FIN 
  

  //Boton eliminar predio segun el id del terreno
//   const [deleteTerrenoById,{ isLoading, isError, error }]=useDeleteTerrenoByIdMutation()

  const onDelete=async()=>{
  try{
    const result=await deleteTerrenoById(4)
    console.log(result)
  }catch(error){
    console.error(error)
  }
}
//FIN 

//Boton actualizar según el ID del terreno
const [updatePropietarioById]=useUpdateTerrenoByIdMutation()
const onUpdate = async () => {
  try {

    //Toca recuperar todos los elementos y allí pasar un objeto completo que incluya las modificaciones
    const variables={
        area:8888 , 
        construcciones:false,
        fuentes_agua:false,
        id:3, //ID del terreno que se va a actualizar
        valor_comercial:0,
  }

    const result = await updatePropietarioById(variables);
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
