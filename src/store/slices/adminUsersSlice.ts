import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApiError, MetaResponse, User, UserFilters } from "../../types/userInterface";
import type { RootState } from "../store";
import { GetUsers } from '@/api/adminApi'

interface InitialState {
    users:User[]
    statusGetUsers:number,
    totalAmount:number,
    filterState: UserFilters,
} 

const initialState: InitialState = {
    users:[
    ],
    statusGetUsers:0,
    totalAmount:0,

    filterState:{
    search:'',
    sortBy: 'id',
    sortOrder: 'asc',
    // isBlocked: 'none',
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
  async (_, { getState }) => {
    const state = getState();
    const filters = state.adminUsers.filterState;
    
    if (filters.isBlocked === 'none') {
      const response = await GetUsers({
        search: filters.search,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
        limit: filters.limit,
        offset: filters.offset,
      });
      return response as MetaResponse<User[]>;            
    }
    
    return await GetUsers(filters) as MetaResponse<User[]>;
  }
);

const adminUsersSlice = createSlice({

    name:'adminUsers',
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
                state.statusGetUsers = action.payload?.status

            })
            .addCase(getUsersAction.rejected, (state, action) =>{
            
                state.statusGetUsers = action.payload?.status || 500;
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
} = adminUsersSlice.actions

export default adminUsersSlice.reducer;