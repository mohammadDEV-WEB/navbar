import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { Form, Formik } from "formik";
import FormikControl from "../../components/FormikContainer/FormikControl";
import { initialValues, onSubmit, validationSchema } from "./core";
import SubmitBtn from "../../components/submitBtn/SubmitBtn";

const AddGrantees = ({ guaranteesToEdit, setData }) => {
  const [reInitialValues, setReInitialValues] = useState(null);

  useEffect(() => {
    if (guaranteesToEdit)
      setReInitialValues({
        title: guaranteesToEdit.title,
        descriptions: guaranteesToEdit.descriptions,
        length: guaranteesToEdit.length,
        length_unit: guaranteesToEdit.length_unit,
      });
  }, [guaranteesToEdit]);
  return (
    <>
      <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
        <button
          className="btn btn-success d-flex justify-content-center align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#add_guarantee_modal"
          onClick={() => setReInitialValues(null)}
        >
          <i className="fas fa-plus text-light"></i>
        </button>
      </div>
      <ModalContainer
        fulScreen={false}
        id="add_guarantee_modal"
        title={guaranteesToEdit ? "ویرایش گارانتی :" : "افزودن گارانتی"}
        edit={guaranteesToEdit ? guaranteesToEdit.title : null}
      >
        <div className="container">
          <Formik
            initialValues={reInitialValues || initialValues}
            onSubmit={(value, objectSub) =>
              onSubmit(value, objectSub, setData, guaranteesToEdit)
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
                      label="عنوان گارانتی"
                    />
                    <FormikControl
                      control="textarea"
                      name="descriptions"
                      label="توضیحات گارانتی"
                    />

                    <FormikControl
                      control="input"
                      type="number"
                      name="length"
                      placeholder=" به ماه"
                      label="مدت گارانتی"
                    />

                    <FormikControl
                      control="input"
                      name="length_unit"
                      placeholder="فقط حروف"
                      label="واحد"
                    />

                    <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                      <SubmitBtn title={guaranteesToEdit? "ویرایش":"ذخیره"} isSubmitting={formik.isSubmitting} />
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

export default AddGrantees;
