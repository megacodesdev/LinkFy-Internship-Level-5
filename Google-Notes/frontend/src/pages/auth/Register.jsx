import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
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
        
        <div className="container flex flex-col justify-center ">
            <div className="header">
                <span>Quest Login</span>
            </div>
        </div>

        </>
    )

}