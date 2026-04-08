import React, { useEffect, useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        console.log("useAuth must be used within AuthProvider");
    }
    return context;
};

const API_URL = import.meta.env.VITE_API_URL;

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchMe = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/users/auth/get/me`, {
                credentials: "include"
            });

            if (!res.ok) {
                setUser(null);
                setToken(null);
                return;
            }

            const data = await res.json();
            setUser(data.data.user);

        } catch (err) {
            console.log("Error while trying to fetch current user: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMe();
    }, []);

    // REGISTER
    const register = async (userData) => {
        try {
            const res = await fetch(`${API_URL}/api/users/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await res.json();

            const { success, message, data: userDataRes } = data;

            if (!success) {
                return { success, message };
            }

            setUser(userDataRes.user);
            setToken(userDataRes.token);
            localStorage.setItem("auth_token", userDataRes.token);

            return { success, message };

        } catch (err) {
            console.log("Error during registration process: ", err);
        }
    };

    // LOGIN
    const login = async (userData) => {
        try {
            const res = await fetch(`${API_URL}/api/users/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await res.json();

            const { success, message, data: userDataRes } = data;

            if (!success) {
                return { success, message };
            }

            setUser(userDataRes.user);
            setToken(userDataRes.token);
            localStorage.setItem("auth_token", userDataRes.token);

            return { success, message };

        } catch (err) {
            console.log("Error during login process: ", err);
        }
    };

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
    );
}