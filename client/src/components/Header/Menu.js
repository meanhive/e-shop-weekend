import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';


function Menu() {
    const context = useContext(GlobalContext)
    const [isLogged, setIsLogged] = context.authApi.isLogged
    const [isUser, setIsUser] = context.authApi.isUser
    const [isAdmin, setIsAdmin] = context.authApi.isAdmin

    const navigate = useNavigate()

    const logoutUser = async () => {
        if (window.confirm(`Are you sure to logout?`)) {
            await axios.get(`/api/v1/auth/logout`)
            localStorage.clear()
            if (isAdmin) {
                setIsAdmin(false)
            }
            if (isUser) {
                setIsUser(false)
            }
            setIsLogged(false)
            toast.success("Successfully Logout")
            navigate(`/`)
            window.location.href = "/"
        } else {
            toast.warning("logout terminated")
        }
    }

    const userRoute = (
        <ul className="navbar-nav">
            <li className="nav-item dropdown">
                <NavLink to={`/`} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Account</NavLink>
                <ul className="dropdown-menu">
                    <li>
                        <NavLink to={`/user/dashboard`} className="dropdown-item">User dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={logoutUser} to={`/`} className="dropdown-item btn btn-danger">Logout</NavLink>
                    </li>
                </ul>
            </li>
        </ul>
    )

    const adminRoute = (
        <ul className="navbar-nav">
            <li className="nav-item dropdown">
                <NavLink to={`/`} className="nav-link dropdown-toggle" data-bs-toggle="dropdown">Account</NavLink>
                <ul className="dropdown-menu">
                    <li>
                        <NavLink to={`/admin/dashboard`} className="dropdown-item">Admin dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink onClick={logoutUser} to={`/`} className="dropdown-item btn btn-danger">Logout</NavLink>
                    </li>
                </ul>
            </li>
        </ul>
    )

    const authRoute = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to={`/login`} className="nav-link">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to={`/register`} className="nav-link">Register</NavLink>
            </li>
        </ul>
    )


    const commonRoute = (
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink to={`/`} className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to={`/about`} className="nav-link">About</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to={`/contact`} className="nav-link">Contact</NavLink>
            </li>
        </ul>
    )


    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
                <NavLink to={`/`} className="navbar-brand">E-kartz</NavLink>

                <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menu">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-md-between" id="menu">
                    {commonRoute}
                    {isLogged ? (
                        <React.Fragment>
                            {
                                isUser ? userRoute : null
                            }
                            {
                                isAdmin ? adminRoute : null
                            }
                        </React.Fragment>
                    ) : authRoute}
                </div>
            </div>
        </nav>
    )
}

export default Menu