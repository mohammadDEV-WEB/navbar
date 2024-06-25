import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import AddCategory from "../AddCategoty";
import { categoryContext } from "../../../contexts/categoryContext";

const ActionAttribute = ({ rowData ,handelDeleteAttr,setEditAttr,editAttr}) => {
  const {setEditId}=useContext(categoryContext)

  return (
    <div className={` d-flex align-items-center justify-content-center ${editAttr && editAttr.id == rowData.id ? "alert-danger edit-style" : ""}`}>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش دسته"
        data-bs-placement="top"
        data-bs-toggle="tooltip"
        onClick={()=>setEditAttr(rowData)}
      ></i>
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        onClick={()=>handelDeleteAttr(rowData)}
      ></i>
    </div>
  );
};
export default ActionAttribute