import { FastField } from "formik";
import React from "react";
import { Link } from "react-router-dom";

const SearchOneSelect = ({
  className,
  option,
  name,
  label,
  placeholder,
  idList,
  seeAdd,
}) => {
  return (
    <>
      <div className={`col-12 ${className}`}>
        <div className="input-group mb-2 dir_ltr">
          {seeAdd ? (
            <Link class="btn btn-success" to={`/products/add${seeAdd}`}>
              اضافه کردن
            </Link>
          ) : (
            ""
          )}
          <FastField
            type="text"
            className="form-control"
            placeholder={placeholder}
            list={idList}
            name={name}
          />
          <datalist id={idList}>
            {option.map((o) => (
              <option value={o.value} key={o.id + "__" + o.value}>
                {o.value}
              </option>
            ))}
          </datalist>
          <span className="input-group-text w_6rem justify-content-center">
            {label}
          </span>
        </div>
      </div>
    </>
  );
};

export default SearchOneSelect;
