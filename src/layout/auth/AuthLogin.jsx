import React from "react";
import { Navigate, Route, Routes } from "react-router";
import Login from "../../pages/auth/Login";
import useAuthHook from "../../hook/authHook";
import LoadingCom from "../../components/LoadingCom";

const AuthLogin = () => {
  const [isLogin, isLoading] = useAuthHook();
  return (
    <div className="limiter">
      {isLoading ? (
        <LoadingCom colorClass={"text-primary"} isSmall={false}/>
      ) : !isLogin ? (
        <div className="container-login100">
          <Routes>
            <Route path="/auth/login" element={<Login />} />
          </Routes>
        </div>
      ) : (
        <Navigate to={"/"} />
      )}
    </div>
  );
};

export default AuthLogin;
