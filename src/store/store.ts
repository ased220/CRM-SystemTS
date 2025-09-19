import { configureStore } from "@reduxjs/toolkit";
import  register from './slices/registrationSlice'
import login from './slices/loginSlice'
import profile from './slices/profileSlice'
import adminUsers from './slices/adminUsersSlice'
import adminUserProfile from './slices/adminUserProfileSlice'

export const store = configureStore({
    reducer: {
        register,
        login,
        profile,
        adminUsers,
        adminUserProfile
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

 