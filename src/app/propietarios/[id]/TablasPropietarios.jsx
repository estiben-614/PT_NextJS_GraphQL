'use client'
import { useGetPropietariosByIdPredioQuery } from '../../../../redux/api/Propietarios/propietariosApi';
import { TablaPropietariosNaturales } from './TablaPropietariosNaturales';
import { TablaPropietariosJuridicos } from './TablaPropietariosJuridicos';

const TablasPropietarios =  ({ id }) => {
   let propietarios=[]

  //Recuperamos los Propietarios por el ID del predio
  const {data,isLoading}=useGetPropietariosByIdPredioQuery(id)
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
        <TablaPropietariosNaturales propietariosNaturales={propietariosNaturales}></TablaPropietariosNaturales>
        <TablaPropietariosJuridicos propietariosJuridicos={propietariosJuridicos}></TablaPropietariosJuridicos>
    </>
  );
};

export default TablasPropietarios;