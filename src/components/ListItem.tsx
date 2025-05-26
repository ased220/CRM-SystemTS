
import type { Todo } from "../API"
import Item from "./Item"

type Tasks = {
    Tasks:Array <Todo>;
    reloadList: () => void;
}
export default function List({Tasks, reloadList}: Tasks){


    
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