import { useEffect, useState } from "react"
import InputTask from "./components/InputTasks"
import ListItem from "./components/ListItem"
import { filterFetch } from "./API"
import type { Todo, TodoInfo, MetaResponse, TodoInfoCheck} from "./types/Interface"
import StateWork from "./components/StateWork"
import { BrowserRouter, Route, Routes } from "react-router"



function App() {
    
    const [status, setStatus] = useState<TodoInfoCheck>('all')

    const [statusList, setStatusList] = useState<TodoInfo>({
      all: 0,
      completed: 0,
      inWork: 0
    })
    const [Tasks, setTasks] = useState<Array <Todo>>([])

    useEffect(() => {
    
      filterFetch(status)
        .then( (response?: MetaResponse<Todo,TodoInfo>) => {
          if (response){

            setTasks( response.data); 
            if (response.info){
              setStatusList(response.info)
            }
          }
          
        }
        )
        .catch(error => console.error(error))
        
    },[status]);

    const reloadList = async() => {
      const response = await filterFetch(status)
      if (response){
          console.log(response);
          
          setTasks( response.data); 
          if (response.info){
            setStatusList(response.info)
          }
      }

    }  


  return (
    <>
    <BrowserRouter>
      <InputTask reloadList = {reloadList}/>
      <StateWork statusList = {statusList} setStatus= {setStatus}/>

      <Routes>
        <Route path = '/' element = { <ListItem Tasks = {Tasks} reloadList = {reloadList}/> }/>
        <Route path = '/atWork' element = { <ListItem Tasks = {Tasks} reloadList = {reloadList}/> }/>
        <Route path = 'done' element = { <ListItem Tasks = {Tasks} reloadList = {reloadList}/> }/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
