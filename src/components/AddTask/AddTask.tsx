// import { useState, type FormEvent } from "react";
import { addTodo } from "../../api/api";
import styles from'./addTask.module.scss'
import { Button, Form, Input } from "antd";


interface AddTaskProps {
    reloadList: () => void
}

export default function AddTask( {reloadList}: AddTaskProps ) {

    const [form] = Form.useForm();



    const handleSubmit = async () => {
    
        await form.validateFields();
        const values = form.getFieldsValue();
        try {
           if (values.title.length >= 2 && values.title.length <= 64) {
                await addTodo({
                    title: values.title,
                    isDone: false,
                });
                reloadList();
                form.resetFields();
            }
        } catch (error) {
            alert('Ошибка! Не удалось совершить действие')
            console.error(error);
        }
    };

    return (
        <Form form={form} className={styles.inputTask} onFinish={handleSubmit}>
            <Form.Item
                name="title"
                rules={[
                    { 
                        required: true, 
                        message: "Введите значение от 2 до 64 символов" 
                    },
                    {
                        min: 2,
                        message: 'Значение должно быть не короче 2 символов!',
                    },
                    {
                        max: 64,
                        message: 'Значение должно быть не длиннее 64 символов!',
                    },
                ]}
                validateTrigger={'onChange'}

            >
                <Input placeholder="Task to be done..."
                    className={styles.taskAddInput}
                />
            </Form.Item>   
            <Form.Item >
                <Button type="primary" htmlType="submit" className={styles.taskAddButton}>
                    Add
                </Button>
            </Form.Item>

        </Form>
        

    );
}