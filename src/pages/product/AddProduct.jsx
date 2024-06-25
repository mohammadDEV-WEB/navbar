import React, { useEffect, useState } from "react";
import ModalContainer from "../../components/ModalContainer";
import { Form, Formik } from "formik";
import FormikControl from "../../components/FormikContainer/FormikControl";
import { getCategory } from "../../services/category";
import LoadingCom from "../../components/LoadingCom";
import SubmitBtn from "../../components/submitBtn/SubmitBtn";
import PrevBtn from "../../components/prevBtn/PrevBtn";
import { getBrands } from "../../services/brands";
import { getColors } from "../../services/colors";
import { getGuarantees } from "../../services/garantys";
import { initialValues, onSubmit, validationSchema } from "./core";

const AddProduct = ({ setReRendering, productToEdit, setProductToEdit }) => {
  const [selectOneOption, setSelectOneOption] = useState([]);
  const [selectTowOption, setSelectTowOption] = useState([]);
  const [getBrand, setGetBrand] = useState([]);
  const [getColor, setGetColor] = useState([]);
  const [getGuarantee, setGetGuarantee] = useState([]);
  const [reInitialValues, setReInitialValues] = useState(null);

  const [initialCategories, setInitialCategories] = useState(null);
  const [initialColors, setInitialColors] = useState(null);
  const [initialGuarantees, setInitialGuarantees] = useState(null);
  const [initialDescription, setInitialDescription] = useState("");

  const handelGetSelectOne = async () => {
    const res = await getCategory();
    if (res.status == 200) {
      const data = res.data.data;
      setSelectOneOption(
        data.map((d) => {
          return { id: d.id, value: d.title };
        })
      );
    }
  };

  const handelGetSelectTow = async (categoryId) => {
    setSelectTowOption("await");
    if (categoryId > 0) {
      const res = await getCategory(categoryId);
      if (res.status == 200) {
        const data = res.data.data;
        setSelectTowOption(
          data.map((d) => {
            return { id: d.id, value: d.title };
          })
        );
      }
    } else {
      setSelectTowOption(null);
    }
  };

  const handelGetBrands = async () => {
    const res = await getBrands();
    if (res.status == 200) {
      const data = res.data.data;
      setGetBrand(
        data.map((d) => {
          return { id: d.id, value: d.original_name };
        })
      );
    }
  };

  const handelGetColors = async () => {
    const res = await getColors();
    if (res.status == 200) {
      const data = res.data.data;
      setGetColor(
        data.map((d) => {
          return { id: d.id, value: d.title, code: d.code };
        })
      );
    }
  };

  const handelGetGuarantees = async () => {
    const res = await getGuarantees();
    if (res.status == 200) {
      const data = res.data.data;
      setGetGuarantee(
        data.map((d) => {
          return { id: d.id, value: d.title };
        })
      );
    }
  };

  const handelSetInitialItems = () => {
    if (productToEdit) {
      setInitialCategories(
        productToEdit.categories.map((c) => {
          return { id: c.id, value: c.title };
        })
      );
      setInitialColors(
        productToEdit.colors.map((c) => {
          return { id: c.id, value: c.title, code: c.code };
        })
      );
      setInitialGuarantees(
        productToEdit.guarantees.map((g) => {
          return { id: g.id, value: g.title };
        })
      );
    }
  }
  useEffect(() => {
    handelGetSelectOne();
    handelGetBrands();
    handelGetColors();
    handelGetGuarantees();
  }, []);

  useEffect(() => {
    if (productToEdit!==null) {
      for (const key in productToEdit) {
        if (productToEdit[key] === null) productToEdit[key] = "";
      }
      setReInitialValues({
        ...productToEdit,
        category_ids: productToEdit.categories.map((d) => d.id).join("-"),
        color_ids: productToEdit.colors.map((d) => d.id).join("-"),
        guarantee_ids: productToEdit.guarantees.map((d) => d.id).join("-"),
      });
      handelSetInitialItems();
    }else{
      setReInitialValues(null)
    }
  }, [productToEdit]);
  return (
    <>
      <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
        <button
          className="btn btn-success d-flex justify-content-center align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#add_product_modal"
          onClick={() => setProductToEdit(null)}
        >
          <i className="fas fa-plus text-light"></i>
        </button>
      </div>
      <ModalContainer
        fulScreen={true}
        id="add_product_modal"
        title={productToEdit ? "ویرایش محصول :" : "افزودن محصول جدید"}
        edit={productToEdit ? productToEdit.title : ""}
      >
        <div className="container">
          <Formik
            initialValues={reInitialValues || initialValues}
            validationSchema={validationSchema}
            onSubmit={(value, objectSub) =>
              onSubmit(value, objectSub, setReRendering, productToEdit)
            }
            enableReinitialize
          >
            {(formik) => {
              return (
                <Form>
                  <div className="row justify-content-center">
                    <FormikControl
                      control="select"
                      className="col-md-6 col-lg-8"
                      option={selectOneOption}
                      name="selectOne"
                      label="دسته والد"
                      option_one="دسته مورد نظر را انتخاب کنید..."
                      functionChang={handelGetSelectTow}
                    />

                    {productToEdit !== null ? (
                      <FormikControl
                        control="multipleSelect"
                        className="col-md-6 col-lg-8"
                        option={selectTowOption}
                        name="category_ids"
                        label="دسته اصلی"
                        option_one="دسته مورد نظر را انتخاب کنید..."
                        initialItem={initialCategories}
                        formik={formik}
                      />
                    ) : (
                      <>
                        {selectTowOption.length === 0 ? (
                          ""
                        ) : selectTowOption === "await" ? (
                          <LoadingCom
                            colorClass={"text-primary"}
                            inline={true}
                            isSmall={true}
                          />
                        ) : (
                          <FormikControl
                            control="multipleSelect"
                            className="col-md-6 col-lg-8"
                            option={selectTowOption}
                            name="category_ids"
                            label="دسته اصلی"
                            option_one="دسته مورد نظر را انتخاب کنید..."
                          />
                        )}
                      </>
                    )}

                    <FormikControl
                      control="input"
                      className="col-md-6 col-lg-8"
                      name="title"
                      label="عنوان"
                      placeholder="عنوان محصول"
                    />

                    <FormikControl
                      control="input"
                      className="col-md-6 col-lg-8"
                      type="number"
                      name="price"
                      label="قیمت"
                      placeholder="قیمت محصول"
                    />

                    <FormikControl
                      control="input"
                      className="col-md-6 col-lg-8"
                      type="number"
                      name="weight"
                      label="وزن"
                      placeholder="وزن محصول (کیلوگرم)"
                    />

                    <FormikControl
                      control="searchMultipleSelect"
                      className="col-md-6 col-lg-8"
                      option={getColor}
                      name="color_ids"
                      formatItem="string"
                      label="رنگ"
                      placeholder="قسمتی از نام رنگ را جستجو کنید..."
                      colorSelect={true}
                      initialItem={productToEdit?initialColors:null}
                      seeAdd="Color"
                    />

                    <FormikControl
                      control="searchOneSelect"
                      className="col-md-6 col-lg-8"
                      option={getBrand}
                      name="brand_id"
                      formatItem="string"
                      label="برند"
                      placeholder="برند خود را انتخاب کنید..."
                      idList="brandListId"
                      option_one="برند خود را انتخاب کنید..."
                      seeAdd="Brand"
                    />

                    <FormikControl
                      control="searchMultipleSelect"
                      className="col-md-6 col-lg-8"
                      option={getGuarantee}
                      name="guarantee_ids"
                      formatItem="string"
                      label="گارانتی"
                      placeholder="قسمتی از نام گارانتی را وارد کنید..."
                      initialItem={productToEdit?initialGuarantees:null}
                      seeAdd="Guaranty"
                    />

                    <FormikControl
                      control="CKEditor"
                      className="col-md-6 col-lg-8"
                      name="descriptions"
                      label="توضیحات"
                      placeholder="فقط از حروف و اعداد استفاده کنید..."
                    />
                    <FormikControl
                      control="textarea"
                      className="col-md-6 col-lg-8"
                      name="short_descriptions"
                      label="توضیحات کوباه"
                      placeholder="فقط از حروف و اعداد استفاده کنید..."
                    />
                    <FormikControl
                      control="textarea"
                      className="col-md-6 col-lg-8"
                      name="cart_descriptions"
                      label="توضیحات سبد"
                      placeholder="فقط از حروف و اعداد استفاده کنید..."
                    />

                    {productToEdit ? (
                      ""
                    ) : (
                      <FormikControl
                        control="file"
                        className="col-md-6 col-lg-8"
                        name="image"
                        label="تصویر"
                        placeholder="برای انتخاب تصویر کلیک کنید..."
                      />
                    )}

                    <FormikControl
                      control="input"
                      className="col-md-6 col-lg-8"
                      name="alt_image"
                      label="توضیح تصویر"
                      placeholder="یک کلمه در مورد تصویر"
                    />

                    <FormikControl
                      control="input"
                      className="col-md-6 col-lg-8"
                      name="keywords"
                      label="کلمات کلیدی"
                      placeholder="مثال: تست1-تست2-تست3"
                    />

                    <FormikControl
                      control="input"
                      className="col-md-6 col-lg-8"
                      name="stock"
                      type="number"
                      label="موجودی"
                      placeholder="فقط از اعداد استفاده کنید(عدد)"
                    />

                    <FormikControl
                      control="input"
                      className="col-md-6 col-lg-8"
                      name="discount"
                      type="number"
                      label="درصد تخفیف"
                      placeholder="فقط از اعداد استفاده کنید(عدد)"
                    />
                    <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                      <SubmitBtn
                        title={productToEdit ? "ویرایش" : "ذخیره"}
                        isSubmitting={formik.isSubmitting}
                      />
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

export default AddProduct
