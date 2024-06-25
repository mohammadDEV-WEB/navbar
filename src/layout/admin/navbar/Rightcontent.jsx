import React, { memo, useCallback, useContext } from "react";
import { adminContext } from "../../../contexts/SidebarCON";

const RightContent = () => {
  const{setShowMenu}=useContext(adminContext)
  const{hover,setHover}=useContext(adminContext)
  const handelClick=()=>setHover(!hover)
  return (
    <div className="right_content h-100 py-1">
      <a className="navbar-brand h-100" href="/">
        <img src="/assets/images/logo.png" className="h-100" />
      </a>
      <div className="form-check form-switch mx-4 d-none d-md-block">
        <input
          id="handle_toggle_sidemenu"
          className="form-check-input pointer"
          type="checkbox"
          onChange={e=>setShowMenu(e.target.checked)}
          onClick={()=>handelClick()}
        />

      </div>
    </div>
  );
};

export default memo(RightContent);
