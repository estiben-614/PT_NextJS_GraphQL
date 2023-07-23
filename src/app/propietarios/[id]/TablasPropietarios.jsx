'use client'
import { useDeletePropietarioByIdMutation, useGetPropietariosByIdPredioQuery, useUpdatePropietarioByIdMutation } from '../../../../redux/api/Propietarios/propietariosApi';
import { TablaPropietariosNaturales } from './TablaPropietariosNaturales';
import { TablaPropietariosJuridicos } from './TablaPropietariosJuridicos';

const TablasPropietarios =  ({ id }) => {
   let propietarios=[]

  //Recuperamos los Propietarios por el ID del predio
  const {data,isLoading,refetch}=useGetPropietariosByIdPredioQuery(id)

  //Función para borrar propietario por id
  const [deletePropietarioById]=useDeletePropietarioByIdMutation()

  //Función para actualizar propietario por id
  const [addPropietarioByIdPredio]=useUpdatePropietarioByIdMutation()

  if(data){
    propietarios=data.data.propietarios
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const propietariosNaturales=propietarios.filter(propietario=>(
    propietario.tipo_persona=='PN'
  ))
  
  const propietariosJuridicos=propietarios.filter(propietario=>(
    propietario.tipo_persona=='PJ'
  ))
  
  
  
    


  return (
    <>
        <TablaPropietariosNaturales addPropietarioByIdPredio={addPropietarioByIdPredio} refetch={refetch} deletePropietarioById={deletePropietarioById} propietariosNaturales={propietariosNaturales}></TablaPropietariosNaturales>
        <TablaPropietariosJuridicos addPropietarioByIdPredio={ addPropietarioByIdPredio} refetch={refetch} deletePropietarioById={deletePropietarioById} propietariosJuridicos={propietariosJuridicos}></TablaPropietariosJuridicos>
    </>
  );
};

export default TablasPropietarios;