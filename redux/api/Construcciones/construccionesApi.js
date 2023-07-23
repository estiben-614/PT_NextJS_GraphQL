import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

 

const headers={
    'content-type':'application/json',
    'x-hasura-admin-secret': 'CmDz3LW2pLd5vxl3eoN1ij0Vg6XsPnRZdWP8voOoFd1zGKm5tVGnw3rqN0ol1uY5'
}

export const construccionesApi = createApi({

  //Nombre reducer
  reducerPath: 'construccionesApi',
   //graphqlRequestBaseQuery
  baseQuery: fetchBaseQuery({ baseUrl: 'https://massive-bird-19.hasura.app/v1/graphql' }),

  endpoints: (builder) => ({

    getConstrucciones: builder.query({
      //Concatena a la URL de arriba
      query: () => ({
         url:'/',
         method:'POST',
         headers:headers,
         body:JSON.stringify({
            query:`
             {
                construcciones {
                  area_total
                  direccion_terreno
                  id
                  id_predio
                  numero_pisos
                  tipo_construccion
                }
              }
            `
         })
      }),
    }),

    getConstruccionesByIdPredio: builder.query({
      query: (id) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          query getConstruccionesByIdPredio($_eq: Int!) {
            construcciones(where: {id_predio: {_eq: $_eq}}) {
                area_total
                direccion_terreno
                id
                id_predio
                numero_pisos
                tipo_construccion
            }
          }
          `,
          variables: {_eq: id },
        })
      })
    }),

    addConstruccionesByIdPredio: builder.mutation({
      query: (variables) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          mutation InsertConstrucciones(
            $area_total: numeric!,
            $direccion_terreno: String!,
            $id_predio: Int!,
            $numero_pisos: Int!,
            $tipo_construccion: String!
          ) {
            insert_construcciones(objects: {
              area_total: $area_total,
              direccion_terreno: $direccion_terreno,
              id_predio: $id_predio,
              numero_pisos: $numero_pisos,
              tipo_construccion: $tipo_construccion
            }) {
              returning {
                area_total
                direccion_terreno
                id
                id_predio
                numero_pisos
                tipo_construccion
              }
            }
          }
          `,
          variables:{...variables},
        }),
      }),
    }),

    deleteConstruccionById:builder.mutation({
      query: (id) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          mutation deleteConstruccionById($id: Int!) {
            delete_construcciones_by_pk(id: $id) {
              area_total
              direccion_terreno
              id
              id_predio
              numero_pisos
              tipo_construccion
            }
          }
          `,
          variables:{id:id},
        }),
      }),
    }),

    updateConstruccionById:builder.mutation({
      query: (variables) => ({ 
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          mutation UpdateConstruccion(
            $id: Int!,
            $area_total: numeric!,
            $direccion_terreno: String!,
            $numero_pisos: Int!,
            $tipo_construccion: String!
          ) {
            update_construcciones_by_pk(
              pk_columns: { id: $id },
              _set: {
                area_total: $area_total,
                direccion_terreno: $direccion_terreno,
                numero_pisos: $numero_pisos,
                tipo_construccion: $tipo_construccion
              }
            ) {
              area_total
              direccion_terreno
              id
              id_predio
              numero_pisos
              tipo_construccion
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
export const { useGetConstruccionesQuery,useGetConstruccionesByIdPredioQuery,useAddConstruccionesByIdPredioMutation,useDeleteConstruccionByIdMutation,useUpdateConstruccionByIdMutation } = construccionesApi