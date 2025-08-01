import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApiError, MetaResponse, UpdateProfileParams, User, UserFilters } from "../../types/adminInterface";
import { profileUserRequest, updateUserProfileRequest, usersRequest } from "../../api/adminApi";

interface InitialState {
    users:User[],
    statusUsers:number,
    userProfile:User,
    totalAmount:number,
} 

const initialState: InitialState = {
    users:[
        {
            date:'',
            email:'',
            id: -1,
            isBlocked:false,
            phoneNumber:'',
            roles:[],
            username:'',
        }
    ],
    statusUsers:0,

    userProfile:{
        date:'',
        email:'',
        id: -1,
        isBlocked:false,
        phoneNumber:'',
        roles:[],
        username:'',
    },
    totalAmount:0
};  


export const getUsersAction = createAsyncThunk<
  MetaResponse<User[]>, 
  UserFilters,         
  { rejectValue: ApiError } 
>(
    'admin/users',
    async (filters: UserFilters , {rejectWithValue }) =>{
        try {
            const response = await usersRequest(filters);
            return response as MetaResponse<User[]>;} 
        catch (error:any) {
            let message = 'Unknown error';
            let status = 500;
            
            if (error.response) {
                status = error.response.status || 500;
                if (typeof error.response.data === 'string') {
                    message = error.response.data;
                } else if (error.response.data?.message) {
                    message = error.response.data.message;
                }
            } 
            
            return rejectWithValue({ status, message });
        }
})

export const getUserProfileAction = createAsyncThunk<
  MetaResponse<User>, 
  number,
  { rejectValue: ApiError }
>(
  'admin/users/getProfile',
  async (id: number, { rejectWithValue }) => {
    try {
      return await profileUserRequest(id);
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status || 500,
        message: error.response?.data?.message || 'Unknown error'
      });
    }
  }
);
export const updateUserProfileAction = createAsyncThunk(
    'admin/users/updateProfile',
    async(updateProfileParams:UpdateProfileParams, { rejectWithValue })=>{
        try {
            return await updateUserProfileRequest(updateProfileParams) as MetaResponse<User>;
        } catch (error:any) {
            let message = 'Unknown error';
            let status = 500;
            
            if (error.response) {
                status = error.response.status || 500;
                if (typeof error.response.data === 'string') {
                    message = error.response.data;
                } else if (error.response.data?.message) {
                    message = error.response.data.message;
                }
            } else if (error.request) {
                message = 'No response from server';
            } else {
                message = error.message || 'Unknown error';
            }
            
            return rejectWithValue({ status, message });        }

    }
)
const adminSlice = createSlice({

    name:'admin',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(getUsersAction.fulfilled,(state, action)=>{
                
                if (action.payload?.data) {
                    
                    state.users = action.payload.data;                     
                    state.totalAmount = action.payload.meta?.totalAmount || 0;
                }
                state.statusUsers = action.payload?.status

            })
            .addCase(getUsersAction.rejected, (state, action) =>{
            
                state.statusUsers = action.payload?.status || 500;
            })
           //UserProfile
            .addCase(getUserProfileAction.fulfilled,(state,action) =>{
                if (action.payload?.data) {
                    state.userProfile = action.payload?.data;
                }
            })
            .addCase(getUserProfileAction.rejected,(_,action) =>{
                console.log(action.payload);
            })
            //updateUserProfile
            .addCase(updateUserProfileAction.fulfilled,(state,action) =>{
                if (action.payload.data) {
                    state.userProfile = action.payload.data;
                }
            })
            .addCase(updateUserProfileAction.rejected,(_,action) =>{
                console.log(action.payload);
            })
    }
}
)

export default adminSlice.reducer;