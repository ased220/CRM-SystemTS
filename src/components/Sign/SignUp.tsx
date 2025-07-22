import { Button, Checkbox, Flex, Form, Input, notification } from 'antd'
import imgAboveText from '../../assets/imgAboveText.svg'
import './sign.scss'
import { Typography } from 'antd';
import { resetStatus, userRegistration } from '../../store/slices/registrationSlice'
import type { UserRegistration } from '../../types/authInterface'
import type { RootState } from '../../store/store'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { EMAIL_RULES, LOGIN_RULES, PASSWORD_RULES, PHONE_RULES, REPEAT_PASSWORD_RULES, USERNAME_RULES } from '../../constants/validation'


const { Text, Title  } = Typography

export default function SignUp(){
    
    const dispatch = useAppDispatch();
    const { status } = useAppSelector((state: RootState) => state.register);

    const navigate = useNavigate();


    const [form] = Form.useForm();
    const [api, contextHolder] = notification.useNotification();
    
    useEffect(() => {
        if (status === 201){
            dispatch(resetStatus())


            navigate('/login')

        } 
        if (status === 400){
            api.open({
                message: 'Bad Request',
                description:'Ошибка десериализации запроса или неверный ввод'
            })
        } 
        if (status === 409){
            api.open({
                message: 'Conflict',
                description:'Пользователь уже существует'
            })
        } 
        if (status === 500){
            api.open({
                message: 'Internal Server Error',
                description:'Внутренняя ошибка сервера'
            })
        } 
      }
    , [status])
    
    
    const handleCreateAccount = (values:UserRegistration) =>{              
        if (values.repeatPassword === values.password){
            dispatch(userRegistration({
                email: values.email,
                login: values.login, 
                password: values.password,
                phoneNumber: values.phoneNumber,
                username: values.username,
            } 
            ));
        }else {
            api.open({
                message: 'Пароли не совпадают',
                description:'Еще раз ПАРОЛИ НЕ СОВПАДАЮТ'
            })
        }        
    }

     return (
        <>
            {contextHolder}
                <Flex vertical className='content'>
                    <Flex vertical className='loginAccount'>
                    <img src={imgAboveText} className='imgAboveText'/>
                        <Title level={3} style={{margin: '0'}}> Register to your Account</Title>
                        
                        <Text style={{textAlign: 'center'}}>------------- or Sign in with Email -------------</Text>

                        <Form form ={form} onFinish={handleCreateAccount} className='loginForm' layout='vertical'>

                            <Form.Item
                                className='formItem'
                                name="username"
                                label="Username"
                                rules={USERNAME_RULES}
                                >
                                <Input placeholder="Username" className='inputForm' maxLength={60}/>
                                </Form.Item>

                                <Form.Item
                                className='formItem'
                                name="login"
                                label="Login"
                                rules={LOGIN_RULES}
                                >
                                <Input placeholder="Login" className='inputForm' maxLength={60}/>
                                </Form.Item>

                                <Form.Item
                                className='formItem'
                                name="password"
                                label="Password"
                                rules={PASSWORD_RULES}
                                >
                                <Input.Password placeholder="*****************" className='inputForm' maxLength={60}/>
                                </Form.Item>

                                <Form.Item
                                className='formItem'
                                name="repeatPassword"
                                label="Repeat password"
                                rules={REPEAT_PASSWORD_RULES}
                                >
                                <Input.Password placeholder="*****************" className='inputForm' maxLength={60}/>
                                </Form.Item>

                                <Form.Item
                                className='formItem'
                                name="email"
                                label="Email"
                                rules={EMAIL_RULES}
                                >
                                <Input placeholder="mail@abc.com" className='inputForm'/>
                                </Form.Item>

                                <Form.Item
                                className='formItem'
                                name="phoneNumber"
                                label="Phone"
                                rules={PHONE_RULES}
                                >
                                <Input placeholder="+7 (123) 456-78-90" className='inputForm'/>
                                </Form.Item>

                            <Form.Item>
                                <Flex className='forgotPsw'>
                                    <Flex>
                                        <Checkbox className='checkboxForm'/>
                                        <Text> Remember me</Text>
                                    </Flex>
                                    <Link to='registration' className='link'>Forgot Password?</Link>
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
                        <Link to='/login' className='link'>Already have an account</Link>
                    </Flex>

                </Flex>
        </>
        
        
    )
}