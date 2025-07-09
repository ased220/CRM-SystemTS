import axios from "axios";
import { authService } from "../constants/authService";
import type { AuthData, Token, UserRegistration } from "../types/Interface";


const baseApi = axios.create({
  baseURL: 'https://easydev.club/api/v1',
})


baseApi.interceptors.request.use(
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
        // console.log('loginAction API 78',response);        
        return {data: response.data, status: response.status};
    
}

export async function refreshTokenUpdateRequest(refToken: string){
  try {
    const response = await baseApi.post<Token>('/auth/refresh', { 
      refreshToken: refToken 
    });
    // console.log('Ошибка',response);
    return response.data;
    
  } catch (error) {
    
      if (error && typeof error === 'object' && 'status' in error) {
          return (error as { status: number }).status;
      }
      return 404;  
  }
}

//Profile
export async function ProfileRequest(){
  try {
    const response = await baseApi.get('/user/profile');
    return response.data
  } catch (error) {
      return error
  }
}