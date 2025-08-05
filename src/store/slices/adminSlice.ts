import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApiError, MetaResponse, UpdateProfileParams, User, UserFilters } from "../../types/adminInterface";
import { profileUserRequest, updateUserProfileRequest, usersRequest } from "../../api/adminApi";
import type { RootState } from "../store";

interface InitialState {
    users:User[],
    statusUsers:number,
    userProfile:User,
    totalAmount:number,
    filterState: UserFilters,
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
    totalAmount:0,

    filterState:{
    search:'',
    sortBy: 'id',
    sortOrder: 'asc',
    isBlocked: 'none',
    limit: 20,
    offset:0,
    }
};  


export const getUsersAction = createAsyncThunk<
  MetaResponse<User[]>, 
  void, 
  {
    rejectValue: ApiError;
    state: RootState;
  }
>(
    'admin/users',
    async (_ , {rejectWithValue, getState }) =>{
        try {
            const state = getState();
            const filters = state.admin.filterState
            if(filters.isBlocked === 'none'){
                const response = await usersRequest(
                    {
                    search:filters.search,
                    sortBy: filters.sortBy,
                    sortOrder: filters.sortOrder,
                    limit: filters.limit,
                    offset: filters.offset,
                    }
                );
                return response as MetaResponse<User[]>;            
            }
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
        updateSearch:(state, action)=>{
            state.filterState.search = action.payload
        },
        updateIsBlocked:(state, action)=>{
            state.filterState.isBlocked = action.payload
        },
        updateSortBy:(state, action)=>{
            state.filterState.sortBy = action.payload
        },
        updateSortOrder:(state, action)=>{
            state.filterState.sortOrder = action.payload
        },
        updateOffsetPagination:(state, action)=>{
            state.filterState.offset = action.payload 
        },
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

export const { 
    updateSearch,
    updateIsBlocked,
    updateSortBy,
    updateSortOrder,
    updateOffsetPagination,
} = adminSlice.actions

export default adminSlice.reducer;