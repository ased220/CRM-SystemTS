import { useEffect, useState } from "react"
import InputTask from "../components/AddTask/AddTask" 
import ListItem from  "../components/ListItem/ListItem" 
import { filterTodo } from "../api/api"
import type { Todo, TodoInfo, MetaResponse, TodoInfoCheck} from "../types/Interface"
import StateWork from "../components/StateWork/StateWork"

interface TodosPage {
  pathname: string
}

export default function TodosPage ({pathname}:TodosPage){

    const [status, setStatus] = useState<TodoInfoCheck>('all')

    const [statusList, setStatusList] = useState<TodoInfo>({
      all: 0,
      completed: 0,
      inWork: 0
    })

    const [tasks, setTasks] = useState<Array <Todo>>([])

    useEffect(() => {
      let intervalID: number;
      if (pathname === '/') {
        reloadList();
        
        intervalID = setInterval(reloadList, 5000);
      }
      
      return () => {
        if (intervalID) {
          clearInterval(intervalID);
        }
      }; 
    }, [pathname, status]);

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
        alert('Ошибка!!!')
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