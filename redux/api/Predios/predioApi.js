import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

 

const headers={
    'content-type':'application/json',
    'x-hasura-admin-secret': 'CmDz3LW2pLd5vxl3eoN1ij0Vg6XsPnRZdWP8voOoFd1zGKm5tVGnw3rqN0ol1uY5'
}

export const prediosApi = createApi({

  //Nombre reducer
  reducerPath: 'prediosApi',
   //graphqlRequestBaseQuery
  baseQuery: fetchBaseQuery({ baseUrl: 'https://massive-bird-19.hasura.app/v1/graphql' }),

  endpoints: (builder) => ({

    getPredios: builder.query({
      //Concatena a la URL de arriba
      query: () => ({
         url:'/',
         method:'POST',
         headers:headers,
         body:JSON.stringify({
            query:`
            {
                  predio {
                    avaluo
                    departamento
                    id_predio
                    municipio
                    nombre
                    numero_predial
                  }
            }
            `
         })
      }),
    }),

    getPredioById: builder.query({
      query: (id) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
            query getPredioById($id: Int!) {
              predio_by_pk(id_predio: $id) {
                avaluo
                departamento
                id_predio
                municipio
                nombre
                numero_predial
              }
            }
          `,
          variables: { id: id },
        })
      })
    }),

    addPredio: builder.mutation({
      query: (variables) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
            mutation addPredio(
              $avaluo: numeric!,
              $departamento: String!,
              $municipio: String!,
              $nombre: String!,
              $numero_predial: bigint!,
            ) {
              insert_predio(objects: {
                avaluo: $avaluo,
                departamento: $departamento,
                municipio: $municipio,
                nombre: $nombre,
                numero_predial: $numero_predial,
              }) {
                returning {
                  id_predio
                  numero_predial
                }
              }
            }
          `,
          variables:{...variables},
        }),
      }),
    }),

    deletePredioById:builder.mutation({
      query: (id_predio) => ({
        url: '/',
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          mutation DeletePredioById($id_predio: Int!) {
            delete_predio_by_pk(id_predio: $id_predio) {
              nombre
              numero_predial
              municipio
              id_predio
              departamento
              avaluo
            }
          }
          `,
          variables:{id_predio:id_predio},
        }),
      }),
    }),

    updatePredioById:builder.mutation({
      query: (variables) => ({ 
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          query: `
          mutation UpdatePredioById(
            $id_predio: Int!, 
            $avaluo: numeric!,
              $departamento: String!,
              $municipio: String!,
              $nombre: String!,
          ) {
            update_predio_by_pk(
              pk_columns: { id_predio: $id_predio },
              _set: {
                avaluo: $avaluo,
                departamento: $departamento,
                municipio: $municipio,
                nombre: $nombre,
              }
            ) {
              id_predio
              avaluo
              departamento
              municipio
              nombre
              numero_predial
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
export const { useGetPrediosQuery,useGetPredioByIdQuery,useAddPredioMutation,useDeletePredioByIdMutation,useUpdatePredioByIdMutation } = prediosApi