interface TodoRequest { 
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

interface TodoInfo { 
	all: number
	completed: number
	inWork: number
}

interface MetaResponse<T, N> {
	data: T[]
	info?: N
	meta: {
		totalAmount: number
	}
}

type requestOptions = {
    method:string
    body:string
}

type TodoInfoCheck = 'all' | 'completed' | 'inWork'

export async function postFetch(obj: TodoRequest){
    const requestOptions: requestOptions = {
      method: 'POST',
      body: JSON.stringify(obj)
    }

    try {
      const response = await fetch('https://easydev.club/api/v1/todos', requestOptions)
      if (!response.ok){ throw new Error(`Status: ${response.status}`) }
      
      return response.json() as Promise<Todo>

    } catch (error) {
      console.error(error)
    }
  }

export async function putFetch(obj: TodoRequest){
    const requestOptions: requestOptions = {
        method: 'PUT',
        body: JSON.stringify(obj)
    }
    
    try {
      const response = await fetch(`https://easydev.club/api/v1/todos/${obj.id}`, requestOptions)

      if (!response.ok){ throw new Error(`Status: ${response.status}`) } 

    } catch (error) {

      console.error(error)
    }
  }

  export async function deleteFetch(id: number) {

    try {

      const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {method: 'DELETE'});

      if (!response.ok){
          throw new Error('Error')
        }

      return ;

    } catch (error) {
        console.error(error)
    }
    
  } 

  export async function filterFetch(status: TodoInfoCheck){

      try {
        const response = await fetch(`https://easydev.club/api/v1/todos?${status}`, {method: 'GET'})
        
        if (!response.ok){
          throw new Error(`Status: ${response.status}`)
        }
        
        return await response.json() as Promise< MetaResponse <Todo,TodoInfo>>
      } catch (error) {
    
        console.error(error)
    }
    

  }