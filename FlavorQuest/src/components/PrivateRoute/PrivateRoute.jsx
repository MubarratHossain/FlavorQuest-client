import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-error"></span> 
      </div>
    );
  }

  return user ? children || <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
