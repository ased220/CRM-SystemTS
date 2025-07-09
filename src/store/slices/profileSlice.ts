import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Profile } from "../../types/Interface";
import { ProfileRequest } from "../../api/authApi";

interface ProfileState {
    user:Profile;
    status: 'idle' | 'loading'| 'successed' | 'failed'
}

const initialState:ProfileState={ 
    user: {
        id: 0,
        username: 'no', 
        email: 'no',
        date: '', 
        isBlocked: false, 
        roles: [], 
        phoneNumber: 'no',
    },
    status:"idle"
}


export const getProfile = createAsyncThunk(
    '/user/profile',
    async() => {
        try {
            const result = ProfileRequest();
            ;

            return result;
        } catch (error) {
            console.log(error);
        }
    }
)
const profileSlice = createSlice({

    name: 'profile',
    initialState,
    reducers:{

    },
    extraReducers: (builder) => {
    builder
        .addCase(getProfile.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getProfile.fulfilled, (state, action)=>{
            state.status = "successed"
            Object.assign(state.user, action.payload);
        })
        .addCase(getProfile.rejected, state =>{
            state.status = "failed"
        })
    }
}
)


export default profileSlice.reducer;