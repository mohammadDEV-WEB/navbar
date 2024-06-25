import React from "react";
import { useNavigate } from "react-router";

const Action = ({rowData,setProductToEdit}) => {
  const navigate=useNavigate()
  return (
    <>
      <i
        className="fas fa-edit text-warning mx-1 hoverable_text pointer has_tooltip"
        title="ویرایش دسته"
        data-bs-placement="top"
        data-bs-toggle="modal"
        data-bs-target="#add_product_modal"
        onClick={()=>setProductToEdit(rowData)}
      ></i>
      <i
        className="fas fa-plus text-success mx-1 hoverable_text pointer has_tooltip"
        title="افزودن ویژگی"
        data-bs-placement="top"
        data-bs-toggle="tooltip"
        onClick={()=>navigate(`/Product/${rowData.id}/attribute`,{state:{productAttr:rowData}})}
      ></i>
      <i
        className="fas fa-times text-danger mx-1 hoverable_text pointer has_tooltip"
        title="حذف دسته"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
      ></i>
    </>
  );
};

export default Action;
