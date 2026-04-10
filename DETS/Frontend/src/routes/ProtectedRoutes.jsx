import { Navigate } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="loadingcontainer relative w-full h-screen flex justify-center items-center">
        <div className="loading relative w-10 h-10 bg-blue-500 rounded-full flex justify-center items-center border-5 border-blue-500  border-b-white">
          <div className="loader absolute  w-8 h-8 border-3 border-white bg-white rounded-full"></div>
        </div>
        <div className="loading-word relative left-6">
            <p className="text-blue-500 font-semibold text-2xl">Loading</p>
          </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children
}
