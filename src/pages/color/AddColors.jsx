import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { FastField, Form, Formik } from "formik";
import { initialValues, onSubmit, validationSchema } from "./core";
import FormikControl from "../../components/FormikContainer/FormikControl";
import SubmitBtn from "../../components/submitBtn/SubmitBtn";
import LoadingCom from "../../components/LoadingCom";

const AddColors = ({ setData, colorsToEdit, setColorsToEdit }) => {
  const [reInitialValues,setReInitialValues]=useState(null)

  useEffect(()=>{
    if(colorsToEdit)setReInitialValues({
      title:colorsToEdit.title,
      code:colorsToEdit.code,
    })
  },[colorsToEdit])

  const handelSetColor = (e, form) => {
    form.setFieldValue("code", e.target.value);
  };
  return (
    <>
      <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
        <button
          className="btn btn-success d-flex justify-content-center align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#add_color_modal"
          onClick={() => setColorsToEdit(null)}
        >
          <i className="fas fa-plus text-light"></i>
        </button>
      </div>
      <ModalContainer fulScreen={false} id="add_color_modal" title="افزودن رنگ">
        <div className="container">
          <Formik
            initialValues={reInitialValues||initialValues}
            onSubmit={(value, objectSub) =>
              onSubmit(value, objectSub, setData, colorsToEdit)
            }
            validationSchema={validationSchema}
            enableReinitialize
          >
            {(formik) => {
              return (
                <Form>
                  <div className="row justify-content-center">
                    <FormikControl
                      control="input"
                      name="title"
                      label="نام رنگ"
                    />

                    <div className="col-12">
                      <label htmlFor="exampleColorInput" className="form-label">
                        انتخاب رنگ
                      </label>
                      <input
                        type="color"
                        className="form-control form-control-color"
                        id="exampleColorInput"
                        title="Choose your color"
                        onChange={(e) => handelSetColor(e, formik)}
                      />
                    </div>
                    <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                    <SubmitBtn title={colorsToEdit? "ویرایش" : "ذخیره"} isSubmitting={formik.isSubmitting} />
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </ModalContainer>
    </>
  );
};

export default AddColors;
