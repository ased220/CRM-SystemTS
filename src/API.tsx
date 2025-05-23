interface TodoRequest { 
	title?: string;
 	isDone?: boolean;  // изменение статуса задачи происходит через этот флаг
  id?:number;
  created?: string;

 } 
// или так type TodoRequest = Partial<Omit<Todo, "id" | "created">>;

interface Todo { 
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

export function postFetch(obj: TodoRequest){
    const requestOptions: requestOptions = {
      method: 'POST',
      body: JSON.stringify(obj)
    }


    fetch('https://easydev.club/api/v1/todos', requestOptions)
      .then(response => {
        if (!response.ok){ throw new Error(`Status: ${response.status}`) }
        return response.json() as Promise<Todo>
      })
      .catch(error => console.error(error))
  }

export function putFetch(obj: TodoRequest){
    const requestOptions: requestOptions = {
        method: 'PUT',
        body: JSON.stringify(obj)
    }
    

    fetch(`https://easydev.club/api/v1/todos/${obj.id}`, requestOptions)
      .then(response => {
        if (!response.ok){ throw new Error(`Status: ${response.status}`) } 
      })

      .catch(error => console.error(error))
  }

  export function deleteFetch(id: number) {

    fetch(`https://easydev.club/api/v1/todos/${id}`, {method: 'DELETE'})
      .then(response => {
        if (!response.ok){
          throw new Error(`Status: ${response.status}`)
        }
      })
      .catch(error => console.error(error))
  } 

  export function filterFetch(status: TodoInfoCheck){
      fetch(`https://easydev.club/api/v1/todos?${status}`, {method: 'GET'})
      .then(response => {
            if (!response.ok){
                throw new Error(`Status: ${response.status}`)
            }
            return response.json() as Promise< MetaResponse <Todo,TodoInfo> >
      }) 

  }