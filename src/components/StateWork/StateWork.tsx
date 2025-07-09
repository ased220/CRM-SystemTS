import { useState } from "react";
import type { TodoInfo, TodoInfoCheck } from "../../types/Interface";
import styles from './stateWork.module.scss'
import { Button } from "antd";

interface Props{
    statusList:TodoInfo
    setStatus: React.Dispatch<React.SetStateAction<TodoInfoCheck>>
}

export default function StateWork({statusList, setStatus }:Props){

  const [activeFilterStatus, setActiveFilterStatus] = useState<TodoInfoCheck>('all') 

    return (
        
        <div className={styles.link}>
          <Button 
            type="text"
            className={ activeFilterStatus == 'all'? `${styles.buttonFilter} ${styles.active}`: styles.buttonFilter}
            onClick={() => {
                setStatus("all")
                setActiveFilterStatus('all')
                }
            }
            >{ `Все (${statusList.all})` }</Button>

          <Button
            type="text"
            className={ activeFilterStatus == 'inWork'? `${styles.buttonFilter} ${styles.active}`: styles.buttonFilter}
            onClick={() =>{ 
                setStatus("inWork")
                setActiveFilterStatus('inWork')
                
                }
            }
          > { `В процессе (${statusList.inWork})` }</Button>

          <Button
            type="text"
            className={ activeFilterStatus == 'completed'? `${styles.buttonFilter} ${styles.active}`: styles.buttonFilter}
            onClick={() => {
                setStatus("completed")
                setActiveFilterStatus('completed')

                }
            }
          > { `Готово (${statusList.completed})` } </Button>
         
        </div>
    )

}