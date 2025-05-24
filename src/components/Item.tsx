import { putFetch } from '../API'
import deleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'

const obj = {
    id: 6719,
      title: 'fsdfsd1c  dw fw wf' ,
      created: '2025-05-23T05:17:50.73614Z',
      isDone: true
}
const onChancgeIsDone = () => {
    obj.isDone = !obj.isDone
    putFetch( obj )
}

export default function Item (){
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
            <img src={EditIcon} className='btnList'
                // onClick = {() =>}  //setEdit({id: obj.id, swap: false}) 
            />
            <img src={deleteIcon} className='btnList'
                // onClick = {() => onClickDelete(obj.id)}
            />
         </div>
    )
}