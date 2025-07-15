import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AuthData   } from "../../types/Interface";
import { authService } from "../../constants/authService";
import {loginRequest, refreshTokenUpdateRequest } from "../../api/authApi";

interface LoginState {
    isLogin: boolean;
    statusLogin:number | null;
    statusToken:number | null;
}

const initialState: LoginState = {
    isLogin: false,
    statusLogin: null,
    statusToken: null,
};  


export const userLoginAction = createAsyncThunk(
  'auth/signin',
  async (authData: AuthData, {rejectWithValue} ) => {
    try {
        return await loginRequest(authData);        
    } catch (error) {

        if (typeof error === 'object' && error !== null && 'status' in error) {
            return rejectWithValue((error as {status: number}).status);
        }      
    };
    }    
);

export const refreshTokenAction = createAsyncThunk(
    'auth/refresh',
    async (refToken:string, {rejectWithValue}) => {
        try {
            const result = await refreshTokenUpdateRequest(refToken);
            
            return result;

        } catch (error) {
            if (typeof error === 'object' && error !== null && 'status' in error) {
                return rejectWithValue((error as {status: number}).status);
            }
            return rejectWithValue(500);        }
    }
)


const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        logout: (state) => {
            state.statusLogin = null;
            state.statusToken = null;
            localStorage.removeItem('refreshToken');
            authService.clearAccessToken();
            state.isLogin = false
        },
        resetStatusLogin: (state) => {
            state.statusLogin = null;
        },
        resetStatusToken: (state) => {
            state.statusToken = null;
        },
    },
    extraReducers: (builder) => {
    builder
        // .addCase(userLoginAction.pending, (state) => {
        //     // state.statusLogin = null;
        // })
        .addCase(userLoginAction.fulfilled, (state, action) => {                        
            
            if (action.payload && typeof action.payload === 'object' && 'data' in action.payload) {
                const payload = action.payload as {data: {accessToken: string; refreshToken: string}; status: number};
                state.isLogin = true;
                state.statusLogin = payload.status;
                authService.setAccessToken(payload.data.accessToken);
                localStorage.setItem('refreshToken', payload.data.refreshToken);
            }        
        })
        
        .addCase(userLoginAction.rejected, (state, action) => {
            state.isLogin = false;
            state.statusLogin = action.payload as number ?? 500; 
            })

        // Token
        .addCase(refreshTokenAction.pending,(state) => {
            state.statusToken = null;            
        })
        .addCase(refreshTokenAction.fulfilled,(state,action) => {

             if (action.payload && typeof action.payload === 'object' && 'accessToken' in action.payload) {
                state.isLogin = true;
                const payload = action.payload as {accessToken: string; refreshToken: string};
                authService.setAccessToken(payload.accessToken);
                localStorage.setItem('refreshToken', payload.refreshToken);
            } else if (typeof action.payload === 'number') {
                state.statusToken = action.payload;
                if (action.payload !== 200) {
                    state.isLogin = false;
                }
            }       
        })
        .addCase(refreshTokenAction.rejected, (state) => {
            state.statusToken = null;
            state.isLogin = false;

            
        })
    }
})

export const { logout, resetStatusToken, resetStatusLogin } = loginSlice.actions
export default loginSlice.reducer;