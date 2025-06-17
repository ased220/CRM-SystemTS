import TodosPage from "./pages/TodosPage"
import './styles/app.scss'
import Profile from "./pages/Profile";
import { Route, Routes, useLocation } from "react-router";
import MainLayout from "./components/Layout/MainLayout";



function App() {

    const location = useLocation()
    
    return(
        <>        
            <Routes>
                <Route path="/" element={<MainLayout />}>
                <Route index element={<TodosPage pathname = {location.pathname} />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            </Routes>
        </>


    
    )
}

export default App
