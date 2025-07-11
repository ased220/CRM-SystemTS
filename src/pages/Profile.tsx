import { useAppDispatch, useAppSelector } from "../store/hooks"
import { useEffect } from "react";
import { getProfile } from "../store/slices/profileSlice";
import { Typography } from "antd";

const { Text } = Typography
export default function Profile(){

    const dispatch = useAppDispatch();

    const { user, status} = useAppSelector((state) => state.profile)

    useEffect(() => {
      
        dispatch(getProfile())
        
        
    }, [dispatch])
    
    if( status === 'loading'){
        return(
            <div className="page">
                <Text> Загрузка </Text>
            </div>
        )
    }
    if( status === 'failed'){
        return(
            <div className="page">
                <Text> не удалось отобразить профиль</Text>
            </div>
        )
    }
    return(
        <div className="page">
            <ul>
                <Text >Имя пользователя: </Text>
                <li> {user.username} </li>
                <Text>Email:</Text>
                <li> {user.email} </li>
                <Text>Номер телефона:</Text>
                { user.phoneNumber.length > 0?
                    <li> {user.phoneNumber} </li>:
                    <li> Отсутствует </li>
                }
            </ul>
        </div>
    )
}