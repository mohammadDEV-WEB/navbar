import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert } from '../../utils/switAlert';
import { Navigate } from 'react-router';
import HttpServices from '../../services/httpServices';
import { logout } from '../../services/auth';
import LoadingCom from '../../components/LoadingCom';


const Logout = () => {
    const [isLoading,setIsLoading]=useState(true)
    
    const handelRequest= async()=>{
        try {
            const res = await logout()
            if (res.status == 200){
                localStorage.removeItem("token")
                setIsLoading(false) 
                Alert("success","","حساب کاربری شما حذف شد")
            }else{
            }
        } catch (error) {
        }
    
    }


    useEffect(()=>{
        handelRequest()
    },[])
    return (
        <>
            {
                isLoading?(
                    <LoadingCom colorClass={"text-primary"} isSmall={false}/>

                ):(
                    <Navigate to={"/auth/login"} />
                )
            }
        </>
    );
}

export default Logout;
