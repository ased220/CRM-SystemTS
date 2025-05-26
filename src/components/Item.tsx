import { deleteFetch, putFetch, type Todo } from '../API'
import deleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'


interface ItemProps {
    Task:Todo;
    reloadList: () => void;
}

export default function Item ({Task, reloadList}: ItemProps ){ 

    const onChancgeIsDone = () => {
        Task.isDone = !Task.isDone
        putFetch( Task )
        reloadList()
    }

    const onClickDelete = async (id:number) =>{
        try {
            await deleteFetch(id)
            reloadList()
        } catch (error) {
            console.error(error);
        }
        //   deleteFetch(id)
        // setTimeout(() => reloadList(),120)
        // C таймаутом все отрабатывает нормально
    }
    return (
         <div className='list'>
            {
                Task.isDone? ( 
                    <input className='inpCheck' type="checkbox" checked onChange={() => onChancgeIsDone() } /> 
                    ):(
                    <input className='inpCheck' type="checkbox" checked = {false} onChange={() => onChancgeIsDone()} />
                    )
            }
            <p>{Task.title}</p>    
            <img src={EditIcon} className='btnList' style={{width: '30px', height: '30px'}}
                // onClick = {() =>}  //setEdit({id: Task.id, swap: false}) 
            />
            <img src={deleteIcon} className='btnList'  style={{width: '30px', height: '30px'}}
                onClick = {() => onClickDelete(Task.id)}
            />
         </div>
    )
}