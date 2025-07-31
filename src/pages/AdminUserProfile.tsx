import { Button, Form, Input, Typography } from "antd"
import { useNavigate, useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useEffect, useState } from "react"
import { getUserProfileAction, updateUserProfileAction } from "../store/slices/adminSlice"
import { EMAIL_RULES, PHONE_RULES, USERNAME_RULES } from "../constants/validation"

const { Text } = Typography

export default function AdminUserProfile(){

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const { userProfile } = useAppSelector((state) => state.admin);

    const [editUsername, setEditUsername] = useState<boolean>(false);
    const [editEmail, setEditEmail] = useState<boolean>(false);
    const [editPhoneNumber, setEditPhoneNumber] = useState<boolean>(false);

    const [form] = Form.useForm();

    useEffect(()=>{
        if (id){
            dispatch(getUserProfileAction(+id))
        }
    },[dispatch, id]);
    
    const handleChangeUsername = async () => {
        try {
            await form.validateFields(['username']);
            const values = form.getFieldsValue();
            
            if (id) {
                await dispatch(updateUserProfileAction({
                    id: +id,
                    userRequest: { username: values.username }
                }
            ))
        }
        setEditUsername(false);
        }catch (error) {
            console.log(error);
            
        }
    }
    const handleChangeEmail = async () => {
        try {
            await form.validateFields(['email']);
            const values = form.getFieldsValue();
            
            if (id) {
                await dispatch(updateUserProfileAction({
                    id: +id,
                    userRequest: { email: values.email }
                }));
                setEditEmail(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const handleChangePhoneNumber = async () => {
        try {
            await form.validateFields(['phoneNumber']);
            const values = form.getFieldsValue();
            
            if (id) {
                await dispatch(updateUserProfileAction({
                    id: +id,
                    userRequest: { phoneNumber: values.phoneNumber }
                }));
                setEditPhoneNumber(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Button onClick={()=>{navigate('/users')}}> Вернуться </Button>
            <Form form={form} >
                <Text> Имя пользователя: </Text>
                <div>
                {editUsername?(
                    <>
                        <Form.Item
                        name="username"
                        rules={ USERNAME_RULES }
                        validateTrigger="onBlur"
                        initialValue = {userProfile.username} 
                        >
                            <Input/>
                        </Form.Item>
                        <Button onClick={() =>{handleChangeUsername()}}> Сохранить </Button>
                        <Button onClick={() =>{setEditUsername(false)}}> Отмена </Button>
                        
                    </>
                ):
                <>
                        <Text>{userProfile.username}</Text>
                        <Button onClick={() =>{setEditUsername(true)}}> Изменить </Button>
                    </>
                }
                </div>
                <Text> Email: </Text>
                <div>
                {editEmail?(
                    <>
                        <Form.Item
                        name="email"
                        rules={ EMAIL_RULES }
                        validateTrigger="onBlur"
                        initialValue = {userProfile.email} 
                        >
                            <Input/>
                        </Form.Item>
                        <Button onClick={() =>{handleChangeEmail()}}> Сохранить </Button>
                        <Button onClick={() =>{setEditEmail(false)}}> Отмена </Button> 
                    </>
                ):
                <>
                        <Text>{userProfile.email}</Text>
                        <Button onClick={() =>{setEditEmail(true)}}> Изменить </Button>
                    </>
                }
                </div>
                    <Text> Номер телефона</Text>
                <div>
                {editPhoneNumber?(
                    <>
                        <Form.Item
                        name="phoneNumber"
                        rules={ PHONE_RULES }
                        validateTrigger="onBlur"
                        initialValue = {userProfile.phoneNumber} 
                        >
                            <Input/>
                        </Form.Item>
                        <Button onClick={() =>{handleChangePhoneNumber()}}> Сохранить </Button>
                        <Button onClick={() =>{setEditPhoneNumber(false)}}> Отмена </Button>
                        
                    </>
                ):
                    <>
                        { userProfile.phoneNumber? (

                            <Text>{userProfile.phoneNumber}</Text>
                        ):(
                            <Text>Отсутствует</Text>
                        )}
                            <Button onClick={() =>{setEditPhoneNumber(true)}}> Изменить </Button>
                    </>
                }
                </div>
                
            </Form>
        </>
    )
}