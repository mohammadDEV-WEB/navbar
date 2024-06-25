import HttpServices from "./httpServices"

export const getDiscounts=()=>{
    return HttpServices("/admin/discounts","get")
}
export const addDiscounts=()=>{
    return HttpServices("/admin/discounts","post")
}
export const putDiscounts=(id,data)=>{
    return HttpServices(`/admin/discounts/${id}`,"put",data)
}
export const deleteDiscounts=(id)=>{
    return HttpServices(`/admin/discounts/${id}`,"delete")
}
