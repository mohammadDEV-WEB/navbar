import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import FormikErorr from "./FormikErorr";
import { Link } from "react-router-dom";

const SearchMultipleSelect = ({
  className,
  formatItem,
  option,
  name,
  placeholder,
  label,
  colorSelect = false,
  initialItem,
  seeAdd
}) => {
  const [showSelect, setShowSelect] = useState(false);
  const [items, setItems] = useState(option);
  const [selectedItem, setSelectedItem] = useState([]);

  useEffect(() => {
    if (initialItem) setSelectedItem(initialItem);
    else setSelectedItem([])
  }, [initialItem]);

  useEffect(() => {
    if (option.length > 0) {
      setItems(option);
    }
  }, [option]);

  useEffect(() => {
    document
      .querySelector("body")
      .addEventListener("click", () => setShowSelect(false));
  }, []);

  const handelSetSelectItem = (categoryId, form) => {
    if (
      selectedItem.findIndex((d) => d.id == categoryId) == -1 &&
      categoryId > 0
    ) {
      const newData = [
        ...selectedItem,
        items.filter((d) => d.id == categoryId)[0],
      ];
      setSelectedItem((old) => {
        const allIds = newData.map((d) => d.id);
        const newDataTow = formatItem === "string" ? allIds.join("-") : allIds;
        form.setFieldValue(name, newDataTow);

        return newData;
      });
    } else {
      return null;
    }
  };

  const handelDeleteSelectItem = (e, categoryId, form) => {
    e.stopPropagation();
    setSelectedItem((old) => {
      const newData = old.filter((d) => d.id !== categoryId);

      const allIds = newData.map((d) => d.id);
      const newDataTow = formatItem === "string" ? allIds.join("-") : allIds;
      form.setFieldValue(name, newDataTow);

      return newData;
    });
  };

  const handelSearchItem = (e) => {
    setItems(option.filter((o) => o.value.includes(e)));
  };

  return (
    <Field>
      {({ form }) => {
        return (
          <div className={`parent-select col-12 ${className}`}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setShowSelect(!showSelect);
              }}
            >
              <div className="input-group mb-3 dir_ltr">
                <div className="row form-control d-flex justify-content-between align-content-center p-0 " name={name}>
                  <div className="col-9 col-md-6 col-lg-8 ">
                    {selectedItem.length > 0 ? (
                      selectedItem.map((c) => (
                        <Field key={c.id + "__" + c.value}>
                          {({ form }) => {
                            return (
                              <span
                                className="chips_elem my-3"
                                style={
                                  colorSelect
                                    ? { backgroundColor: `${c.code}` }
                                    : {}
                                }
                              >
                                <i
                                  className="fas fa-times text-danger"
                                  onClick={(e) =>
                                    handelDeleteSelectItem(e, c.id, form)
                                  }
                                ></i>
                                {colorSelect ? "" : c.value}
                              </span>
                            );
                          }}
                        </Field>
                      ))
                    ) : (
                      <span className="text-secondary">
                        دسته مورد نظر را انتخاب کنید...
                      </span>
                    )}
                  </div>
                  <div className="col-3 p-0 text-left">
                    {seeAdd ? (
                        <Link
                        className="btn btn-success"
                        to={`/products/add${seeAdd}`}
                      >
                        اضافه کردن
                      </Link>
                    ) : (
                      ""
                    )}
                    </div>
                </div>

                <span className="input-group-text w_6rem justify-content-center">
                  {label}
                </span>
              </div>
              <ErrorMessage name={name} component={FormikErorr} />
            </div>
            <div onClick={e=>e.stopPropagation()} class={`dropDown ${showSelect ? "" : "d-none"}`}>
              <input
                type="text"
                className="inputSearchSelect"
                placeholder={placeholder}
                onChange={(e) => handelSearchItem(e.target.value)}
              />
              <hr className="m-0" />
              <ul className="py-2 px-3">
                {items.map((i) => (
                  <li key={i.id}>
                    <a
                      className="btnToSelect"
                      onClick={() => handelSetSelectItem(i.id, form)}
                    >
                      {i.value}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="text-left">
                <button
                  className="btn btn-secondary m-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSelect(false);
                  }}
                >
                  بستن
                </button>
              </div>
            </div>
          </div>
        );
      }}
    </Field>
  );
};

export default SearchMultipleSelect;
