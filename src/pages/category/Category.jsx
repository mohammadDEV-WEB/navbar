import React from "react";
import CategoryTable from "./CategoryTable";
import EditCom from "../../contexts/categoryContext";

const Category = () => {
  return (
    <EditCom>
      <div
        id="manage_product_category"
        className="manage_product_category main_section"
      >
        <h4 className="text-center my-3">مدیریت دسته بندی محصولات</h4>

        <CategoryTable />

      </div>
    </EditCom>
  );
};

export default Category;
