import { configureStore } from "@reduxjs/toolkit";
import  register from './slices/registrationSlice'
import login from './slices/loginSlice'
import profile from './slices/profileSlice'

export const store = configureStore({
    reducer: {
        register,
        login,
        profile
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

 