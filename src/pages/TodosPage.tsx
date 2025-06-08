import { useEffect, useState } from "react"
import InputTask from "../components/AddTask/AddTask" 
import ListItem from  "../components/ListItem/ListItem" 
import { filterTodo } from "../api/api"
import type { Todo, TodoInfo, MetaResponse, TodoInfoCheck} from "../types/Interface"
import StateWork from "../components/StateWork/StateWork"


export default function TodosPage (){
        const [status, setStatus] = useState<TodoInfoCheck>('all')

    const [statusList, setStatusList] = useState<TodoInfo>({
      all: 0,
      completed: 0,
      inWork: 0
    })

    const [tasks, setTasks] = useState<Array <Todo>>([])

    useEffect(() => {
      
      reloadList()

    },[status]);

    const reloadList = async() => {
      try {
          const response: MetaResponse<Todo,TodoInfo> = await filterTodo(status);
          if (response){

            setTasks( response.data); 
            if (response.info){
              setStatusList(response.info)
            }
          }
      } catch (error) {
        console.error(error)
      }
    }  


  return (
    <>

      <InputTask reloadList = {reloadList}/>
      <StateWork statusList = {statusList} setStatus= {setStatus}/>
      <ListItem tasks = {tasks} reloadList = {reloadList}/>
    </>
  )
}