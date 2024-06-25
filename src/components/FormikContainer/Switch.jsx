import { ErrorMessage, FastField } from "formik";
import React from "react";
import FormikErorr from "./FormikErorr";

const Switch = ({className,id,label , name}) => {
  return (
    <div className={`${className}`}>
      <div className="form-check form-switch d-flex flex-row-reverse justify-content-center gap-5">
        <FastField
          className="form-check-input pointer"
          type="checkbox"
          id={id}
          name={name}
        />
        <label
          className="form-check-label pointer"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      <ErrorMessage name={name} component={FormikErorr} />

    </div>
  );
};

export default Switch;
