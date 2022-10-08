import React, { createContext, useState, useEffect } from 'react'
import useAuth from './API/AuthApi'

export const GlobalContext = createContext()

function DataProvider(props) {
    const [token, setToken] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('loginToken')) {
            const getToken = async () => {
                const myToken = localStorage.getItem('loginToken')
                setToken(myToken)
            }
            getToken()
        }
    }, [token])

    const data = {
        token: [token, setToken],
        authApi: useAuth(token)
    }

    return (
        <GlobalContext.Provider value={data} >
            {props.children}
        </GlobalContext.Provider>
    )
}

export default DataProvider
