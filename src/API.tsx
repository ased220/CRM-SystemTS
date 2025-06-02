import type { MetaResponse, requestOptions, Todo, TodoInfo, TodoInfoCheck, TodoRequest } from "./types/types"

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

  export async function filterFetch(status: TodoInfoCheck): Promise<MetaResponse<Todo, TodoInfo >> {
  
    try {

        const response = await fetch(`https://easydev.club/api/v1/todos?filter=${status}`, { method: 'GET' });

        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }

        return await response.json();

    } catch (error) {

      console.error(error);
      throw error;
    }
}

  