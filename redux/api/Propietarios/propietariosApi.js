import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

 

const headers={
    'content-type':'application/json',
    'x-hasura-admin-secret': 'CmDz3LW2pLd5vxl3eoN1ij0Vg6XsPnRZdWP8voOoFd1zGKm5tVGnw3rqN0ol1uY5'
}

export const propietariosApi = createApi({

  //Nombre reducer
  reducerPath: 'propietariosApi',
   //graphqlRequestBaseQuery
  baseQuery: fetchBaseQuery({ baseUrl: 'https://massive-bird-19.hasura.app/v1/graphql' }),

  endpoints: (builder) => ({

    getPropietarios: builder.query({
      //Concatena a la URL de arriba
      query: () => ({
         url:'/',
         method:'POST',
         headers:headers,
         body:JSON.stringify({
            query:`
            {
                  propietarios {
                    apellido_pn
                    direccion
                    email
                    id
                    id_predio
                    nit_pj
                    nombre_pn
                    numero_documento_pn
                    telefono
                    tipo_documento_pn
                    tipo_persona
                    razon_social_pj
                  }
            }
            `
         })
      }),
    }),

    getPropietariosByIdPredio: builder.query({
      query: (id) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          query getPropietariosByIdPredio($_eq: Int!) {
            propietarios(where: {id_predio: {_eq: $_eq}}) {
              apellido_pn
              direccion
              email
              nit_pj
              nombre_pn
              numero_documento_pn
              razon_social_pj
              telefono
              tipo_documento_pn
              tipo_persona
              id_predio
              id
            }
          }
          `,
          variables: {_eq: id },
        })
      })
    }),

    addPropietarioByIdPredio: builder.mutation({
      query: (variables) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          mutation InsertPropietarios(
            $id_predio: Int!,
            $direccion: String!,
            $telefono: String!,
            $tipo_persona: String!,
            $apellido_pn: String,
            $email: String,
            $nit_pj: bigint,
            $nombre_pn: String,
            $numero_documento_pn: bigint,
            $razon_social_pj: String,
            $tipo_documento_pn: String
          ) {
            insert_propietarios(objects: {
              id_predio: $id_predio,
              direccion: $direccion,
              telefono: $telefono,
              tipo_persona: $tipo_persona,
              apellido_pn: $apellido_pn,
              email: $email,
              nit_pj: $nit_pj,
              nombre_pn: $nombre_pn,
              numero_documento_pn: $numero_documento_pn,
              razon_social_pj: $razon_social_pj,
              tipo_documento_pn: $tipo_documento_pn
            }) {
              returning {
                apellido_pn
                direccion
                email
                id_predio
                nit_pj
                nombre_pn
                numero_documento_pn
                razon_social_pj
                telefono
                tipo_documento_pn
                tipo_persona
                id
              }
            }
          }
          `,
          variables:{...variables},
        }),
      }),
    }),

    deletePropietarioById:builder.mutation({
      query: (id) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          mutation deletePropietarioById($id: Int!) {
            delete_propietarios_by_pk(id: $id) {
              apellido_pn
              direccion
              email
              id
              id_predio
              nit_pj
              nombre_pn
              numero_documento_pn
              razon_social_pj
              telefono
              tipo_documento_pn
              tipo_persona
            }
          }
          `,
          variables:{id:id},
        }),
      }),
    }),

    updatePropietarioById:builder.mutation({
      query: (variables) => ({ 
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          mutation UpdatePropietarioById(
            $direccion: String,
            $telefono: String,
            $tipo_persona: String,
            $apellido_pn: String,
            $email: String,
            $nit_pj: bigint,
            $nombre_pn: String,
            $numero_documento_pn: bigint,
            $razon_social_pj: String,
            $tipo_documento_pn: String,
            $id:Int!
          ) {
            update_propietarios_by_pk(
              pk_columns: { id: $id },
              _set: {
                email: $email,
                telefono: $telefono,
                apellido_pn: $apellido_pn,
                direccion: $direccion,
                nit_pj: $nit_pj,
                nombre_pn: $nombre_pn,
                numero_documento_pn: $numero_documento_pn,
                razon_social_pj: $razon_social_pj,
                tipo_documento_pn: $tipo_documento_pn,
                tipo_persona: $tipo_persona
              }
            ) {
              email
              telefono
              apellido_pn
              direccion
              id
              id_predio
              nit_pj
              nombre_pn
              numero_documento_pn
              razon_social_pj
              tipo_documento_pn
              tipo_persona
            }
          }
          `,
          variables:{...variables},
        }),
      }),
    }),


  }),
    
    

    
  })

//createApi crea useCustom de los endpoints
export const { useGetPropietariosQuery,useGetPropietariosByIdPredioQuery,useAddPropietarioByIdPredioMutation,useDeletePropietarioByIdMutation,useUpdatePropietarioByIdMutation } = propietariosApi