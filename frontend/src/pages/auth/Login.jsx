import React, { useState } from 'react'

export default function Login() {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState(null)

    const handleOnChange = (e) => {
        setFormData([e.target.name]= e.target.value)
    }

    const showPwd = (e) => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const resp = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                body: formData
            })

            if (resp.ok) {
                const data = await resp.json()
                setUser(data.user)
            }
            setMessage("Login successful!")
        } catch (err) {
            setMessage("Ooops! We got an error during login process.")
            setIsSubmitting(false)
            setUser(null)
        } finally {
            setMessage("Network error! Check your internet connection and try again!")
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <div className="h-screen flex justify-center -left-8">
                <h1 className='text-white text-center'>Login  </h1>
                <form className='h-1/2 w-full md:w-[30%] sm:w-full bg-gray-800 p-8 text-white flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor='username'>Username</label>
                    <input type="text" placeholder='Enter your username' className='h-12 p-4 border rounded-md' value={formData.username} onChange={handleOnChange} required/>
                    <label htmlFor='password'>Password</label>                    
                    <input type={showPassword ? "text" : "password"} placeholder='enter your password' className='h-12 p-4 border rounded-md' value={formData.password} onChange={handleOnChange} required/>
                    <button type='button' className='text-right mt-2' onClick={showPwd}>{showPassword ? "Hide" : "Show"}</button>
                    <span>{message}</span>
                    <button type="submit" className='bg-blue-600 py-2 font-semibold rounded-md text-white hover:bg-blue-500 hover:cursor-pointer mt-4'>{isSubmitting ? "Processing..." : "Login"}</button>
                </form>

            </div>
        </>
    )
}