import axios from "axios";
import { authService } from "../constants/authService";
import type { AuthData, Profile, Token, UserRegistration } from "../types/authInterface";

const baseURL = 'https://easydev.club/api/v1';
const baseApi = axios.create({
  baseURL: baseURL,
})

const profileApi = axios.create({
  baseURL: baseURL,
})

profileApi.interceptors.request.use(
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

export async function registrationRequest(userData: UserRegistration) {
      try {
          const response = await baseApi.post('/auth/signup', userData);
          return response.status
      }catch(error){
          if (error && typeof error === 'object' && 'status' in error) {
              return (error as { status: number }).status;
          }
          return 404;
      }
}


export async function loginRequest(authData: AuthData){
    
        const response = await baseApi.post('/auth/signin',authData);
        return {data: response.data, status: response.status};
    
}

export async function refreshTokenUpdateRequest(refToken: string){
  try {
    const response = await baseApi.post<Token>('/auth/refresh', { 
      refreshToken: refToken 
    });

    return response.data;
    
  } catch (error) {
    
      if (error && typeof error === 'object' && 'status' in error) {
          return (error as { status: number }).status;
      }
      return 404;  
  }
}

//Profile
export const ProfileRequest = async(): Promise<Profile | Error> =>{
  try {
    const response = await profileApi.get('/user/profile');    
    return response.data

  } catch (error:any) {    
    return error.response.status  
  }
}