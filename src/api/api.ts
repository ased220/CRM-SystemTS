import type { MetaResponse, Todo, TodoInfo, TodoInfoCheck, TodoRequest } from "../types/Interface"
import axios from 'axios';

const todoApi = axios.create({
  baseURL: 'https://easydev.club/api/v1'
})

export async function addTodo(obj: TodoRequest):Promise<Todo> { 
    try {
      const response = await todoApi.post<Todo>('/todos', obj)
      return response.data

    } catch (error) {
      console.error(error)
      throw error
    }
  }

export async function editTodo(obj: TodoRequest){
  
    try {
        const response = await todoApi.put(`/todos/${obj.id}`, obj) 
        return response.data

    } catch (error) {
      console.error(error)
    }
  }

  export async function deleteTodo(id: number) {

    try {

      await todoApi.delete(`/todos/${id}`);
      return ;

    } catch (error) {
        console.error(error)
    }
    
  } 

  export async function filterTodo(status: TodoInfoCheck): Promise<MetaResponse<Todo, TodoInfo >> {
  
    try {

        const response = await todoApi.get<Promise<MetaResponse<Todo, TodoInfo >>>('/todos',{
          params: {
            filter: status
          }
        });
        return await response.data;

    } catch (error) {

      console.error(error);
      throw error;
    }
}

  