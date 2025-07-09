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
        console.log('Ошибка',error);

        return rejectWithValue(error.status || 500);
      };
    }    
);

export const refreshTokenAction = createAsyncThunk(
    'auth/refresh',
    async (refToken:string) => {
        try {
            const result = await refreshTokenUpdateRequest(refToken);
            
            return result;

        } catch (error) {
            console.error('44 Refresh LoginSlice', error);
        }
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
            
            if (action.payload.data){                
                state.isLogin = true;
                state.statusLogin = action.payload.status
                authService.setAccessToken(action.payload.data.accessToken);
                localStorage.setItem('refreshToken', action.payload.data.refreshToken);
            }            
        })
        
        .addCase(userLoginAction.rejected, (state, action) => {
            state.isLogin = false;
            state.statusLogin = action.payload; 
            })

        // Token
        .addCase(refreshTokenAction.pending,(state) => {
            state.statusToken = null;            
        })
        .addCase(refreshTokenAction.fulfilled,(state,action) => {

            if (action.payload.accessToken){
                authService.setAccessToken( action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            }else{
                state.statusToken = action.payload
                if (action.payload !== 200){
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