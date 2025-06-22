import { Button, Checkbox, Flex, Form, Input, notification } from 'antd'
import skeleton from '../../assets/illustration.png'
import imgAboveText from '../../assets/imgAboveText.svg' // не знаю как назвать
import circle from '../../assets/Vector.png'
import google from '../../assets/google.svg'
import './signIn.scss'
import { Typography } from 'antd';
import {  useSelector } from 'react-redux'
import { userRegistration } from '../../store/slices/registrationSlice'
import type { UserRegistration } from '../../types/Interface'
import type { AppDispatch, RootState } from '../../store/store'
import { useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'


const { Text, Title, Link  } = Typography

export default function SignIn(){
    
    const dispatch = useAppDispatch();
    const { status, type } = useSelector((state: RootState) => state.register);

    const [form] = Form.useForm();

      const [api, contextHolder] = notification.useNotification();


    useEffect(() => {
        if (status === 'succeeded') {
            console.log('все ок можно перекидывать');
            
        }
    }, [status]);
    useEffect(() => {
        if (type == '200'){
            api.open({
                message: 'Ну тут редирект сделаю и все'
            })
        } 
        if (type == '400'){
            api.open({
                message: 'Bad Request',
                description:'Ошибка десериализации запроса или неверный ввод'
            })
        } 
        if (type == '409'){
            api.open({
                message: 'Conflict',
                description:'Пользователь уже существует'
            })
        } 
        if (type == '500'){
            api.open({
                message: 'Internal Server Error',
                description:'Внутренняя ошибка сервера'
            })
        } 
      }
    , [type])
    
    
    const handleCreateAccount = (values:UserRegistration) =>{        
        dispatch(userRegistration(values));
    }

     return (
        <div className='container'>
            {contextHolder}
            <img src={circle} alt="" className='circle'/>   
            <Flex>
                <img src={skeleton} alt="skeleton" className='illustration' />
                <Flex vertical className='content'>
                    <Flex vertical className='loginAccount'>
                    <img src={imgAboveText} className='imgAboveText'/>
                        <Title level={3} style={{margin: '0'}}> Register to your Account</Title>
                        <Button className='buttonGoogle'> <img src={google} /> Continue with Google </Button>
                        <Text style={{textAlign: 'center'}}>------------- or Sign in with Email -------------</Text>
                        <Form form ={form} onFinish={handleCreateAccount} className='loginForm' layout='vertical'>
                            <Form.Item
                                className='formItem'
                                name = 'username' 
                                label = 'Username'
                                rules={[{required: true, message:'Поле обязательно'},{ type: 'string', min: 1, max: 60 , message:'от 1 до 60'}]}
                                >
                                <Input placeholder="Username" className='inputForm'/>
                            </Form.Item>
                            <Form.Item
                                className='formItem'
                                name = 'login' 
                                label = 'Login'
                                rules={[{required: true, message:'Поле обязательно'},{ type: 'string', min: 1, max: 60 }]}
                                >
                                <Input placeholder="Login" className='inputForm'/>
                            </Form.Item>
                            <Form.Item
                                className='formItem'
                                name = 'password' 
                                label = 'Password'
                                rules={[{ type: 'string', min: 6, max: 60, required:true, message:'Поле обязательно' }]}
                                >
                                <Input.Password placeholder="*****************" className='inputForm' />
                            </Form.Item>
                            <Form.Item
                                className='formItem'
                                name = 'email' 
                                label = 'Email'
                                rules={[{ type: 'email', required: true, message:'Поле обязательно' }]}
                                >
                                <Input placeholder="mail@abc.com" className='inputForm'/>
                            </Form.Item>
                            <Form.Item
                            className='formItem'
                            name="phone"
                            label="phone"
                            rules={[
                                {
                                    min:11, max:11
                                }
                            ]}
                            >
                                <Input placeholder="+7 (123) 456-78-90" className='inputForm' />
                            </Form.Item>
                            <Form.Item>
                                <Flex className='forgotPsw'>
                                    <Flex>
                                        <Checkbox className='checkboxForm'/>
                                        <Text> Remember me</Text>
                                    </Flex>
                                    <Link href='#' className='link'>Forgot Password?</Link>
                                </Flex>
                            </Form.Item>
                            <Form.Item>
                                <Button type='primary' htmlType='submit' className='buttonLogin'>
                                    Register
                                </Button>
                            </Form.Item>
                        </Form>
                    </Flex>
                    <Flex className='containerRegistr' >
                        <Text>Not Registered Yet?</Text>
                        <Link href='#' className='link'>Create an account</Link>
                    </Flex>
                </Flex>
            </Flex>
        </div>

    )
}