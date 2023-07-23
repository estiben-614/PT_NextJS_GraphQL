import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

 

const headers={
    'content-type':'application/json',
    'x-hasura-admin-secret': 'CmDz3LW2pLd5vxl3eoN1ij0Vg6XsPnRZdWP8voOoFd1zGKm5tVGnw3rqN0ol1uY5'
}

export const terrenosApi = createApi({

  //Nombre reducer
  reducerPath: 'terrenosApi',
   //graphqlRequestBaseQuery
  baseQuery: fetchBaseQuery({ baseUrl: 'https://massive-bird-19.hasura.app/v1/graphql' }),

  endpoints: (builder) => ({

    getTerrenos: builder.query({
      //Concatena a la URL de arriba
      query: () => ({
         url:'/',
         method:'POST',
         headers:headers,
         body:JSON.stringify({
            query:`
            {
              terrenos {
                area
                construcciones
                fuentes_agua
                id
                id_predio
                valor_comercial
              }
            }
            `
         })
      }),
    }),

    getTerrenosByIdPredio: builder.query({
      query: (id) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          query getTerrenosByIdPredio($_eq: Int!) {
            terrenos(where: { id_predio: { _eq: $_eq } }) {
              area
              construcciones
              fuentes_agua
              id
              id_predio
              valor_comercial
            }
          }
          `,
          variables: {_eq: id },
        })
      })
    }),

    addTerrenoByIdPredio: builder.mutation({
      query: (variables) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          mutation InsertTerrenosMutation(
            $area: numeric!,
            $construcciones: Boolean!,
            $fuentes_agua: Boolean!,
            $id_predio: Int!,
            $valor_comercial: numeric!
          ) {
            insert_terrenos(objects: {
              area: $area,
              construcciones: $construcciones,
              fuentes_agua: $fuentes_agua,
              id_predio: $id_predio,
              valor_comercial: $valor_comercial
            }) {
              returning {
                area
                construcciones
                fuentes_agua
                id
                id_predio
                valor_comercial
              }
            }
          }
          `,
          variables:{...variables},
        }),
      }),
    }),

    deleteTerrenoById:builder.mutation({
      query: (id) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          mutation DeleteTerrenosMutation($id: Int!) {
            delete_terrenos_by_pk(id: $id) {
              area
              construcciones
              fuentes_agua
              id
              id_predio
              valor_comercial
            }
          }
          `,
          variables:{id:id},
        }),
      }),
    }),

    updateTerrenoById:builder.mutation({
      query: (variables) => ({ 
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          mutation UpdateTerrenosMutation(
            $id: Int!,
            $area: numeric!,
            $construcciones: Boolean!,
            $fuentes_agua: Boolean!,
            $valor_comercial: numeric!
          ) {
            update_terrenos_by_pk(
              pk_columns: { id: $id },
              _set: {
                area: $area,
                construcciones: $construcciones,
                fuentes_agua: $fuentes_agua,
                valor_comercial: $valor_comercial
              }
            ) {
              area
              construcciones
              fuentes_agua
              id
              id_predio
              valor_comercial
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
export const { useGetTerrenosQuery,useGetTerrenosByIdPredioQuery,useAddTerrenoByIdPredioMutation,useDeleteTerrenoByIdMutation,useUpdateTerrenoByIdMutation } = terrenosApi