import React from 'react';

//Import react-router-dom routing components
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Register from '../pages/auth/Register';
import AuthProvider from '../contexts/AuthContext';
import Login from '../pages/auth/Login';

export default function AppRoutes(){
    return(
        <>
        <AuthProvider>
         <Router>
            <Routes>
                <Route path='/' element={ <Register /> } />
                <Route path='/login' element={ <Login /> } />
            </Routes>
         </Router>
         </AuthProvider>
        </>
    )
}