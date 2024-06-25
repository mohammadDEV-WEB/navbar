export const logout = ()=>{
    return HttpServices("/auth/logout","GET")
}