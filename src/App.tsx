import TodosPage from "./pages/TodosPage"
import './styles/app.scss'
import Profile from "./pages/Profile";
import { Route, Routes, useLocation, useNavigate } from "react-router";
import MainLayout from "./components/Layout/MainLayout";
import SignUp from "./components/Sign/SignUp";
import SignIn from "./components/Sign/SignIn";
import { useEffect } from "react";
import { refreshTokenAction, resetStatusLogin } from "./store/slices/loginSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import type { RootState } from "./store/store";


function App() {

    const location = useLocation()
    const navigate = useNavigate();
    
    const dispatch = useAppDispatch()
    const { statusToken } = useAppSelector((state: RootState) => state.login)
    
    
    
    useEffect(() => {
        const checkAuth = async () =>{
            if (location.pathname !== '/login' && location.pathname !== '/registration'){

                const refToken = localStorage.getItem('refreshToken');
                if (refToken){
                    
                    await dispatch( refreshTokenAction(refToken));
                }else{
                    dispatch(resetStatusLogin())
                    navigate('/login')
                }
                if (statusToken === 401){
                    navigate('/login')
                }
            }
        };
        checkAuth();
    }, [location])
    
    useEffect(() => {
        if (statusToken === 401){
            
            navigate('/login')
        }
        
    }, [statusToken ])
    
    return(
        
        
        <>        
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<TodosPage pathname = {location.pathname} />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                    <Route path="/registration" element={ <SignUp /> } />
                    <Route path="/login" element={ <SignIn /> } />
            </Routes>
        </>
    )
}

export default App
