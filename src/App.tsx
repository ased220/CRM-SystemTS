import TodosPage from "./pages/TodosPage"
import './styles/app.scss'
import Profile from "./pages/Profile";
import { Route, Routes, } from "react-router";
import MainLayout from "./components/Layout/MainLayout";
import SignUp from "./components/Sign/SignUp";
import SignIn from "./components/Sign/SignIn";
import AuthLayout from "./components/Layout/authLayout/AuthLayout";

function App() {

    return(
        
        
        <>        
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<TodosPage pathname = "/" />} />
                    <Route path="/profile" element={<Profile />} />
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
