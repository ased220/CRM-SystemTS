import { useState } from "react";
import type { TodoInfo, TodoInfoCheck } from "../API";
import { Link } from "react-router";

interface Props{
    statusList:TodoInfo
    setStatus: React.Dispatch<React.SetStateAction<TodoInfoCheck>>
    reloadList: () => void
}

type setStatus = '/' | '/atWork' | '/done'

export default function StateWork({statusList, setStatus, reloadList }:Props){
    const [activeLink, setActiveLink] = useState('/')


    const changeStyle = (path:setStatus) =>{
        setActiveLink(path);
    }
    return (
        
        <div className='link'>
          <Link to='/' 
            id={ activeLink == '/'? 'active': ' '}
            onClick={() => {
                changeStyle('/') 
                setStatus("all")
                reloadList()
                }
            }
          >{ `Все (${statusList.all})` }</Link>

          <Link to='/atWork'
            id={ activeLink == '/atWork'? 'active': ''}
            onClick={() =>{ 
                changeStyle('/atWork')
                setStatus("inWork")
                reloadList()
                }
            }
          > { `В процессе (${statusList.inWork})` }</Link>

          <Link to='/done'
            id={ activeLink == '/done'? 'active': ''}
            onClick={() => {
                changeStyle('/done')
                setStatus("completed")
                reloadList()
                }
            }
          > { `Готово (${statusList.completed})` } </Link>
         
        </div>
    )

}