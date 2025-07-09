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
        return <Text> Загрузка </Text>
    }
    if( status === 'failed'){
        return <Text> не удалось отобразить профиль</Text>
    }
    return(
        <>
            <ul>
                <li> {user.username} </li>
                <li> {user.email} </li>
                <li> {user.phoneNumber} </li>
            </ul>
        </>
    )
}