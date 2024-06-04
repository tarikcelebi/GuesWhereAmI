import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import { thunk } from "redux-thunk";
import placeSlice from "./reducers/placeSlice";


export const store = configureStore({
    reducer:{
        user: userReducer,
        place:placeSlice
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:false})
})

