import React, { useContext } from 'react'
import { GlobalContext } from '../GlobalContext'
import { Outlet, Navigate } from 'react-router-dom'

function AuthGuard() {
    const context = useContext(GlobalContext)
    const [token] = context.token
    const [isLogged] = context.authApi.isLogged

    return (
        <React.Fragment>
            {
                token && isLogged ? <Outlet /> : <Navigate to={`/login`} />
            }
        </React.Fragment>
    )
}

export default AuthGuard
