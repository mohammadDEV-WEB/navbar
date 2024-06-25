import { createContext, useState } from "react";


export const adminContext=createContext({
    showMenu:false,
    setShowMenu:()=>{},
    hover:false,
    setHover:()=>{}
})


const SidebarCON = ({children}) => {
    const [showMenu,setShowMenu]=useState(false)
    const [hover, setHover] = useState(false);
    return (
        <adminContext.Provider value={{showMenu,setShowMenu,hover,setHover}}>
            {children}
        </adminContext.Provider>
    );
}

export default SidebarCON;
