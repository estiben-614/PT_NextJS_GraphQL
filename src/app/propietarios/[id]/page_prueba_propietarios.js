
'use client'
 
import { useAddPropietarioByIdPredioMutation, useDeletePropietarioByIdMutation, useGetPropietariosByIdPredioQuery, useGetPropietariosQuery, useUpdatePropietarioByIdMutation } from "../../../../redux/api/Propietarios/propietariosApi"
export default  function Home() {

  //Todos los propietarios
  // const {data}=useGetPropietariosQuery()

  //Propietarios según id predio
  // const {data}=useGetPropietariosByIdPredioQuery(3620)
  // console.log(data)

  //Boton agregar predio
  // const [addPropietarioByIdPredio, { isLoading, isError, error }] = useAddPropietarioByIdPredioMutation()
  
  const onButton=async()=>{
    try{
      const variables={
        apellido_pn:"sfds",
        direccion:"aaaa",
        email:"dfsfs",
        id_predio:3620,
        nit_pj:null,
        nombre_pn:'sdfsd',
        numero_documento_pn:1234,
        razon_social_pj:null,
        telefono:"23423",
        tipo_documento_pn: 'CC',
        tipo_persona:'PN',
  
      }
  
      const result= await addPropietarioByIdPredio(variables)
      console.log(result)
    }
    catch(error){
      console.error(error)
    }
  }

  //FIN 
  

  //Boton eliminar predio segun id del propietarop
  // const [deletePropietarioById,{ isLoading, isError, error }]=useDeletePropietarioByIdMutation()

  const onDelete=async()=>{
  try{
    const result=await deletePropietarioById(12)
    console.log(result)
  }catch(error){
    console.error(error)
  }
}
//FIN 

//Boton actualizar predio segun ID
const [updatePropietarioById]=useUpdatePropietarioByIdMutation()
const onUpdate = async () => {
  try {

    //Toca recuperar todos los elementos y allí pasar un objeto completo que incluya las modificaciones
    const variables={
      apellido_pn:"Fernandez",
        direccion:"Cra 95 ",
        email:"es@gmail.com",
        nit_pj:null,
        nombre_pn:'Estiben',
        numero_documento_pn:1234,
        razon_social_pj:null,
        telefono:"181618",
        tipo_documento_pn: 'CC',
        tipo_persona:'PN',
        id:7 //id de la persona
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
