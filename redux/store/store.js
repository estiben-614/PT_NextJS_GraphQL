import { configureStore } from "@reduxjs/toolkit";
import { prediosApi } from "../api/Predios/predioApi";

export default configureStore({
    reducer: {
        //Poner reducers
        [prediosApi.reducerPath]:prediosApi.reducer,
  },
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(prediosApi.middleware)
})