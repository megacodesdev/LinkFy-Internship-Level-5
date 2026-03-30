import React, { useState } from "react";

export default function Repeat() {
    const [loginData, setLoginData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const API_URL=import.meta.env.VITE_API_URL

    const handleChange = (e) => {
        setLoginData([e.target.name]= e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try{
            const resp = await fetch(`${API_URL}/auth/create`)
            if (!resp.ok){
                alert("Oooops! We have got an error while submitting form")
            }
            alert("Account created!")
        } catch(err){
            alert("We have got unexpected error!", err)
            setIsSubmitting(false)
        } finally {
            setIsSubmitting(false)
            alert("Re-submit the form due to unexpected error")
        }

    }


  return (
    <>  
      <div className="w-1/2 flex justify-center align-center">
        <div className="header"> 
          <h1 className="text-white text-lg font-semibold">Quest Login</h1>
        </div>
        <div className="form bg-blue-500 w-full h-[20rem] flex justify-center align-center">
          <form className="w-full p-8 flex flex-col justify-center align-center" onSubmit={handleSubmit}>
            <label htmlFor="username" className="text-white font-semibold">Username</label>
            <input type="text" name="username" value={loginData.username } onChange={handleChange} className="border border-white h-12 focus:outline-none rounded-lg px-4 text-white"/>

            <label htmlFor="email" className="text-white font-semibold">Email</label>
            <input type="email" value={loginData.email } onChange={handleChange} className="border border-white h-12 focus:outline-none rounded-lg px-4 text-white"/>

            <label htmlFor="password" className="text-white font-semibold">Password</label>
            <input type="password" value={loginData.password } onChange={handleChange} className="border border-white h-12 focus:outline-none rounded-lg px-4 text-white"/>
            <span>Show</span>

            <button className="bg-blue-800 text-white h-12 rounded-md cursor-pointer hover:bg-blue-900">{isSubmitting ? "Submitting...." : "Submit"}</button>
          </form>
        </div>
      </div>
    </>
  );
}
