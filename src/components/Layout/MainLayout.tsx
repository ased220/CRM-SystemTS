import { MenuFoldOutlined, MenuUnfoldOutlined, SmileOutlined, UnorderedListOutlined, UserAddOutlined } from "@ant-design/icons";
import { Button, Menu, type MenuProps } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/loginSlice";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
{ key: "1", icon: <UnorderedListOutlined />, label: "Список задач" },
{ key: "2", icon: <SmileOutlined />, label: "Профиль" },
{ key: "3", icon: <UserAddOutlined />, label: "Выход" },// сейча интернета нет нужно иконку на подходящую поменять
];

export default function MainLayout(){

    const dispatch = useAppDispatch();

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => { setCollapsed(!collapsed); };
    const navigate = useNavigate()

    const handleMenu = (e: {key:string}) => {
        if( e.key == '1') navigate('/');
        if( e.key == '2') navigate('/profile');
        if( e.key == '3') {
            dispatch(logout())
            navigate('/registration')        
        }
    }
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
            {/* <div className="page" > */}
                <Outlet />
            {/* </div> */}
        </>
    )
}