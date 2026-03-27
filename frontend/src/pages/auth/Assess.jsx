import React, { useState } from 'react'

export default function Assess() {

    const [showPassword, setShowPassword]=useState (false)

    const [formData,setFormData]= useState({
        username :"",
        password:""
    })
    const handlechange =(e)=>{
    setFormData([e.target.name]=e.target.value)
    // setFormData(...formData,[e.target.name]=e.target.value)

    }
        function showpwd() {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <div className="h-full flex flex-col">
                <form action="flex flex-col">
                    <label htmlFor="usename">Username</label>
                    <input type="text" onChange={handlechange} value={formData.username}/>
                    <label htmlFor="password"> Password</label>
                    <input type= {showPassword ? "text" :"password"} onChange={handlechange} value={formData.password}/>
                    <button type='button' onClick={showpwd}>{showPassword ? "hide" : "show"}</button>
                </form>
            </div>
        </>
    )
}