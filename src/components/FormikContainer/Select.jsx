import { ErrorMessage, FastField, Field } from "formik";
import React from "react";
import FormikErorr from "./FormikErorr";

const Select = ({
  className,
  option,
  name,
  label,
  option_one,
  functionChang,
  productElement
}) => {
  const setOptions = () => {
    return (
      <>
        <option value="0">{option_one}</option>
        {option.map((o) => (
          <option
            key={o.id}
            value={o.id}
          >{`اسم :${o.value} / ایدی :${o.id} `}</option>
        ))}
      </>
    );
  };

  return (
    <div className={`col-12 ${className}`}>
      <div className="input-group mb-3 dir_ltr">
        <Field>
          {({ form }) => {
            return (
              <>
                {functionChang ? (
                  <Field
                    as="select"
                    type="text"
                    className="form-control"
                    name={name}
                    onChange={(e) => functionChang(e.target.value, form)}
                  >
                    {setOptions()}
                    <a class="btn btn-success" href="/products/addColor">اضافه کردن</a>
                  </Field>
                ) : (
                  <Field
                    as="select"
                    type="text"
                    className="form-control"
                    name={name}
                  >
                    {setOptions()}
                    <a class="btn btn-success" href="/products/addColor">اضافه کردن</a>
                  </Field>
                )}
              </>
            );
          }}
        </Field>
        <span className="input-group-text w_6rem justify-content-center">
          {label}
        </span>
      </div>
      <ErrorMessage name={name} component={FormikErorr} />
    </div>
  );
};

export default Select;
