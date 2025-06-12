import type { MetaResponse, Todo, TodoInfo, TodoInfoCheck, TodoRequest } from "../types/Interface"
import axios from 'axios';

export async function addTodo(obj: TodoRequest):Promise<Todo> { 

    try {
      const response = await axios.post<Todo>('https://easydev.club/api/v1/todos', obj)
      return response.data

    } catch (error) {
      console.error(error)
      throw error
    }
  }

export async function editTodo(obj: TodoRequest){
  
    try {
        const response = await axios.put(`https://easydev.club/api/v1/todos/${obj.id}`, obj) 
        return response.data

    } catch (error) {
      console.error(error)
    }
  }

  export async function deleteTodo(id: number) {

    try {

      await axios.delete(`https://easydev.club/api/v1/todos/${id}`);
      return ;

    } catch (error) {
        console.error(error)
    }
    
  } 

  export async function filterTodo(status: TodoInfoCheck): Promise<MetaResponse<Todo, TodoInfo >> {
  
    try {

        const response = await axios.get<Promise<MetaResponse<Todo, TodoInfo >>>(`https://easydev.club/api/v1/todos?filter=${status}`);
        return await response.data;

    } catch (error) {

      console.error(error);
      throw error;
    }
}

  