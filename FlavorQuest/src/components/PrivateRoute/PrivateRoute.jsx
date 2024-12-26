import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Authprovider/Authprovider";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isTokenValid, setIsTokenValid] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      if (!user) {
        setIsTokenValid(false);
        return;
      }
      try {
        const { data } = await axios.get("https://flavor-server-side.vercel.app/validate-token", {
          withCredentials: true,
        });
        setIsTokenValid(data.isValid);
      } catch (error) {
        console.error("Token validation failed:", error);
        setIsTokenValid(false);
      }
    };

    validateToken();
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
