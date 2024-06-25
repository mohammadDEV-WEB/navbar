import moment from "jalali-moment"

export const date=(data)=>{
    return moment(data).format("jYYYY/jM/jD")
}