import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./components/contexts/AuthContext";

export default function App() {
  return (
    <>
    <AuthProvider>
        <AppRoutes />
      </AuthProvider>

    </>
  );
}
