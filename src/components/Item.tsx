import deleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'

const obj = {
    id  : 5200,
    title : 'go',
    isDone: true
}

export default function Item (){
    return (
         <div className='list'>
            {
                obj.isDone? ( 
                    <input className='inpCheck' type="checkbox" checked ></input> //onChange={() => changeCheckbox( obj.id )}
                    ):(
                    <input className='inpCheck' type="checkbox" checked = {false}  ></input> //onChange={() => changeCheckbox( obj.id )}
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