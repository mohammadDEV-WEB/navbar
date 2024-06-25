import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AuthComponentInput from "../../components/auth/AuthComponentInput";
import axios from "axios";
import { useNavigate } from "react-router";
import { Alert } from "../../utils/switAlert";
import HttpServices from "../../services/httpServices";
import { login } from "../../services/auth";
import LoadingCom from "../../components/LoadingCom";

const initialValues = {
  phone: "",
  password: "",
  remember: false,
};

const onSubmit = async(values, navigate, submitting) => {
  try {
    let res = await login(values);
    if (res.status == 200) {
      localStorage.setItem("token", JSON.stringify(res.data.token));
      navigate("/");
      Alert("success", "موفق شدید");
    } else {
    }
    submitting.setSubmitting(false);
  } catch (error) {
   submitting.setSubmitting(false);
  }
};

const validationSchema = Yup.object({
  phone: Yup.number().required("تکست را پر کنید"),
  password: Yup.number().required("تکست را پر کنید"),
  remember: Yup.boolean(),
});

const Login = () => {
  const navigate = useNavigate();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, submitting) => onSubmit(values, navigate, submitting)}
      validationSchema={validationSchema}
    >
      {(formik) => {
        return (
          <div className="wrap-login100">
            <Form className="login100-form validate-form pos-relative d-flex flex-column align-items-center justify-content-center">
              <span className="login100-form-title">ورود/ثبت نام اعضا</span>

              <AuthComponentInput
                formik={formik}
                control="input"
                type="text"
                name="phone"
                icon="fa fa-mobile"
                label="شماره"
              />
              <AuthComponentInput
                formik={formik}
                control="input"
                type="text"
                name="password"
                icon="fa fa-key"
                label="پسورد"
              />

              <AuthComponentInput
                formik={formik}
                control="switch"
                name="remember"
                label="مرا بخواطر بسپار"
              />

              <div className="container-login100-form-btn">
                <button
                  type="submit"
                  className={`login100-form-btn ${
                    formik.isSubmitting ? "active" : null
                  }`}
                >
                  {formik.isSubmitting ?<LoadingCom colorClass={"text-white"} inline={true} isSmall={true}/> : "ورود"}
                </button>
              </div>
            </Form>
            <div className="login100-pic js-tilt" data-tilt>
              <img src="/auth/images/img-01.png" alt="IMG" />
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default Login;
