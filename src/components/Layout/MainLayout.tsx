import { MenuFoldOutlined, MenuUnfoldOutlined, SmileOutlined, TeamOutlined, UnorderedListOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Menu, type MenuProps } from "antd";
import { useEffect,  useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, refreshTokenAction, resetStatusLogin } from "../../store/slices/loginSlice";
import type { RootState } from "../../store/store";
type MenuItem = Required<MenuProps>["items"][number];

export default function MainLayout(){
    const {roles} = useAppSelector( state => state.profile.user)
    const dispatch = useAppDispatch();
    
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const toggleCollapsed = () => { setCollapsed(!collapsed); };
    const navigate = useNavigate()
    
    const baseitems: MenuItem[] = [
        { key: "1", icon: <UnorderedListOutlined />, label: "Список задач" },
        { key: "2", icon: <SmileOutlined />, label: "Профиль" },
        { key: "3", icon: <UserAddOutlined />, label: "Выход" },
    ];
    const adminItem: MenuItem = { key: "4", icon: <TeamOutlined />, label: "Пользователи" };
    
    const items = roles.includes( "ADMIN" ) ? [...baseitems, adminItem] : baseitems;
    
    const handleMenu = (e: {key:string}) => {
        if( e.key == '1') navigate('/');
        if( e.key == '2') navigate('/profile');
        if( e.key == '3') { dispatch(logout()); navigate('/registration') }
        if( e.key == '4') {navigate('/users')}
    }

    
    const { statusToken } = useAppSelector((state: RootState) => state.login)

    useEffect(() => {
              
                const checkAuth = async () =>{
                    
                    const refToken = localStorage.getItem('refreshToken');
                    if (refToken){
                        await dispatch( refreshTokenAction(refToken));
                    }else{
                        dispatch(resetStatusLogin())
                        navigate('/login')
                    }
                    // if (statusToken === 401){
                        
                    //     navigate('/login')
                    // }
                };
                checkAuth();
                
        }, [dispatch, navigate])


    useEffect(() => {
        if (statusToken === 401){
            
            navigate('/login')
        }
        
    }, [ statusToken, navigate ])
    return (
        <>
            <div className="navigation" >

                <Button 
                    type="primary"
                    onClick={toggleCollapsed}
                    className="buttonNavigation"
                    >
                    {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>

                <Menu
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                    inlineCollapsed={collapsed}
                    items={items}
                    onClick={handleMenu}
                    />
            </div>
                <Outlet />
        </>
    )
}