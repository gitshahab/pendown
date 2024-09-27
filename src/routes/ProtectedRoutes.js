import { Navigate } from 'react-router-dom'

export const ProtectedRoutes = ({children}) => {
    const login = JSON.parse(localStorage.getItem("login")) || false;
    return login ? children : <Navigate to="/" />
}
