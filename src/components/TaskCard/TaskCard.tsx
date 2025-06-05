import { useState } from 'react';
import { deleteTodo, editTodo } from '../../api/api'
import deleteIcon from '../../assets/delete.svg'
import EditIcon from '../../assets/edit.svg'
import type { Todo } from '../../types/Interface';
import styles from './taskCard.module.scss'
import errorStyle from '../AddTask/addTask.module.scss'
interface ItemProps {
    task:Todo;
    reloadList: () => void;
    
}

export default function TaskCard ({task, reloadList}: ItemProps ){ 
    const [inputError, setIputError] = useState('');
    const [changeTitle, setChangeTitle] = useState('')

    const [edit, setEdit] = useState( { swap: true});

    const onChancgeIsDone = async() => {
        try {
            await editTodo( { ...task, isDone: !task.isDone })
            reloadList()    
        } catch (error) {
            alert( "Не удалось изменить статус задачи" );
            console.error(error);
        }
    }

    const onClickDelete = async (id:number) =>{
        try {
            await deleteTodo(id)
            reloadList()
        } catch (error) {
            alert( "Не удалось удалить задачу" );
            console.error(error);
        }
    }

    const editTitleInput = () =>{
         if (changeTitle.length >= 2 && changeTitle.length <= 64 ){

            setEdit({ swap: true})
            setIputError('')
            const changeTask = task;
            changeTask.title = changeTitle;
            editTodo(changeTask);

        } else {
            setIputError('Error')            
            alert( "Не удалось изменить задачу" );
        }
    
        
    }
    return (
         <div className={styles.list}>
            {
                task.isDone? ( 
                    <input className={styles.inpCheck} type="checkbox" checked onChange={() => onChancgeIsDone() } /> 
                    ):(
                    <input className={styles.inpCheck} type="checkbox" checked = {false} onChange={() => onChancgeIsDone()} />
                    )
            }
            {
                    edit.swap? ( 
                        <>
                            <p>{task.title}</p>    
                            <img src={EditIcon} className={styles.btnList}
                            onClick = {() => setEdit({ swap: false}) }
                            />
                        </>
                    ):(
                        <>
                            <div>
                                <input className= { inputError == 'Error'? `editInput ${errorStyle.inputError}`: 'editInput'} 
                                    defaultValue={task.title} 
                                    onChange={(e) => setChangeTitle(e.target.value)} 
                                /> 
                                { inputError == 'Error'? <p className= {errorStyle.errorText}> Введите значение от 2 до 64 </p>: ''}
                            </div>
                            
                            <button className={styles.btnList} onClick={ () => editTitleInput() }> 	&#10004; </button>
                            <button className={styles.btnList} onClick={ () => setEdit({ swap: true}) }> 	&#10006; </button>
                        </>
                    )  
            
            }

                <img src={deleteIcon} className={styles.btnList}
                    onClick = {() => onClickDelete(task.id)}
                />
         </div>
    )
}