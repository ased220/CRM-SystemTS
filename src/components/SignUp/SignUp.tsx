import { Button, Checkbox, Flex, Form, Input } from 'antd'
import skeleton from '../../assets/illustration.png'
import imgAboveText from '../../assets/imgAboveText.svg' // не знаю как назвать
import circle from '../../assets/Vector.png'
import google from '../../assets/google.svg'
import './signUp.scss'
import { Typography } from 'antd';
import { useAppDispatch } from '../../app/hooks'
import type { AuthData } from '../../types/Interface'
import { userLogin } from '../../store/slices/loginSlice'


const { Text, Title, Link  } = Typography
export default function SignUp(){

    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const handlerLoginUser = (values:AuthData) =>{
        dispatch(userLogin(values));
    }

     return (
        <div className='container'>
            <img src={circle} alt="" className='circle'/>   
            <Flex>
                <img src={skeleton} alt="skeleton" className='illustration' />
                <Flex vertical className='content'>
                    <Flex vertical className='loginAccount'>
                    <img src={imgAboveText} className='imgAboveText'/>
                        <Title level={1} style={{margin: '0'}}> Login to your Account</Title>
                        <Text>See what is going on with your business</Text>
                        <Button className='buttonGoogle'> <img src={google} /> Continue with Google </Button>
                        <Text style={{textAlign: 'center'}}>------------- or Sign in with Email -------------</Text>
                        <Form form ={form} onFinish={handlerLoginUser} className='loginForm' layout='vertical'>
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
                                rules={[{ type: 'string', min: 6 }]}
                                >
                                <Input.Password placeholder="*****************" className='inputForm'/>
                            </Form.Item>
                            <Flex className='forgotPsw'>
                                <Flex>
                                    <Checkbox className='checkboxForm'/>
                                    <Text> Remember me</Text>
                                </Flex>
                                <Link href='#' className='link'>Forgot Password?</Link>
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
                        <Link href='#' className='link'>Create an account</Link>
                    </Flex>
                </Flex>
            </Flex>
        </div>

    )
}