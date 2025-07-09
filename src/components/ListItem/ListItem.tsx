
import { Typography } from "antd";
import type { Todo } from "../../types/Interface"
import TaskCard from "../TaskCard/TaskCard"
import styles from './listItem.module.scss'

const { Text } = Typography;

interface ListProps {
    tasks: Array<Todo>;
    reloadList: () => void;
}

export default function listItem({tasks, reloadList}: ListProps){


    return (
        <>
        {   
            !tasks.length? (
                <Text className= {styles.noTasks}> Задачи отсутствуют </Text>
            ):(

                tasks.map((obj)=>{
                    
                    return <TaskCard key={obj.id} task={obj} reloadList={reloadList} />              
                })
                
            )
        }   
        </>
    )

}