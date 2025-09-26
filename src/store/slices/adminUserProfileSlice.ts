import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ApiError, MetaResponse, UpdateProfileParams, User } from "../../types/userInterface";
import { GetProfileUser, updateUserProfile } from "../../api/adminApi";

interface InitialState {
    userProfile:User | null,
}

const initialState: InitialState = {
    userProfile:{
        date:'',
        email:'',
        id: -1,
        isBlocked:false,
        phoneNumber:'',
        roles:[],
        username:'',
    },
};  


export const getUserProfileAction = createAsyncThunk<
  MetaResponse<User>, 
  number,
  { rejectValue: ApiError }
>(
  'admin/users/getProfile',
  async (id: number, { rejectWithValue }) => {
    try {
      return await GetProfileUser(id);
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
            return await updateUserProfile(updateProfileParams) as MetaResponse<User>;
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
const adminUserProfileSlice = createSlice({

    name:'adminUserProfile',
    initialState,
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
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

export default adminUserProfileSlice.reducer;