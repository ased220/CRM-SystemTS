export interface TodoRequest { 
	title?: string;
 	isDone?: boolean;  // изменение статуса задачи происходит через этот флаг
  id?:number;
  created?: string;

 } 
// или так type TodoRequest = Partial<Omit<Todo, "id" | "created">>;

export interface Todo { 
	id: number;
	title: string;
	created: string; // ISO date string 
	isDone: boolean; 
}

export interface TodoInfo { 
	all: number
	completed: number
	inWork: number
}

export interface MetaResponse<T, N> {
	data: T[]
	info?: N
	meta: {
		totalAmount: number
	}
}

export type TodoInfoCheck = 'all' | 'completed' | 'inWork'

//autorization

export interface UserRegistration { 
  login: string; 
  username: string; 
  password: string; 
  email: string; 
  phoneNumber?: string; 
}

export interface ResponseUserData{
  date: string,
  email: string,
  id: 0,
  isAdmin: true,
  isBlocked: true,
  phoneNumber: string,
  username: string
}

export interface AuthData { 
  login: string; 
  password: string; 
}

export interface RefreshToken { 
  refreshToken: string; 
}

export interface Profile { 
  id: number; 
  username: string; 
  email: string; 
  date: string; 
  isBlocked: boolean; 
  roles: Role[]; 
  phoneNumber: string; 
}

export interface ProfileRequest { 
  username: string; 
  email: string; 
  phoneNumber: string; 
}

export interface PasswordRequest { 
  password: string; 
}

export interface Token {
 accessToken: string
 refreshToken: string
}

export type Role = 'ADMIN' | 'USER' | 'MODERATOR'