import HttpServices from "./httpServices"

export const getColors=()=>{
    return HttpServices("/admin/colors","get")
}
export const addColors=(data)=>{
    return HttpServices("/admin/colors","post",data)
}
export const putColors=(id,data)=>{
    return HttpServices(`/admin/colors/${id}`,"put",data)
}
export const deleteColors=(id)=>{
    return HttpServices(`/admin/colors/${id}`,"delete")
}