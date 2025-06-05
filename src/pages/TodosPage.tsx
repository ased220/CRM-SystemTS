import { useEffect, useState } from "react"
import InputTask from "../components/AddTask/AddTask" 
import ListItem from  "../components/ListItem/ListItem" 
import { filterTodo } from "../api/api"
import type { Todo, TodoInfo, MetaResponse, TodoInfoCheck} from "../types/Interface"
import StateWork from "../components/StateWork/StateWork"
import { BrowserRouter, Route, Routes } from "react-router"


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
    <BrowserRouter>
      <InputTask reloadList = {reloadList}/>
      <StateWork statusList = {statusList} setStatus= {setStatus}/>

      <Routes>
        <Route path = '/' element = { <ListItem tasks = {tasks} reloadList = {reloadList}/> }/>
        <Route path = '/atWork' element = { <ListItem tasks = {tasks} reloadList = {reloadList}/> }/>
        <Route path = 'done' element = { <ListItem tasks = {tasks} reloadList = {reloadList}/> }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}