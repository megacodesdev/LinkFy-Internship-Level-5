// import { set } from 'mongoose'
// import React from 'react'
// import { useState } from 'react'

// const AuthContext = React.createContext()

// export default AuthProvider( children) {
//     const [user, setUser] = useState(null)

//     const fetchUser = async () => {
//         try {
//             const resp = await fetch(`${import.meta.envv.VITE_API_URL}/auth/me`, {
//                 credentials: "include"
//             })

//             if (!resp.ok) {
//                 setUser(null)
//             }

//             resp.ok ? setUser(await resp.json()) : setUser(null)
//         } catch (err) {
//             setUser(null)
//             console.error("Error during fetching user profile: ", err)
//         }
//     }
// }

// <AuthContext.Provider value={{
//     user,
//     fetchUser
// }}>
//     {children}
// </AuthContext.Provider>


