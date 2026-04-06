import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from '../../contexts/AuthContext';

export default function Register(){
    const { register } = useAuth()
    const [formData, setFormData] = useState({
        fullnames: "",
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
            const res = await register(formData)
            if(!res.data){
            alert("Registration has failed")
            }
            navigate("/dashboard")
        } catch (err){
            setIsSubmitting(false)
            console.log("Error while processing registration: ", err)
        } finally {
            setIsSubmitting(false)
        }
    }

  return (
    <>
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-yellow from-gray-100 to-gray-200 p-8">
        
        <div className="header mb-6">
            <span className='text-3xl font-bold text--800 tracking-wide'>
                Registration Form
            </span>
        </div>

        <form 
            className='flex flex-col items-center justify-center bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200'
            onSubmit={handleSubmit}
        >
            
            <label htmlFor="fullnames" className="w-full text-sm font-semibold text-gray-700 mb-1">
                Full Names
            </label>
            <input  type="text"  name='fullnames'  value={formData.fullnames}  onChange={handleChange}  placeholder='Enter your full names....' 
                className='w-full mb-4 px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
            />

            <label htmlFor="email" className="w-full text-sm font-semibold text-gray-700 mb-1">
                Email
            </label>
            <input  type="email" name="email" value={formData.email} onChange={handleChange}
                className='w-full mb-4 px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
            />

            <label htmlFor="password" className="w-full text-sm font-semibold text-gray-700 mb-1">
                Password
            </label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} 
                className='w-full mb-6 px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition'
            />

            <button 
                className='w-full py-2.5 rounded-lg bg-blue-600 text-white font-semibold tracking-wide hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-md'
            >
                {isSubmitting ? "Creating account..." : "Create Account"}
            </button>

        </form>

        <span className="mt-5 text-sm text-gray-600">
            Already have account?{" "}
            <Link 
                to="/login" 
                className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition"
            >
                Login here
            </Link>
        </span>

    </div>

    </>
)}