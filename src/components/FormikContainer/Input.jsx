import { ErrorMessage, FastField } from "formik";
import React from "react";
import FormikErorr from "./FormikErorr";

const Input = ({className,name,placeholder,label,type="text"}) => {
  return (
    <div className={`col-12 ${className}`}>
      <div className="input-group mb-3 dir_ltr">
        <FastField type={type} className="form-control" placeholder={placeholder} name={name} />
        <span className="input-group-text w_6rem justify-content-center">
          {label}
        </span>
      </div>
      <ErrorMessage name={name} component={FormikErorr} />

    </div>
  );
};

export default Input;
