import { useState } from 'react';
import { deleteTodo, editTodo } from '../../api/api'
import deleteIcon from '../../assets/delete.svg'
import EditIcon from '../../assets/edit.svg'
import type { Todo } from '../../types/Interface';
import styles from './taskCard.module.scss'
import { Button, Checkbox, Form, Input, notification, Typography } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { titleValidationRules  } from '../../constants/validation'
const { Text } = Typography;

interface ItemProps {
    task:Todo;
    reloadList: () => void;
}

export default function TaskCard ({task, reloadList}: ItemProps ){ 
 
    const [form] = Form.useForm();

    const [errorAlert, contextHolder] = notification.useNotification();


    const [edit, setEdit] = useState<boolean>( true);

    const onChancgeIsDone = async() => {
        try {
            await editTodo( { ...task, isDone: !task.isDone })
            reloadList()    
        } catch (error) {
            errorAlert.open({
                message:'Не удалось изменить статус задачи'
            })
            console.error(error);
        }
    }

    const onClickDelete = async (id:number) =>{
        try {
            await deleteTodo(id)
            reloadList()
        } catch (error) {
            errorAlert.open({
                message:"Не удалось удалить задачу"
            })
            console.error(error);
        }
    }

    const handleChangeTodoTitle   = async() =>{
        
        try{
            form.validateFields();
            const values = form.getFieldsValue();
            setEdit(true)
            await editTodo({...task, title:values.title});
            reloadList()
        }catch{
            errorAlert.open({
                message:'Изменения не применились'
            })
        }

    }
    const handleClose = () => {
        form.resetFields(); 
        setEdit(true);     
    };

    return (
       
         <div className={styles.list}>
            {contextHolder}
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
                        <Form form={form} className={styles.formEdit} onFinish = { handleChangeTodoTitle   }>
                            <Form.Item
                                name="title"
                                rules={ titleValidationRules  }
                                validateTrigger={'onChange'}
                                initialValue = {task.title} 
                            >
                                <Input style={{width: '225px', justifyContent:'center'}}/>    
     
                            </Form.Item>
                            <Form.Item>
                            <Button icon={ <CheckOutlined  /> } className={styles.btnList}  htmlType='submit'/>
                            </Form.Item>
                            <Form.Item>
                            <Button icon={ <CloseOutlined /> } className={styles.btnList} onClick={ () => handleClose() }/> 
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
