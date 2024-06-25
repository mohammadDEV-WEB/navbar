import { ErrorMessage, FastField } from "formik";
import React from "react";
import FormikErorr from "./FormikErorr";

const Textarea = ({className,name,placeholder,label}) => {
  return (
    <div className={`col-12 ${className}`}>
      <div className="input-group mb-3 dir_ltr">
        <FastField
          component="textarea"
          className="form-control"
          name={name}
          placeholder={placeholder}
          rows="5"
        ></FastField>
        <span className="input-group-text w_6rem justify-content-center">
          {label}
        </span>
      </div>
      <ErrorMessage name={name} component={FormikErorr} />

    </div>
  );
};

export default Textarea;
