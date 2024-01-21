import { Outlet, Navigate } from "react-router-dom"
import Cookies from "universal-cookie"

const PrivateRoutes = () => {
    const cookies = new Cookies();
    let accessToken = cookies.get("accessToken")
    return (
        accessToken ? <Outlet /> : <Navigate to="/" />
    )

}

export default PrivateRoutes