import React, { createContext, useState, useEffect } from 'react'
import { apiClient } from '../api/api.js';


export const AuthContext = createContext()


export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const raw = localStorage.getItem('razi_user')
        return raw ? JSON.parse(raw) : null
    })


    useEffect(() => {
        if (user) localStorage.setItem('razi_user', JSON.stringify(user))
        else localStorage.removeItem('razi_user')
    }, [user])


    const login = async (email, password) => {
        const res = await apiClient.get('/users', { params: { email, password } })
        const found = res.data[0]
        if (!found) throw new Error('Invalid credentials')
        setUser(found)
        return found
    }


    const signup = async (payload) => {
        // simple duplicate check
        const check = await apiClient.get('/users', { params: { email: payload.email } })
        if (check.data.length) throw new Error('Email already exists')
        const res = await apiClient.post('/users', payload)
        setUser(res.data)
        return res.data
    }


    const logout = () => setUser(null)


    return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
        {children}
    </AuthContext.Provider>
    )
}