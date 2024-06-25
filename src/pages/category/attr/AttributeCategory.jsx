import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import TableContainer from "../../../components/Tablecontainer";
import ActionAttribute from "./ActionAttribute";
import ShowInFilterAttrib from "./ShowInFilterAttrib";
import {
  deleteAttribute,
  getAttribute,
} from "../../../services/attributeCategory";
import { Form, Formik } from "formik";
import { initialValues, onSubmit, validationSchema } from "./coreAttr";
import FormikControl from "../../../components/FormikContainer/FormikControl";
import LoadingCom from "../../../components/LoadingCom";
import { Alert, confirm } from "../../../utils/switAlert";

const AttributeCategory = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [editAttr, setEditAttr] = useState(null);
  const [riInitialValues, setRiInitialValues] = useState(null);

  useEffect(() => {
    if (editAttr)
      setRiInitialValues({
        title: editAttr.title,
        unit: editAttr.unit,
        in_filter: editAttr.in_filter ? true : false,
      });
  }, [editAttr]);

  const handelDeleteAttr = async (rowData) => {
    if (
      await confirm(
        "warning",
        " حذف دسته",
        `ایامیخواهید دسته ${rowData.title} را حذف کنید ؟`
      )
    ) {
      const res = await deleteAttribute(rowData.id);
      if (res.status == 200) {
        Alert("success", res.data.message);
        setData(data.filter((d) => d.id !== rowData.id));
      } else {
      }
    }
  };

  const handelGetData = async () => {
    setLoading(true);
    try {
      const res = await getAttribute(location.state.categoryData.id);
      if (res.status == 200) {
        setData(res.data.data);
        setErrorMessage(res.data.message);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handelGetData();
  }, []);

  const dataInfo = [
    { title: "#", filed: "id" },
    { title: "عنوان", filed: "title" },
    { title: "واحد", filed: "unit" },
  ];

  const additionField = [
    {
      title: "نمایش در فیلتر",
      element: (rowData) => <ShowInFilterAttrib rowData={rowData} />,
    },
    {
      title: "عملیات",
      element: (rowData) => (
        <ActionAttribute
          rowData={rowData}
          handelDeleteAttr={handelDeleteAttr}
          editAttr={editAttr}
          setEditAttr={setEditAttr}
        />
      ),
    },
  ];
  return (
    <div className="background-dark">
      <div className="modal-header ">
        <h5 className="modal-title flex-fill" id="exampleModalLabel">
          افزودن ویژگی برای دسته
          <span className="text-primary">
            {" "}
            {location.state.categoryData.title}{" "}
          </span>
        </h5>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate(-1)}
        >
          انصراف
        </button>
      </div>
      <div className="modal-body">
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={riInitialValues || initialValues}
              onSubmit={(values, objectSub) =>
                onSubmit(
                  values,
                  objectSub,
                  location.state.categoryData.id,
                  setData,
                  editAttr,
                )
              }
              validationSchema={validationSchema}
              enableReinitialize
            >
              {(formik) => {
                return (
                  <Form>
                    <div
                      className={`row my-3 align-items-center justify-content-center  ${
                        editAttr ? "alert-danger edit-style" : ""
                      }`}
                    >
                      <FormikControl
                        control="input"
                        className="col-md-6 col-lg-3 mt-3"
                        name="title"
                        placeholder="عنوان ویژگی جدید"
                        label="نام"
                      />

                      <FormikControl
                        control="input"
                        className="col-md-6 col-lg-3 mt-3"
                        name="unit"
                        placeholder="واحد ویژگی جدید"
                        label="واحد"
                      />

                      <FormikControl
                        control="switch"
                        className="col-md-6 col-lg-3 my-1"
                        id="flexSwitchCheckDefault"
                        name="in_filter"
                        label="نمایش در فیلتر"
                      />

                      <div className="col-3 col-lg-1 d-flex justify-content-center align-items-start">
                        <button
                          className="btn btn-primary"
                          disabled={formik.isSubmitting}
                        >
                          {editAttr? "ویرایش" : "ذخیره"}
                          {formik.isSubmitting ? (
                            <LoadingCom
                              colorClass="text-white"
                              inline={true}
                              isSmall={true}
                            />
                          ) : (
                            ""
                          )}
                        </button>
                      </div>

                      <div className="col-3 col-lg-1 d-flex justify-content-center align-items-start">
                        {editAttr ? (
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={(e) => {
                              e.preventDefault()
                              setEditAttr(null)
                            }}
                          >
                            انصراف
                          </button>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <hr />
            <TableContainer
              data={data}
              dataInfo={dataInfo}
              additionField={additionField}
              loading={loading}
              // loadPag={loadPag}
              errorMessage={errorMessage}
            ></TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttributeCategory;
