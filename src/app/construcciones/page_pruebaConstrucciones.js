
'use client'
 
import { useAddConstruccionesByIdPredioMutation, useDeleteConstruccionByIdMutation, useGetConstruccionesByIdPredioQuery, useGetConstruccionesQuery, useUpdateConstruccionByIdMutation } from "../../../redux/api/Construcciones/construccionesApi"

export default  function Home() {

  //Todos los propietarios
//   const {data}=useGetConstruccionesQuery()

  //Propietarios según id predio
//   const {data}=useGetConstruccionesByIdPredioQuery(3620)
//   console.log(data)

  //Boton agregar predio
//   const [addConstruccionesByIdPredio, { isLoading, isError, error }] = useAddConstruccionesByIdPredioMutation()
  
  const onButton=async()=>{
    try{
      const variables={
                area_total:125,
                direccion_terreno:'calle bonita',
                id_predio:3620,
                numero_pisos:10,
                tipo_construccion:'Urbana',
  
      }
  
      const result= await addConstruccionesByIdPredio(variables)
      console.log(result)
    }
    catch(error){
      console.error(error)
    }
  }

  //FIN 
  

  //Boton eliminar predio segun id del propietarop
  const [deleteConstruccionById,{ isLoading, isError, error }]=useDeleteConstruccionByIdMutation()

  const onDelete=async()=>{
  try{
    const result=await deleteConstruccionById(13)
    console.log(result)
  }catch(error){
    console.error(error)
  }
}
//FIN 

//Boton actualizar predio segun ID
const [updateConstruccionById]=useUpdateConstruccionByIdMutation()
const onUpdate = async () => {
  try {

    //Toca recuperar todos los elementos y allí pasar un objeto completo que incluya las modificaciones
    const variables={
        area_total:1452,
        direccion_terreno:'actualizacioncita',
        id:14,     //id de la construccion a actualizar
        numero_pisos:'78945',
        tipo_construccion:'Ruralc',
  }

    const result = await updateConstruccionById(variables);
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
