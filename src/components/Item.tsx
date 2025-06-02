import { useState } from 'react';
import { deleteFetch, putFetch } from '../API'
import deleteIcon from '../assets/delete.svg'
import EditIcon from '../assets/edit.svg'
import type { Todo } from '../types/Interface';


interface ItemProps {
    Task:Todo;
    reloadList: () => void;
    edit: { id: number; swap: boolean };
    setEdit: React.Dispatch<React.SetStateAction<{id: number, swap:boolean}>>;
}
export default function Item ({Task, reloadList, edit, setEdit}: ItemProps ){ 
    const [inputError, setIputError] = useState('');
    const [changeTitle, setChangeTitle] = useState('')
    const onChancgeIsDone = async() => {
        try {
            Task.isDone = !Task.isDone
            await putFetch( Task )
            reloadList()    
        } catch (error) {
            console.error(error);
        }
    }

    const onClickDelete = async (id:number) =>{
        try {
            await deleteFetch(id)
            reloadList()
        } catch (error) {
            console.error(error);
        }
    }

    const editTitleInput = (id:number ) =>{
         if (changeTitle.length >= 2 && changeTitle.length <= 64 ){

            setEdit({id: id, swap: true})
            setIputError('')
            const changeTask = Task;
            changeTask.title = changeTitle;
            putFetch(changeTask);

        } else {
            setIputError('Error')            
        }
    
        
    }
    const editTitleText = () =>{
        setEdit({id: Task.id, swap: false})
        // setChangeTitle(event.target)
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
            {
                edit.id == Task.id?(
                    edit.swap? ( 
                        <>
                            <p>{Task.title}</p>    
                            <img src={EditIcon} className='btnList'
                            onClick = {() => setEdit({id: Task.id, swap: false}) }
                            />
                        </>
                    ):(
                        <>
                            <div>
                                <input className= { inputError == 'Error'? 'editInput input-error': 'editInput'} 
                                    defaultValue={Task.title} 
                                    onChange={(e) => setChangeTitle(e.target.value)} 
                                /> 
                                { inputError == 'Error'? <p className='errorText'> Введите значение от 2 до 64 </p>: ''}
                            </div>
                            
                            <button className='btnList' onClick={ () => editTitleInput( Task.id ) }> 	&#10004; </button>
                            <button className='btnList' onClick={ () => setEdit({id: Task.id, swap: true}) }> 	&#10006; </button>
                        </>
                    )  

                ):(
                    <>
                        <p>{Task.title}</p>    
                        <img src={EditIcon} className='btnList'
                            onClick = {() => editTitleText()}
                        />
                    </>
                )
            
            }

            
                <img src={deleteIcon} className='btnList'
                    onClick = {() => onClickDelete(Task.id)}
                />
         </div>
    )
}