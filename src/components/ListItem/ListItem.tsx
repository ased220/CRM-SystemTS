
import type { Todo } from "../../types/Interface"
import TaskCard from "../TaskCard/TaskCard"
import styles from './listItem.module.scss'
interface ListProps {
    tasks: Array<Todo>;
    reloadList: () => void;
}

export default function listItem({tasks, reloadList}: ListProps){


    return (
        <>
        {   
            !tasks.length? (
                <p className= {styles.noTasks}> Задачи отсутствуют </p>
            ):(

                tasks.map((obj)=>{
                    
                    return <TaskCard key={obj.id} task={obj} reloadList={reloadList} />              
                })
                
            )
        }   
        </>
    )

}