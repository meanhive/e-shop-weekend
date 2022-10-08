import React, { useState, useEffect } from 'react'

function useAuth(token) {
    const [user, setUser] = useState(null)
    // login state
    const [isLogged, setIsLogged] = useState(false)
    // role
    const [isUser, setIsUser] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('role') && localStorage.getItem('id') && token) {
            let role = localStorage.getItem('role')
            let id = localStorage.getItem('id')

            if (role === 'user') {
                setIsUser(true)
                setIsLogged(true)
                setUser(id)
            }
            if (role === 'superadmin') {
                setIsAdmin(true)
                setIsLogged(true)
                setUser(id)
            }
        }
    }, [token, isLogged, isUser, isAdmin])

    return {
        userData: [user, setUser],
        isLogged: [isLogged, setIsLogged],
        isUser: [isUser, setIsUser],
        isAdmin: [isAdmin, setIsAdmin]
    }
}

export default useAuth
