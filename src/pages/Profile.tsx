import { useAppDispatch, useAppSelector } from "../store/hooks"
import { Typography } from "antd";
import type { RootState } from "../store/store";
import { useEffect   } from "react";
import { getProfile } from "../store/slices/profileSlice";

const { Text } = Typography
export default function Profile(){


    const { user, status} = useAppSelector((state) => state.profile)
    const { isLogin } = useAppSelector((state: RootState) => state.login)
    const dispatch = useAppDispatch();
    
    useEffect(() => {
            
            if (isLogin) { dispatch(getProfile()) }
    }, [isLogin, dispatch   ])

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