import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar/Index";
import Sidebar from "./sidebar/Index";
import SidebarCON from "../../contexts/SidebarCON";
import ContainSection from "../../pages/containSection";
import { Navigate, json } from "react-router";
import axios from "axios";
import useAuthHook from "../../hook/authHook";
import LoadingCom from "../../components/LoadingCom";

const Index = () => {
  const [isLogin, isLoading] = useAuthHook();

  return (
    <>
      {isLoading ? (
        <div style={{ marginTop: "50vh" }}>
          <LoadingCom colorClass={"text-primary"} isSmall={false} />
        </div>
      ) : isLogin ? (
        <div>
          <SidebarCON>
          <ContainSection />
            <Navbar />
            <Sidebar />
          </SidebarCON>
        </div>
      ) : (
        <Navigate to={"/auth/login"} />
      )}
    </>
  );
};

export default Index;
