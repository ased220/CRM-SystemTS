import { useEffect, useState } from "react"
import { filterFetch, type Todo } from "../API"
import Item from "./Item"


export default function List(){

    type Status = 'all' | 'completed' | 'inWork'

    const [statusList, setStatusList] = useState<Status>('all')
    const [Tasks, setTasks] = useState<Array <Todo>>([])
    
    // const [reload, setReload] = useState(0)

    useEffect(() => {
        
        filterFetch(statusList)
        .then(response => setTasks(response.data))

        
    },[statusList])
    
    const reloadList = () => {
        filterFetch(statusList)
        .then(response => setTasks(response.data))
        .catch( () => console.error('Error: Проблема с обновлением данных'))
    }
    
    return (
        <>
        {
            Tasks.map((obj)=>{
               
                return <Item key={obj.id} obj={obj} reloadList={reloadList} />              
            })
            
        }   
        </>
    )

}