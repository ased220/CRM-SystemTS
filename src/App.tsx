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

    const reloadList = () => {
        filterFetch('all')
        .then(response => setTasks(response.data))
        .catch( () => console.error('Error: Проблема с обновлением данных'))
    }

  return (
    <>
      <InputTask/>
      <ListItem Tasks = {Tasks} reloadList = {reloadList}/>
    </>
  )
}

export default App
