import { Button, Checkbox, Flex, Form, Input, notification } from 'antd'
import skeleton from '../../assets/illustration.png'
import imgAboveText from '../../assets/imgAboveText.svg' // не знаю как назвать
import circle from '../../assets/Vector.png'
import google from '../../assets/google.svg'
import './sign.scss'
import { Typography } from 'antd';
import type { AuthData } from '../../types/Interface'
import {  userLoginAction } from '../../store/slices/loginSlice'
import { Link, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useEffect, useMemo } from 'react'


const { Text, Title  } = Typography

export default function SignIn(){
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    const { statusLogin, isLogin } = useAppSelector(state => state.login);
 
    useEffect(() => {
        if (isLogin) {
            navigate('/');
        }
    }, [isLogin]);

    
    useEffect(() => {
        if (statusLogin === 400) {
            api.error({ message: 'Bad Request', description: 'Ошибка десериализации...' });
        } else if (statusLogin === 401) {
            api.error({ message: 'Unauthorized', description: 'Неверные учетные данные' });
        } else if (statusLogin === 500) {
            api.error({ message: 'Internal Server Error', description: 'Внутренняя ошибка сервера' });
        }
    }, [statusLogin, api]);

    const handlerLogin = async(values:AuthData) =>{
        
            await dispatch(userLoginAction(values));
        
    }
   

    const loginItemMemo = useMemo(()=>{
        return (
            <Flex vertical className='content'>
                    <Flex vertical className='loginAccount'>
                    <img src={imgAboveText} className='imgAboveText'/>
                        <Title level={1} style={{margin: '0'}}> Login to your Account</Title>
                        <Text>See what is going on with your business</Text>
                        <Button className='buttonGoogle'> <img src={google} /> Continue with Google </Button>
                        <Text style={{textAlign: 'center'}}>------------- or Sign in with Email -------------</Text>
                        <Form form ={form} onFinish={handlerLogin} className='loginForm' layout='vertical'>
                            <Form.Item
                                className='formItem'
                                name = 'login' 
                                label = 'Login'
                                rules={[{required: true, message:'Поле обязательно'},{ type: 'string', min: 1, max: 60 }]}
                                >
                                <Input placeholder="Login" className='inputForm'/>
                            </Form.Item>
                            <Form.Item
                                style={{margin:'0'}}
                                name = 'password' 
                                label = 'Password'
                                rules={[{required:true, min: 6 }]}
                                >
                                <Input.Password placeholder="*****************" className='inputForm'/>
                            </Form.Item>
                            <Flex className='forgotPsw'>
                                <Flex>
                                    <Checkbox className='checkboxForm'/>
                                    <Text> Remember me</Text>
                                </Flex>
                                <Link to='/login' className='link'>Forgot Password?</Link>
                            </Flex>
                            <Form.Item>
                                <Button type='primary' htmlType='submit' className='buttonLogin'>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Flex>
                    <Flex className='containerRegistr' >
                        <Text>Not Registered Yet?</Text>
                        <Link to = "/registration" className='link'>Create an account</Link>
                    </Flex>
                </Flex>
        )
    },[]) 

    return (
        <div className='container'>
            {contextHolder}

            <img src={circle} alt="" className='circle'/>   
            <Flex>
                <img src={skeleton} alt="skeleton" className='illustration' />
                {loginItemMemo}
            </Flex>
        </div>

    )
}