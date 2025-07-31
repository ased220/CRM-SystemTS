import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApiError, ApiResponse, MetaResponse, UpdateProfileParams, User, UserFilters } from "../../types/adminInterface";
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
  MetaResponse<User>, 
  UserFilters,         
  { rejectValue: ApiError } 
>(
    'admin/users',
    async (filters: UserFilters = {}, {rejectWithValue }) =>{
        try {
            return await usersRequest(filters);
        } catch (error:any) {
            return rejectWithValue({
            status: error.response?.status || 500,
            message: error.response?.data?.message })
        }
})

export const getUserProfileAction = createAsyncThunk(
    'admin/users/getProfile',
    async(id:number)=>{
        try {
            return await profileUserRequest(id)
        } catch (error) {
            return error
        }

    }
)

export const updateUserProfileAction = createAsyncThunk(
    'admin/users/updateProfile',
    async(updateProfileParams:UpdateProfileParams)=>{
        try {
            return await updateUserProfileRequest(updateProfileParams)
        } catch (error) {
            return error
        }

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
                    console.log(action.payload.meta);
                    
                    state.totalAmount = action.payload.meta.totalAmount
                }
                state.statusUsers = action.payload?.status

            })
            .addCase(getUsersAction.rejected, (state, action) =>{
                state.statusUsers = action.payload.status || 500
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
                if (action.payload?.data) {
                    state.userProfile = action.payload?.data;
                }
            })
            .addCase(updateUserProfileAction.rejected,(_,action) =>{
                console.log(action.payload);
            })
    }
}
)

export default adminSlice.reducer;