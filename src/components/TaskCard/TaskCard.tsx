import { useState } from 'react';
import { deleteTodo, editTodo } from '../../api/api'
import deleteIcon from '../../assets/delete.svg'
import EditIcon from '../../assets/edit.svg'
import type { Todo } from '../../types/Interface';
import styles from './taskCard.module.scss'
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface ItemProps {
    task:Todo;
    reloadList: () => void;
}

export default function TaskCard ({task, reloadList}: ItemProps ){ 
 
    const [form] = Form.useForm();


    const [edit, setEdit] = useState<boolean>( true);

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

    const editTitleInput = async() =>{
        await form.validateFields();
        const values = form.getFieldsValue();
        if (values.title.length >= 2 && values.title.length <= 64) {

            setEdit(true)
            const changeTask = task;
            changeTask.title = values.title;
            editTodo(changeTask);

        } else {
            alert( "Не удалось изменить задачу" );
        }
    
    }
    return (
       
         <div className={styles.list}>
            {
                task.isDone? ( 
                    <Checkbox className={styles.inpCheck} type="checkbox" checked onChange={() => onChancgeIsDone() } /> 
                    ):(
                    <Checkbox className={styles.inpCheck} type="checkbox" checked = {false} onChange={() => onChancgeIsDone()} />
                    )
            }
            {
                    edit? ( 
                        <>
                            <Text className={styles.text}>{task.title}</Text>
                            <Button type='text' className={styles.btnList} >    
                                <img src={EditIcon} className={styles.btnListImg}
                                onClick = {() => setEdit( false ) }
                                />
                            </Button>
                        </>
                    ):(
                        <Form form={form} className={styles.formEdit}>
                            <Form.Item
                                name="title"
                                rules={[
                                    { 
                                        required: true, 
                                        message: "от 2 до 64 символов" 
                                    },
                                    {
                                        min: 2,
                                        message: 'не короче 2 символов!',
                                    },
                                    {
                                        max: 64,
                                        message: 'не длиннее 64 символов!',
                                    },
                                ]}
                                validateTrigger={'onChange'}
                                initialValue = {task.title} 
                            >
                                <Input 
                                    style={{width: '225px', justifyContent:'center'}}
                                />    
                            </Form.Item>
                            <Form.Item>
                            <Button icon={ <CheckOutlined  /> } className={styles.btnList} onClick={ () => editTitleInput() }/>
                            </Form.Item>
                            <Form.Item>
                            <Button icon={ <CloseOutlined /> } className={styles.btnList} onClick={ () => setEdit( true ) }/> 
                            </Form.Item>
                        </Form>
                    )  
                    
                }
                <Button type='text' className={styles.btnList}>
                    <img src={deleteIcon} className={styles.btnListImg} 
                        onClick = {() => onClickDelete(task.id)}
                        />
                </Button>
         </div>
    )
}
