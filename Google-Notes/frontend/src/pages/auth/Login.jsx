import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext';

export default function Login(){
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const res = await login(formData)
            if(!res.data){
             alert("Login has failed")
             }
            navigate("/dashboard")
        } catch (err){
            setIsSubmitting(false)
            console.log("Error while processing login: ", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
    <>
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="header mb-6">
            <span className="text-3xl font-bold text-gray-800 text-center block">
                Login Form
            </span>
        </div>

        <form 
            className="flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-4"
            onSubmit={handleSubmit}
        >

            <div className="w-full flex flex-col">
                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input type="email"  name="email"  value={formData.email}  onChange={handleChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            <div className="w-full flex flex-col">
                <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                    Password
                </label>
                <input  type="password"  name="password" value={formData.password} onChange={handleChange} 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
            </div>

            <button 
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
                {isSubmitting ? "Creating account..." : "Create Account"}
            </button>
        </form>

        <span className="mt-4 text-sm text-gray-600">
            No Account? 
            <Link to="/" className="text-blue-600 font-medium ml-1 hover:underline">
                Create Account
            </Link>
        </span>
    </div>

    </>
)}