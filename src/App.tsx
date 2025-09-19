import TodosPage from "./pages/TodosPage"
import './styles/app.scss'
import Profile from "./pages/Profile";
import { Route, Routes, } from "react-router";
import MainLayout from "./components/Layout/MainLayout";
import SignUp from "./components/Sign/SignUp";
import SignIn from "./components/Sign/SignIn";
import AuthLayout from "./components/Layout/authLayout/AuthLayout";

import Users from "./pages/users/Users";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import type { RootState } from "./store/store";
import { useEffect } from "react";
import { getProfile } from "./store/slices/profileSlice";
import UserPage from "./pages/AdminUserProfile";

function App() {

    const { isLogin } = useAppSelector  ((state: RootState) => state.login)
    const dispatch = useAppDispatch();
    
    useEffect(() => {
            
            if (isLogin) { dispatch(getProfile()) }
    }, [isLogin, dispatch   ])
    return(
        
        
        <>        
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<TodosPage pathname = "/" />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/AdminUserProfile/:id" element={<UserPage/>}/>
                </Route>
                    <Route element = {<AuthLayout />}>
                        <Route path="/registration" element={ <SignUp /> } />
                        <Route path="/login" element={ <SignIn /> } />
                    </Route>

            </Routes>
        </>
    )
}

export default App
