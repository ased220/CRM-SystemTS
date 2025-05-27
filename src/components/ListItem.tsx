
import { useState } from "react";
import type { Todo } from "../API"
import Item from "./Item"

interface ListProps {
    Tasks: Array<Todo>;
    reloadList: () => void;
}

export default function List({Tasks, reloadList}: ListProps){

    const [edit, setEdit] = useState( {id: -1, swap: false});

    return (
        <>
        {   
            !Tasks.length? (
                <p className='noTasks'> Задачи отсутствуют </p>
            ):(

                Tasks.map((obj)=>{
                    
                    return <Item key={obj.id} Task={obj} reloadList={reloadList} edit={edit} setEdit={setEdit}/>              
                })
                
            )
        }   
        </>
    )

}