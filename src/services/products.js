import { formData } from "./formData"
import HttpServices from "./httpServices"

export const getProduct=(page,count,searchChar)=>{
    return HttpServices(`/admin/products?page=${page}&count=${count}&searchChar=${searchChar}`,"get")
}
export const addProduct=(data)=>{
    return HttpServices("/admin/products","post",data.image?formData(data):data)
}
export const putProduct=(id,data)=>{
    return HttpServices(`/admin/products/${id}`,"put",data)
}
// export const deleteProduct=(id)=>{
//     return HttpServices(`/admin/discounts/${id}`,"delete")
// }
// https://ecomadminapi.azhadev.ir/api/admin/products?page=2&count=3