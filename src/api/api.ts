import type { MetaResponse, Todo, TodoInfo, TodoInfoCheck, TodoRequest } from "../types/Interface"

export async function addTodo(obj: TodoRequest):Promise<Todo> { 

    try {
      const response = await fetch('https://easydev.club/api/v1/todos', {
        method: 'POST',
        body: JSON.stringify(obj)
      }
)
      if (!response.ok){ throw new Error(`Status: ${response.status}`) }
      
      return response.json()

    } catch (error) {
      console.error(error)
      throw error
    }
  }

export async function editTodo(obj: TodoRequest){
  
    try {
      const response = await fetch(`https://easydev.club/api/v1/todos/${obj.id}`, {
        method: 'PUT',
        body: JSON.stringify(obj)
    })

      if (!response.ok){ throw new Error(`Status: ${response.status}`) } 

    } catch (error) {

      console.error(error)
    }
  }

  export async function deleteTodo(id: number) {

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

  export async function filterTodo(status: TodoInfoCheck): Promise<MetaResponse<Todo, TodoInfo >> {
  
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

  