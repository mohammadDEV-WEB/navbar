import { ErrorMessage, FastField } from "formik";
import React from "react";
import FormikErorr from "./FormikErorr";

const File = ({ className, name, placeholder, label }) => {
  return (
    <FastField>
      {({ form ,field }) => {
        return (
          <div className={`col-12 ${className}`}>
            <div className="input-group mb-3 dir_ltr">
              <input
                type="file"
                className="form-control"
                placeholder={placeholder}
                name={name}
                onChange={(e) => form.setFieldValue(name,e.target.files[0])}
              />
              <span className="input-group-text w_6rem justify-content-center">
                {label}
              </span>
            </div>
            <ErrorMessage name={name} component={FormikErorr} />
          </div>
        );
      }}
    </FastField>
  );
};

export default File;
