import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register";
import SignUp from "../pages/auth/SignUp";
import AdminLayout from "../components/layout/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import Unauthorized from "../pages/Errors/Unauthorized";
import Home from "../pages/clients/Home";
import Messages from "../pages/admin/Messages";
import Members from "../pages/admin/Members";
import Error404 from "../pages/Errors/Error";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/*Admin Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminLayout>
                <Routes>
                <Route index path="/home" element={ <Dashboard /> } />
                <Route path="/messages" element={ <Messages /> } />
                <Route path="/stock" element={ <Members /> } />
                <Route path="*" element={ <Error404 /> } />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/user/home"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
