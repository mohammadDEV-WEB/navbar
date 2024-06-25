import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import FormikErorr from "./FormikErorr";
import LoadingCom from "../LoadingCom";

const MultipleSelect = ({
  className,
  option,
  name,
  label,
  option_one,
  initialItem,
  formik,
}) => {
  const [cardOfCategory, setCardOfCategory] = useState([]);
  useEffect(() => {
    if (initialItem) {
      setCardOfCategory([]);
      formik.setFieldValue(name, "")
    }
  }, [option]);

  useEffect(() => {
    if (initialItem) setCardOfCategory(initialItem);
  }, [initialItem]);

  const handelSetCardCategory = (categoryId, form) => {
    setCardOfCategory((old) => {
      if (old.findIndex((d) => d.id == categoryId) == -1 && categoryId > 0) {
        const newData = [...old, option.filter((d) => d.id == categoryId)[0]];

        const allIds = newData.map((d) => d.id);
        form.setFieldValue(name, allIds.join("-"));

        return newData;
      } else {
        return old;
      }
    });
  };

  const handelDeleteCardCategory = (categoryId, form) => {
    setCardOfCategory((old) => {
      const newData = old.filter((d) => d.id !== categoryId);

      const allIds = newData.map((d) => d.id);
      form.setFieldValue("category_ids", allIds.join("-"));

      return newData;
    });
  };

  return (
    <>
      <div className={`col-12 ${className}`}>
        <div className="input-group mb-3 dir_ltr">
          <Field>
            {({ form }) => {
              return (
                <Field
                  as="select"
                  type="text"
                  className="form-control"
                  name={name}
                  onChange={(e) => handelSetCardCategory(e.target.value, form)}
                >
                  {option == "await" ? (
                   <LoadingCom
                   colorClass={"text-primary"}
                   inline={true}
                   isSmall={true}
                 />
                  ) :option===null?(
                    <option value="0">دسته والد را انتخاب کنید!!! </option>
                  ):(
                    <>
                     <option value="0">{option_one}</option>
                      {option.map((o) => (
                        <option
                          key={o.id + "__" + o.value}
                          value={o.id}
                        >{`اسم :${o.value} / ایدی :${o.id} `}</option>
                      ))}
                    </>
                  )}
                </Field>
              );
            }}
          </Field>
          <span className="input-group-text w_6rem justify-content-center">
            {label}
          </span>
        </div>
      </div>

      <div className="col-12 col-md-6 col-lg-8">
        {cardOfCategory.length > 0
          ? cardOfCategory.map((c) => (
              <Field key={c.id + "__" + c.value}>
                {({ form }) => {
                  return (
                    <span className="chips_elem">
                      <i
                        className="fas fa-times text-danger"
                        onClick={() => handelDeleteCardCategory(c.id, form)}
                      ></i>
                      {c.value}
                    </span>
                  );
                }}
              </Field>
            ))
          : ""}
        {cardOfCategory.length>0?"":<ErrorMessage name={name} component={FormikErorr} />}
      </div>
    </>
  );
};

export default MultipleSelect;
