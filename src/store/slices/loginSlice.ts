import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthData, Token } from "../../types/Interface";
import axios from "axios";
import { authService } from "../../constants/authService";

interface LoginState {
    accessToken: string | null;
    refreshToken: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: LoginState = {
    accessToken: null,
    refreshToken: null,
    status: 'idle',
    error: null,
};

//Это надо будет в папку с константами вытащить после мержа ed-1074
const authApi = axios.create({
    baseURL: 'https://easydev.club/api/v1'
})


export const userLogin = createAsyncThunk(
    'auth/signin',
    async (authData: AuthData, { rejectWithValue }) => {
        try {
            const response = await authApi.post<Token>('/auth/signin',authData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data);
        }
    }
)


const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
    
    },
    extraReducers: (builder) => {
    builder
        .addCase(userLogin.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(userLogin.fulfilled, (state, action) => {
            state.status = 'succeeded';

            console.log('accesToken',action.payload.accessToken);
            authService.setAccessToken( action.payload.accessToken)
            state.refreshToken = action.payload.refreshToken;
            console.log('refreshToken',action.payload.refreshToken)
        })
        .addCase(userLogin.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
            })
    }
})

export default loginSlice.reducer;