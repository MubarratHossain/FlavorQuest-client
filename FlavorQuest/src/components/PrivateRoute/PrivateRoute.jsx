import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";
import axios from "axios";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isTokenValid, setIsTokenValid] = useState(null); 

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get("http://localhost:5000/validate-token", {
          withCredentials: true, 
        });
        setIsTokenValid(response.data.isValid);
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsTokenValid(false);
      }
    };

    if (user) {
      validateToken();
    } else {
      setIsTokenValid(false);
    }
  }, [user]);

  if (loading || isTokenValid === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }

  if (!user || !isTokenValid) {
    return <Navigate to="/login" replace />;
  }

  return children || <Outlet />;
};

export default PrivateRoute;
