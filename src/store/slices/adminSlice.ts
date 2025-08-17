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
            return await usersRequest(filters) as MetaResponse<User[]>
        }
        catch (error: unknown) {
            let message = 'Unknown error';
            let status = 500;
            
            if (typeof error === 'object' && error !== null) {
                if ('response' in error) {
                    const axiosError = error as { response?: { status?: number, message?: string } };
                    status = axiosError.response?.status || 500;
                    
                    if (typeof axiosError.response?.message === 'string') {
                        message = axiosError.response.message;
                    }
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
    }  catch (error: unknown) {
      let message = 'Unknown error';
      let status = 500;

      if (typeof error === 'object' && error !== null) {
        if ('response' in error) {
          const axiosError = error as { response?: { status?: number, message?: string } };
          status = axiosError.response?.status || 500;
          message = axiosError.response?.message || 'Unknown error';
        } 
        else if ('message' in error && typeof error.message === 'string') {
          message = error.message;
        }
      }

      return rejectWithValue({ status, message });
    }
  }
);
export const updateUserProfileAction = createAsyncThunk(
    'admin/users/updateProfile',
    async(updateProfileParams:UpdateProfileParams, { rejectWithValue })=>{
        try {
            return await updateUserProfileRequest(updateProfileParams) as MetaResponse<User>;
        } catch (error: unknown) {
            let message = 'Unknown error';
            let status = 500;
            
            if (typeof error === 'object' && error !== null) {
                if ('response' in error) {
                    const axiosError = error as { response?: { status?: number, message?: string } };
                    status = axiosError.response?.status || 500;
                    
                    if (typeof axiosError.response?.message === 'string') {
                        message = axiosError.response.message;
                    } 
                } 
                
            }
            
            return rejectWithValue({ status, message });
        }

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