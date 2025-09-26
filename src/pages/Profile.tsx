import { Typography } from "antd";
import { useAppSelector } from "../store/hooks";



const { Text } = Typography
export default function Profile(){


    const { user, status} = useAppSelector((state) => state.profile)
    


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
            <Text >Имя пользователя: </Text>
            <Text style={ {display: 'flex'} }> {user.username} </Text>
            <Text>Email:</Text>
            <Text style={ {display: 'flex'}}> {user.email} </Text>
            <Text >Номер телефона:</Text>
            { user.phoneNumber.length > 0
                ? <Text style={ {display: 'flex'}}> {user.phoneNumber} </Text>
                : <Text style={ {display: 'flex'}}> Отсутствует </Text>
            }
        </div>
    )
}