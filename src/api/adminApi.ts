import axios from "axios";
import { baseURL } from "../constants/path";
import { authService } from "../constants/authService";
import type { MetaResponse, UpdateProfileParams, UpdateUserRights, User, UserFilters } from "../types/adminInterface";

const adminApi = axios.create({
    baseURL: baseURL
})

adminApi.interceptors.request.use(
    config => {
        const accessToken = authService.getAccessToken();    
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    } 
);

let abortController: AbortController | null = null;

export const usersRequest = async (filters: UserFilters = {}) => {
    if (abortController) {
        abortController.abort(); 
    }

    abortController = new AbortController();

    try {
        const response = await adminApi.get<MetaResponse<User>>('/admin/users', { 
            params: filters,
            signal: abortController.signal 
        });
        return response.data;
    }finally {
        abortController = null;
    }
};

export const profileUserRequest = async(id:number) =>{
    try {   
        const response = await adminApi.get<User>(`/admin/users/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}

export const updateUserProfileRequest = async(userProfileRequest:UpdateProfileParams)=>{
    try{
        const response = await adminApi.put<User>(`/admin/users/${userProfileRequest.id}`, userProfileRequest.userRequest)
        return response;
    }catch(error){
        return error
    }
}

export const deleteUserProfileRequest = async(id:number) =>{
    try {
        await adminApi.delete(`/admin/users/${id}`)
    } catch (error) {
        
        return error
    }
}

export const blockUserRequest = async(id:number) =>{
    try {
        await adminApi.post(`/admin/users/${id}/block`)
    } catch (error) {      
        return error
    }
}
export const unblockUserRequest = async(id:number) =>{
    try {
        await adminApi.post(`/admin/users/${id}/unblock`)
    } catch (error) {      
        return error
    }
}

export const updateUserRightRequest = async(updateUserRights:UpdateUserRights)=>{
    try{
        
        const response = await adminApi.post<User>(`/admin/users/${updateUserRights.id}/rights`, { roles: updateUserRights.roles})
        return response;
    }catch(error){
        return error
    }
}
