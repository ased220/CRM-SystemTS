import { useEffect, useState } from "react"
import InputTask from "./components/InputTasks"
import ListItem from "./components/ListItem"
import { filterFetch } from "./API"
import type { Todo } from "./types/Interface"


function App() {

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
