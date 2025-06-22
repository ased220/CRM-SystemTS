// import { useState, type FormEvent } from "react";
import { addTodo } from "../../api/api";
import styles from'./addTask.module.scss'
import { Button, Form, Input, notification } from "antd";
import { titleValidationRules  } from '../../constants/validation'


interface AddTaskProps {
    reloadList: () => void
}

export default function AddTask( {reloadList}: AddTaskProps ) {

    const [form] = Form.useForm();

    const [errorAlert, contextHolder] = notification.useNotification();


    const handleSubmit = async () => {
    
        await form.validateFields();
        const values = form.getFieldsValue();
        try {
            await addTodo({
                title: values.title,
                isDone: false,
            });
            reloadList();
            form.resetFields();
        } catch (error) {
             errorAlert.open({
                message:'Ошибка! Не удалось совершить действие'
            })
            console.error(error);
        }
    };

    return (
        <Form form={form} className={styles.inputTask} onFinish={handleSubmit}>
            {contextHolder}
            <Form.Item
                name="title"
                rules={titleValidationRules}
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