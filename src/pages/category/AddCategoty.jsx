import React, { useContext, useEffect, useRef, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { Form, Formik } from "formik";
import FormikControl from "../../components/FormikContainer/FormikControl";
import {  getCategory } from "../../services/category";
import { Alert } from "../../utils/switAlert";
import LoadingCom from "../../components/LoadingCom";
import { useParams } from "react-router";
import { initialValues, onSubmit, validationSchema } from "./core";
import { categoryContext } from "../../contexts/categoryContext";
import SubmitBtn from "../../components/submitBtn/SubmitBtn";


const AddCategory = ({setRerendering}) => {
  const [parent_id, setParent_id] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);
  const [editId_id, setEditId_id] = useState("");
  const params = useParams();
  const { editId, setEditId } = useContext(categoryContext);

  const handelGetParentId = async () => {
    try {
      const res = await getCategory();
      if (res.status == 200) {
        const allData = res.data.data;
        setParent_id(
          allData.map((p) => {
            return { id: p.id, value: p.title };
          })
        );
      } else {
      }
    } catch (error) {}
  };

  useEffect(() => {
    handelGetParentId();
  }, []);

  useEffect(() => {
    if (editId) {
      setReInitialValues({
        parent_id: editId.parent_id ? editId.parent_id : "",
        title: editId.title,
        descriptions: editId.descriptions ? editId.descriptions : "",
        image: undefined,
        is_active: editId.is_active ? true : false,
        show_in_menu: editId.show_in_menu ? true : false,
      });
      setEditId_id(editId.id);
    } else if (params.categoryId) {
      setReInitialValues({
        ...initialValues,
        parent_id: params.categoryId,
      });
    } else {
      setReInitialValues(null);
    }
  }, [params.categoryId, editId]);

  return (
    <>
      <button
        className="btn btn-success d-flex justify-content-center align-items-center"
        data-bs-toggle="modal"
        data-bs-target="#add_product_category_modal"
        onClick={() => setEditId(null)}
      >
        <i className="fas fa-plus text-light"></i>
      </button>
      <ModalContainer
        fulScreen={true}
        id="add_product_category_modal"
        title={editId?"ویرایش دسته محصولات:":"افزودن دسته محصولات"}
        edit={editId? editId.title :null}
      >
        <Formik
          initialValues={reInitialValues || initialValues}
          onSubmit={(value, objectSub) =>
            onSubmit(value, objectSub, editId_id,setRerendering)
          }
          validationSchema={validationSchema}
          validateOnMount={true}
          validateOnBlur={true}
          validateOnChange={false}
          enableReinitialize
        >
          {(formik) => {
            return (
              <div className="container">
                <Form className="row justify-content-center">
                  {parent_id.length > 0 ? (
                    <FormikControl
                      control="select"
                      className="col-md-6 col-lg-8"
                      option={parent_id}
                      name="parent_id"
                      label="دسته والد"
                    />
                  ) : (
                    ""
                  )}

                  <FormikControl
                    control="input"
                    className="col-md-6 col-lg-8"
                    name="title"
                    placeholder="عنوان دسته"
                    label="عنوان"
                  />

                  <FormikControl
                    control="textarea"
                    className="col-md-6 col-lg-8"
                    name="descriptions"
                    placeholder="توضیحات"
                    label="توضیحات"
                  />

                  {editId ? null : (
                    <FormikControl
                      control="file"
                      className="col-md-6 col-lg-8"
                      name="image"
                      placeholder="تصویر"
                      label="تصویر"
                    />
                  )}

                  <FormikControl
                    control="switch"
                    className="col-6 col-md-6 col-lg-6 row justify-content-center mt-3"
                    name="is_active"
                    id="flexSwitchCheckDefault"
                    label="وضعیت فعال"
                  />

                  <FormikControl
                    control="switch"
                    className="col-6 col-md-6 col-lg-6 row justify-content-center mt-3"
                    name="show_in_menu"
                    id="switch-show-in-menu"
                    label="نمایش در منو"
                  />
                  <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                    <SubmitBtn title={editId? "ویرایش" : "ذخیره"} isSubmitting={formik.isSubmitting?true:false}/>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </ModalContainer>
    </>
  );
};

export default AddCategory;
