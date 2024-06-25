import swal from "sweetalert";

export const Alert =(icon,title,text)=>{
    swal({
        icon,
        title,
        text,
        buttons:"متوجه شدم",
    });
}


export const confirm =(icon,title,text)=>{
    return swal({
        icon,
        title,
        text,
        buttons:["خیر","بله"],
        dangerMode: true
    });
}