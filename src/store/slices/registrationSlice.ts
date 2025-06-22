import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { UserRegistration } from "../../types/Interface";
import axios from "axios";


interface RegisterState {
  user: UserRegistration | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  type: string | null;
}

const initialState: RegisterState = {
  user: null,
  status: 'idle',
  type: null,
};

const authApi = axios.create({
    baseURL: 'https://easydev.club/api/v1'
})

export const userRegistration = createAsyncThunk(
    'auth/signup',
    async ( userData: UserRegistration, { rejectWithValue } ) =>{
        try {
            const response = await authApi.post('/auth/signup', userData);
            return response.data
        }
         catch (error:any) {
            if (error.response) {
                return rejectWithValue({
                status: error.response.status,
                data: error.response.data
                });
            }
            return rejectWithValue({
                status: 0,
                data: 'Network error'
            });
            
        }
    }
)


const registrationSlice = createSlice({
    name:'register',
    initialState,
    reducers:{ 
    },
    extraReducers: ( builder ) => {
        builder
        .addCase(userRegistration.pending,(state)=>{
            console.log(state, 'в ожидании');
            state.status = 'loading';
            state.type = null;
        })
        .addCase(userRegistration.fulfilled,(state, action )=>{
            console.log(action.payload,'оо ну данные прошли');
            state.status = 'succeeded';
            state.user = action.payload;
            state.type = action.payload.status;
        })
        .addCase(userRegistration.rejected,( state , action) =>{
            state.status = 'failed';
            if (action.payload){
                const responseServer = action.payload as {
                        status: number;
                        data: { message?: string };
                    };
                switch (responseServer.status){
                    case 400:
                        state.type = '400'
                        // console.error('Bad Request: Ошибка десериализации запроса или неверный ввод',state.error);
                        break;
                    case 409:
                        state.type = '409'
                        // console.error('409 Conflict: Пользователь уже существует.',state.error)
                        break;
                    default:
                        state.type =  '500'
                }
                } else if (action.error) {
                    
                    state.type = action.error.message || 'Сетевая ошибка';
                    console.error('Ошибка без ответа сервера:', action.error);
                }   
                
            })
}})
    


export default registrationSlice.reducer

