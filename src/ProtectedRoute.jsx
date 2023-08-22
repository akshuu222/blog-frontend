import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return <>{!userInfo ? <Navigate to={"/login"} /> : <Outlet />}</>;
};

export default ProtectedRoute;
