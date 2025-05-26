
import type { Todo } from "../API"
import Item from "./Item"

interface ListProps {
    Tasks: Array<Todo>;
    reloadList: () => void;
}

export default function List({Tasks, reloadList}: ListProps){

    
    return (
        <>
        {
            Tasks.map((obj)=>{
               
                return <Item key={obj.id} Task={obj} reloadList={reloadList} />              
            })
            
        }   
        </>
    )

}