import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserRegistration } from "../../types/authInterface";
import { registrationRequest } from "../../api/authApi";


interface RegisterState {
  user: UserRegistration | null;
  status: number | null;
}

const initialState: RegisterState = {
  user: null,
  status: null,
};



export const userRegistration = createAsyncThunk(
    'auth/signup',
    async ( userData: UserRegistration ) =>{
        return await registrationRequest(userData);
    }
)


const registrationSlice = createSlice({
    name:'register',
    initialState,
    reducers:{ 
        resetStatus: (state) => {
      state.status = null;
    }
    },
    extraReducers: ( builder ) => {
        builder
        .addCase(userRegistration.pending,(state)=>{
            state.status = null;
        })
        .addCase(userRegistration.fulfilled,(state, action )=>{
            state.status = action.payload;
        })    
}})
    

export const { resetStatus } = registrationSlice.actions;

export default registrationSlice.reducer

