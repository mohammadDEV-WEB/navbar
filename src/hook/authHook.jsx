import axios from "axios";
import React, { useEffect, useState } from "react";
import HttpServices from "../services/httpServices";
import { checkUser } from "../services/auth";


const useAuthHook = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const handelRequest = async() => {
    try {
      const res = await checkUser();
      setIsLogin(res.status === 200 ? true : false);
      setIsLoading(false);
    } catch (error) {
      localStorage.removeItem("token");
      setIsLoading(false);
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      handelRequest();
    } else {
      setIsLoading(false);
      setIsLoading(false);
    }
  }, []);
  return [isLogin, isLoading];
};

export default useAuthHook;
