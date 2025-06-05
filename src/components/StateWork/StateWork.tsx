import { useState } from "react";
import { Link } from "react-router";
import type { TodoInfo, TodoInfoCheck } from "../../types/Interface";
import styles from './stateWork.module.scss'

interface Props{
    statusList:TodoInfo
    setStatus: React.Dispatch<React.SetStateAction<TodoInfoCheck>>
}

type setStatus = '/' | '/atWork' | '/done'

export default function StateWork({statusList, setStatus }:Props){
    const [activeLink, setActiveLink] = useState('/')


    const changeStyle = (path:setStatus) =>{
        setActiveLink(path);
    }
    return (
        
        <div className={styles.link}>
          <Link to='/' 
            className={ activeLink == '/'? styles.active: ''}
            onClick={() => {
                changeStyle('/') 
                setStatus("all")
                
                }
            }
          >{ `Все (${statusList.all})` }</Link>

          <Link to='/atWork'
            className={ activeLink == '/atWork'? styles.active : ''}
            onClick={() =>{ 
                changeStyle('/atWork')
                setStatus("inWork")
                
                }
            }
          > { `В процессе (${statusList.inWork})` }</Link>

          <Link to='/done'
            className={ activeLink == '/done'? styles.active : ''}
            onClick={() => {
                changeStyle('/done')
                setStatus("completed")
                
                }
            }
          > { `Готово (${statusList.completed})` } </Link>
         
        </div>
    )

}