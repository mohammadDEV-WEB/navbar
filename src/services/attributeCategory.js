import HttpServices from "./httpServices"

export const getAttribute=(id)=>{
    return HttpServices(`/admin/categories/${id}/attributes`,"get")
}


export const addAttribute=(id,data)=>{
    return HttpServices(`/admin/categories/${id}/attributes`,"post",data)
}

export const deleteAttribute=(id)=>{
    return HttpServices(`/admin/categories/attributes/${id}`,"delete")
}


export const editAttribute=(id,data)=>{
    return HttpServices(`/admin/categories/attributes/${id}`,"put",data)
}