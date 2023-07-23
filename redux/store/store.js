import { configureStore } from "@reduxjs/toolkit";
import { prediosApi } from "../api/Predios/predioApi";
import { propietariosApi } from "../api/Propietarios/propietariosApi";

export default configureStore({
    reducer: {
        //Poner reducers
        [prediosApi.reducerPath]:prediosApi.reducer,
        [propietariosApi.reducerPath]:propietariosApi.reducer,

  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(prediosApi.middleware).concat(propietariosApi.middleware)
})