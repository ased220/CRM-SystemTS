import axios from "axios";
import { authService } from "../constants/authService";
import type { AuthData, Profile, Token, UserRegistration } from "../types/Interface";


const baseApi = axios.create({
  baseURL: 'https://easydev.club/api/v1',
})

const profileApi = axios.create({
  baseURL: 'https://easydev.club/api/v1',
})

profileApi.interceptors.request.use(
  config => {
    const accessToken = authService.getAccessToken();
    console.log('вот тут ацесс токен', accessToken);
    
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
    console.log(2);
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
    console.log(1);
    
    return response.data
  } catch (error:any) {
    console.log(3,error);
    
    return error.response.status  
  }
}