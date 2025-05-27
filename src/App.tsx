import { useEffect, useState } from "react"
import InputTask from "./components/InputTasks"
import ListItem from "./components/ListItem"
import { filterFetch, type Todo } from "./API"


function App() {

      // type Status = 'all' | 'completed' | 'inWork'
  
    // const [statusList, setStatusList] = useState<Status>('all')
    const [Tasks, setTasks] = useState<Array <Todo>>([])

    useEffect(() => {
        
    filterFetch('all')
      .then(response => setTasks(response.data))

        
    },[]);

    const reloadList = async() => {
      const response = await filterFetch('all')
      setTasks(response.data)
    }  


  return (
    <>
      <InputTask reloadList = {reloadList}/>
      <ListItem Tasks = {Tasks} reloadList = {reloadList}/>
    </>
  )
}

export default App
