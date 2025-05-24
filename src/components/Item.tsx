import { deleteFetch, putFetch, type Todo } from '../API'
import deleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'


interface ItemProps {
    obj:Todo;
    reloadList: () => void;
}

export default function Item ({obj, reloadList}: ItemProps ){ 

    const onChancgeIsDone = () => {
        obj.isDone = !obj.isDone
        putFetch( obj )
    }

    const onClickDelete = async (id:number) =>{
        try {
            await deleteFetch(id)
            reloadList();
        }catch{
            console.error('Error: ну не судьба удалить')
        }
    }
    return (
         <div className='list'>
            {
                obj.isDone? ( 
                    <input className='inpCheck' type="checkbox" checked onChange={() => onChancgeIsDone() } /> 
                    ):(
                    <input className='inpCheck' type="checkbox" checked = {false} onChange={() => onChancgeIsDone()} />
                    )
            }
            <p>{obj.title}</p>    
            <img src={EditIcon} className='btnList' style={{width: '30px', height: '30px'}}
                // onClick = {() =>}  //setEdit({id: obj.id, swap: false}) 
            />
            <img src={deleteIcon} className='btnList'  style={{width: '30px', height: '30px'}}
                onClick = {() => onClickDelete(obj.id)}
            />
         </div>
    )
}