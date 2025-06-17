import { Button, Checkbox, Flex, Form, Input } from 'antd'
import skeleton from '../../assets/illustration.png'
import imgAboveText from '../../assets/imgAboveText.svg' // не знаю как назвать
import circle from '../../assets/Vector.png'
import google from '../../assets/google.svg'
import './signIn.scss'
import { Typography } from 'antd';


const { Text, Title, Link  } = Typography
export default function SignUp(){

    const [form] = Form.useForm();


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
                        <Form form ={form} onFinish={() =>{}} className='loginForm' layout='vertical'>
                            <Form.Item
                                name = 'email' 
                                label = 'Email'
                                rules={[{ type: 'email', warningOnly: true }, { type: 'string', min: 6 }]}
                                >
                                <Input placeholder="mail@abc.com" className='inputForm'/>
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