import { configureStore } from "@reduxjs/toolkit";
import { prediosApi } from "../api/Predios/predioApi";
import { propietariosApi } from "../api/Propietarios/propietariosApi";
import { construccionesApi } from "../api/Construcciones/construccionesApi";
import { terrenosApi } from "../api/Terreno/terrenosApi";

export default configureStore({
    reducer: {
        //Poner reducers
        [prediosApi.reducerPath]:prediosApi.reducer,
        [propietariosApi.reducerPath]:propietariosApi.reducer,
        [construccionesApi.reducerPath]:construccionesApi.reducer,
        [terrenosApi.reducerPath]:terrenosApi.reducer,

  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(prediosApi.middleware).concat(propietariosApi.middleware)
    .concat(construccionesApi.middleware).concat(terrenosApi.middleware)
})