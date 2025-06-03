import { useState } from "react";
import type { TodoInfo, TodoInfoCheck } from "../types/Interface";
import { Link } from "react-router";

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
        
        <div className='link'>
          <Link to='/' 
            id={ activeLink == '/'? 'active': ' '}
            onClick={() => {
                changeStyle('/') 
                setStatus("all")
                
                }
            }
          >{ `Все (${statusList.all})` }</Link>

          <Link to='/atWork'
            id={ activeLink == '/atWork'? 'active': ''}
            onClick={() =>{ 
                changeStyle('/atWork')
                setStatus("inWork")
                
                }
            }
          > { `В процессе (${statusList.inWork})` }</Link>

          <Link to='/done'
            id={ activeLink == '/done'? 'active': ''}
            onClick={() => {
                changeStyle('/done')
                setStatus("completed")
                
                }
            }
          > { `Готово (${statusList.completed})` } </Link>
         
        </div>
    )

}