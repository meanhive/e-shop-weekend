import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import AuthGuard from '../middleware/AuthGuard'
import history from '../middleware/history'
import { GlobalContext } from '../GlobalContext';

/* components */
import AdminDashboard from './Admin/AdminDashboard'
import Login from './Auth/Login'
import Register from './Auth/Register'
import About from './Default/About'
import Contact from './Default/Contact'
import Home from './Default/Home'
import Menu from './Header/Menu'
import Cart from './Product/Cart'
import CheckOut from './Product/CheckOut'
import Product from './Product/Product'
import ProductDetails from './Product/ProductDetails'
import UserDashboard from './User/UserDashboard'
import Pnf from './Util/Pnf'


function Main() {
    const context = useContext(GlobalContext)
    const [isLogged, setIsLogged] = context.authApi.isLogged
    const [isUser, setIsUser] = context.authApi.isUser
    const [isAdmin, setIsAdmin] = context.authApi.isAdmin

    return (
        <Router history={history}>
            <Menu />
            <ToastContainer autoClose={2000} position={'top-right'} />

            <Routes>
                <Route exact path={`/`} element={isAdmin ? <Navigate to={`/admin/dashboard`} /> : <Home />} />
                <Route exact path={`/about`} element={<About />} />
                <Route exact path={`/contact`} element={<Contact />} />
                <Route exact path={`/login`} element={isLogged ? <Navigate to={`/`} /> : <Login />} />
                <Route exact path={`/register`} element={isLogged ? <Navigate to={`/`} /> : <Register />} />

                {
                    isLogged && isUser ? (
                        <Route element={<AuthGuard />} >
                            {/* product route */}
                            <Route exact path={`/product`} element={<Product />} />
                            <Route exact path={`/product/details/:id`} element={<ProductDetails />} />
                            <Route exact path={`/cart`} element={<Cart />} />
                            <Route exact path={`/checkout`} element={<CheckOut />} />
                            {/* user route */}
                            <Route path={`/user/dashboard`} element={<UserDashboard />} />
                        </Route>
                    ) : null
                }

                {
                    isLogged && isAdmin ? (
                        <Route element={<AuthGuard />} >
                            {/* admin route */}
                            <Route path={`/admin/dashboard`} element={<AdminDashboard />} />
                        </Route>
                    ) : null
                }

                <Route exact path={`/*`} element={<Pnf />} />
            </Routes>
        </Router>
    )
}

export default Main