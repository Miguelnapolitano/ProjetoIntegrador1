import { Routes, Route } from "react-router-dom"
import { Dashboard } from "../pages/dashboard"
import { LoginPage } from "../pages/login"
import { RegisterPage } from "../pages/register"


export const RoutesMain = () => {
    return(
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage/>} />
            <Route path='/dashboard' element={<Dashboard />} /> 
        </Routes>
    )
}