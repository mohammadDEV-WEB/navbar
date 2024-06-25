import { setIn } from "formik";
import React from "react";

const Avatar = ({ img, title1, title2, hover }) => {
  return (
    <li className="p-2 d-flex flex-row justify-content-around align-items-center mb-2">
      <span className="avatar_box">
        <img className="rounded-circle" src={`${img}`} width={"50px"} />
      </span>
      {hover ? (
        <div className="title-of-person "
        >
          <div className="sidebar_avatar_name mt-2 hiddenable">
            اسم: {title1}
          </div>
          <div className="sidebar_avatar_name mt-2 hiddenable">
            موقعیت: {title2}
          </div>
        </div>
      ) : (
        ""
      )}
    </li>
  );
};

export default Avatar;
