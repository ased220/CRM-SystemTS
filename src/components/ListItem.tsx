import { useEffect, useState } from "react"
import { filterFetch } from "../API"


export default function List(){

    type Status = 'all' | 'completed' | 'inWork'

    const [statusList, setStatusList] = useState<Status>('all')
    const [Tasks, setTasks] = useState([])

    useEffect(() => {
        
        filterFetch(statusList)
        // setInterval(()=>{setTasks(tasks);console.log(Tasks)}, 1000) 
        
    },[statusList])
    
    
    return (
        <p> asdqwedqw</p>
    )

}