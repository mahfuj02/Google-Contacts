import { useCookies } from "react-cookie";
import { Navigate } from 'react-router-dom'
export default function PublicRoute({ children }){
    const [cookie, setCookie] = useCookies();
    return( <> {!cookie.user ? children : <Navigate to="/" />} </>)
    
}