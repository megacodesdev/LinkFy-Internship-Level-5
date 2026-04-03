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
            // if(!res.data){
            //     alert("Registration has failed")
            // }
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
        
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="header">
                <span className='text-center'>Quest Login</span>
            </div>
            <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit}>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange}/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />

                <button>{isSubmitting ? "Creating account..." : "Create Account"}</button>
            </form>
            <span>No Account<Link to="/">Create Account</Link> </span>
        </div>

        </>
    )

}