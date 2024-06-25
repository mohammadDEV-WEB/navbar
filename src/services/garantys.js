import HttpServices from "./httpServices"

export const getGuarantees=()=>{
    return HttpServices("/admin/guarantees","get")
}
export const addGuarantees=(data)=>{
    return HttpServices("/admin/guarantees","post",data)
}
export const putGuarantees=(id,data)=>{
    return HttpServices(`/admin/guarantees/${id}`,"put",data)
}
export const deleteGuarantees=(id)=>{
    return HttpServices(`/admin/guarantees/${id}`,"delete")
}