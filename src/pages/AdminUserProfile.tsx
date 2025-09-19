import { Button, Form, Input, Space, Typography } from "antd"
import { useNavigate, useParams } from "react-router"
import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useEffect, useState } from "react"
import { getUserProfileAction, updateUserProfileAction } from "../store/slices/adminUserProfileSlice"
import { EMAIL_RULES, PHONE_RULES, USERNAME_RULES } from "../constants/validation"
import type { UserRequest } from "../types/userInterface"

const {Text} = Typography 

export default function UserPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userProfile } = useAppSelector((state) => state.adminUserProfile)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [form] = Form.useForm()
  const [initialValues, setInitialValues] = useState<UserRequest>({
    username: "",
    email: "",
    phoneNumber: ""
  })

  useEffect(() => {
    if (id) dispatch(getUserProfileAction(+id))
  }, [dispatch, id])

  useEffect(() => {
    const values = {
      username: userProfile?.username || "",
      email: userProfile?.email || "",
      phoneNumber: userProfile?.phoneNumber || ""
    }
    
    form.setFieldsValue(values)
    setInitialValues(values)
  }, [userProfile, form])

  const handleSubmit = async (values: UserRequest) => {
    try {
      if (id) {
        const changedFields: Partial<UserRequest> = {}
        
        Object.keys(values).forEach(key => {
          const field = key as keyof UserRequest
          if (values[field] !== initialValues[field]) {
            changedFields[field] = values[field]
          }
        })

        if (Object.keys(changedFields).length > 0) {
          await dispatch(updateUserProfileAction({
            id: +id,
            userRequest: changedFields
          }))
        }
        
        setInitialValues(values)
      }
    } catch (error) {
      console.error( error )
    }
  }

  const handleCancel = () => {
    form.setFieldsValue(initialValues)
    setIsEditing(false)
  }

  return (
    <>
      <Button onClick={() => navigate('/users')} style={{margin:'50px', width:'200px', height:'50px'}}>
        Вернуться
      </Button>
      <div className="page">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
            <Form.Item
              name="username"
              label="Имя пользователя"
              rules={USERNAME_RULES}
              validateTrigger="onBlur"
            >
            {
                isEditing?(
                    <Input />
                ):(    
                    <Text> {userProfile?.username}</Text>
                )
            }
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={EMAIL_RULES}
            validateTrigger="onBlur"
          >
            {
                isEditing?(
                    <Input />
                ):(
                    <Text> {userProfile?.email} </Text>
                )
            }
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label="Номер телефона"
            rules={PHONE_RULES}
            validateTrigger="onBlur"
          >
             {
                isEditing?(
                    <Input placeholder={isEditing ? '' : 'Отсутствует'} />
                ):(
                    <Text> {userProfile?.phoneNumber} </Text>
                )
            }
          </Form.Item>

          <Space>
            {isEditing ? (
              <>
                <Button type="primary" htmlType="submit" onClick={()=>setIsEditing(false)}>
                  Сохранить
                </Button>
                <Button onClick={handleCancel}>
                  Отмена
                </Button>
              </>
            ) : (
              <Button onClick={() => 
                {
                    setIsEditing(true)                    
                }}>
                Редактировать
              </Button>
            )}
          </Space>
        </Form>
      </div>
    </>
  )
}