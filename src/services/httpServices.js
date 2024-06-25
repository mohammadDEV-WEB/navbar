import axios from "axios";
import configure from "./config.json"
import { Alert } from "../utils/switAlert";

export const apiPath = configure.onlineApi


axios.interceptors.response.use((res)=>{
    if (res.status !== 200 && res.status !== 201) {
        if (typeof(res.data)==="object") {
            let message=""
            for (const key in res.data) {
                message=message + `${key}:${res.data[key]}`
            }
            res.data.message=message
        }
        Alert("error","مشکلی !", res.data.message || res.data.phone[0] || res.data.title[0])
    }
    return res
},(error)=>{
    Alert("error",error.response.status,"مشکلی از سمت سرور وجود دارد")
    return Promise.reject(error)
})

const HttpServices = (url,method,data=null) => {
    const token = JSON.parse(localStorage.getItem("token"))
    return axios({
        url: `https://ecomadminapi.azhadev.ir/api${url}`,
        method,
        data,
        headers:{
            "Authorization":token?`Bearer ${token}`:null,
            "Content-Type":"application/json"
        }
    })
}

export default HttpServices;
