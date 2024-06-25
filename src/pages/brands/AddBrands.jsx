import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { Form, Formik } from "formik";
import FormikControl from "../../components/FormikContainer/FormikControl";
import { initialValues, onSubmit, validationSchema } from "./core";
import LoadingCom from "../../components/LoadingCom";
import { apiPath } from "../../services/httpServices";
import SubmitBtn from "../../components/submitBtn/SubmitBtn";

const AddBrands = ({setData ,setBrandToEdit ,brandToEdit}) => {
  const [reInitialValues,setReInitialValues]=useState()

  useEffect(() => {
    if (brandToEdit) setReInitialValues({
      original_name:brandToEdit.original_name,
      persian_name:brandToEdit.original_name,
      descriptions:brandToEdit.descriptions,
      logo:undefined,
    })
  }, [brandToEdit]);
  return (
    <>
      <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
        <button
          className="btn btn-success d-flex justify-content-center align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#add_brand_modal"
          onClick={()=>setBrandToEdit(null)}
        >
          <i className="fas fa-plus text-light"></i>
        </button>
      </div>
      <ModalContainer
        fulScreen={false}
        id="add_brand_modal"
        title={brandToEdit?"ویرایش برند :":"افزودن برند"}
        edit={brandToEdit? brandToEdit.original_name :null}
      >
        <div className="container">
          <div className="row justify-content-center">
            <Formik
              initialValues={reInitialValues||initialValues}
              onSubmit={(value, objectSub) => onSubmit(value, objectSub,setData,brandToEdit)}
              validationSchema={validationSchema}
              enableReinitialize
            >
              {(formik) => {
                return (
                  <Form>
                    <FormikControl
                      control="input"
                      placeholder="کیبرد را در حالت لاتین قرار دهید"
                      label="عنوان لاتیتن"
                      name="original_name"
                    />

                    <FormikControl
                      control="input"
                      placeholder="کیبرد را در حالت فارسی قرار دهید"
                      label="عنوان فارسی"
                      name="persian_name"
                    />

                    <FormikControl
                      control="textarea"
                      placeholder="متن کوتاه در مورد برند"
                      label="توضیحات"
                      name="descriptions"
                    />
                     {brandToEdit?<img style={{marginRight:"50%"}} src={`${apiPath}/${brandToEdit.logo}`} width={60}/>:""}

                    <FormikControl
                      control="file"
                      placeholder="تصویر"
                      label="تصویر"
                      name="logo"
                    />
                    <div className="btn_box text-center col-12 col-md-6 col-lg-12 mt-4">
                      <SubmitBtn title={brandToEdit? "ویرایش" : "ذخیره"} isSubmitting={formik.isSubmitting}/>
                      {/* <button
                        className="btn btn-primary"
                        disabled={formik.isSubmitting}
                      >
                        ذخیره
                        {formik.isSubmitting ? (
                          <LoadingCom
                            colorClass="text-white"
                            inline={true}
                            isSmall={true}
                          />
                        ) : (
                          ""
                        )}
                      </button> */}
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </ModalContainer>
    </>
  );
};

export default AddBrands;
