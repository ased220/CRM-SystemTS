import { Button, Menu, type MenuProps } from "antd"
import TodosPage from "./pages/TodosPage"
import { MenuFoldOutlined, MenuUnfoldOutlined, SmileOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useState } from "react";
import './styles/app.scss'
import Profile from "./pages/Profile";
import { Route, Routes, useNavigate, useLocation } from "react-router";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
{ key: "1", icon: <UnorderedListOutlined />, label: "Список задач" },
{ key: "2", icon: <SmileOutlined />, label: "Профиль" },
];

function App() {

    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => { setCollapsed(!collapsed); };
    const navigate = useNavigate()
    const location = useLocation()
    

    const handleMenu = (e: {key:string}) => {
        if( e.key == '1') navigate('/');
        if( e.key == '2') navigate('/profile');

    }

    return(
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
        <div className="page"> 
            <Routes>
                <Route path='/' element={ <TodosPage pathname = {location.pathname}  /> } />
                <Route path='/profile' element={ <Profile /> } />
        
            </Routes>
        </div>
        
        </>


    
    )
}

export default App
