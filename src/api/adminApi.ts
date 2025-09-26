// import axios from "axios";
// import { baseURL } from "../constants/path";
// import { authService } from "../constants/authService";
import type { MetaResponse, UpdateProfileParams, UpdateUserRights, User, UserFilters } from "../types/userInterface";
import { profileApi } from "./authApi";

// const adminApi = axios.create({
//     baseURL: baseURL
// })

// adminApi.interceptors.request.use(
//     config => {
//         const accessToken = authService.getAccessToken();    
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     } 
// );


export const GetUsers = async (filters: UserFilters = {}) => {

    try {
        const response = await profileApi.get<MetaResponse<User>>('/admin/users', { 
            params: filters,
        });
        return response.data;
    }catch(error){
        console.log(error);
        
        return error;
    }
};

export const GetProfileUser = async(id:number): Promise<MetaResponse<User>>  =>{
    try {   
        const response = await profileApi.get<User>(`/admin/users/${id}`);
        return  {
            data: response.data,
            status: response.status, 
    };
    } catch (error) {
        console.error('Не удалось получить данные пользователей', error);
        throw error
    }
}

export const updateUserProfile = async(userProfileRequest:UpdateProfileParams)=>{
    try{
        const response = await profileApi.put<User>(`/admin/users/${userProfileRequest.id}`, userProfileRequest.userRequest)
        return response;
    }catch(error){
        console.error('Не удалось получить данные пользователя', error);
        throw error
    }
}

export const deleteUserProfile = async(id:number) =>{
    try {
        await profileApi.delete(`/admin/users/${id}`)
    } catch (error) {
        console.error('Не удалось удалить пользователя');
        throw error
    }
}

export const blockUser = async(id:number) =>{
    try {
        await profileApi.post(`/admin/users/${id}/block`)
    } catch (error) {   
        console.error('не удалось заблокировать');           
        throw error;
    }
}
export const unblockUser = async(id:number) =>{
    try {
        await profileApi.post(`/admin/users/${id}/unblock`)
    } catch (error) {   
        console.error('не удалось разблокировать')   
        throw error
    }
}

export const updateUserRight = async(updateUserRights:UpdateUserRights)=>{
    try{
        
        const response = await profileApi.post<User>(`/admin/users/${updateUserRights.id}/rights`, { roles: updateUserRights.roles})
        return response;
    }catch(error){
        console.error('не удалось обновить права')
        throw error
    }
}
