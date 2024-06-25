import HttpServices from "./httpServices"

export const getBrands=()=>{
    return HttpServices("/admin/brands","get")
}


export const addBrands=(data)=>{
    if (data.image) {
        const formData=new FormData()
        formData.append("original_name",data.original_name)
        formData.append("persian_name",data.persian_name)
        formData.append("descriptions",data.descriptions)
        formData.append("logo",data.logo)
        data=formData
    }
    return HttpServices("/admin/brands","post",data)
}


export const putBrands=(id,data)=>{
    if (data.image) {
        const formData=new FormData()
        formData.append("original_name",data.original_name)
        formData.append("persian_name",data.persian_name)
        formData.append("descriptions",data.descriptions)
        formData.append("logo",data.logo)
        data=formData
    }
    return HttpServices(`/admin/brands/${id}`,"post",data)
}


export const deleteBrands=(id)=>{
    return HttpServices(`/admin/brands/${id}`,"delete")
}