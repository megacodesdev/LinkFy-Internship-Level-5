import React, { useEffect, useState, createContext, useContext } from 'react';

const AuthContext = createContext()

//Custom hook that will be called when we need to make any authentication activity in our application
export const useAuth = () => {
    const context = useContext(AuthContext)
    if(!context){
        console.log("useAuth must be used within an AuthProvider")
    }

    return context;
}

const API_URL = import.meta.env.VITE_API_URL

export default function AuthProvider({children}) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchMe = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${API_URL}/api/users/auth/get/me`, {
                credentials: "include"
            })
            if(!res.ok){
                setToken(null)
                setUser(null)
            }
            const data = await res.json()
            setUser(data.user)
        } catch(err) {
            setLoading(false)
            console.log("Error while trying to fetch current user: ", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMe()
    }, [])

    //Register function
    const register = async (userData) => {
        try{
            const res = await fetch(`${API_URL}/api/users/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })
            if (!res.ok){
                console.log("Server sent invalid response")
            }
            
            const data = await res.json()
            setUser(data.data.user)
            setToken(data.data.token)
            localStorage.setItem("auth_token", data.data.token)
            return data.data
        } catch (err){
            console.log("Error during registration process: ", err)
        }
    }

    const login = async (userData) => {
        try {
            const res = await fetch(`${API_URL}/api/users/auth/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(userData)
            })
            if(!res.ok){
                console.log("Server sent invalid response")
            }

            const data = await res.json()
            setUser(data.data.user)
            setToken(data.data.token)
            localStorage.setItem("auth_token", data.data.token)
            return data.data
        } catch (err){
            console.log("Error during login process: ", err)
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            register,
            login,
            fetchMe
        }}>
            {children}
        </AuthContext.Provider>
    )



}
