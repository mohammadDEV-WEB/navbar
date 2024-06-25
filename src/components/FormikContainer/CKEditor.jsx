import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { ErrorMessage, FastField } from "formik";
import FormikErorr from "./FormikErorr";

const CkEditor = ({ className, name, label, placeholder }) => {
  return (
    <FastField>
      {({form}) => {
        return (
          <div className={`col-12 ${className}`}>
            <CKEditor
              editor={ClassicEditor}
              data={form.values[name]||`<p>${label}:${placeholder}</p>`}
              onReady={(editor) =>{}}
              onChange={(event, editor) => {
                const data = editor.getData();
                form.setFieldValue(name,data)
                (data);
              }}
              onBlur={(event, editor) => {
                form.setFieldTouched(name)
              }}
              onFocus={(event, editor) =>
                editor.getData() === `<p>${label}:${placeholder}</p>`
                  ? editor.setData("")
                  : null
              }
            />
            <div className="mt-3">
              <ErrorMessage name={name} component={FormikErorr} />
            </div>
          </div>
        );
      }}
    </FastField>
  );
};

export default CkEditor;

{
  /* <div className={`col-12 ${className}`}>
<div className="input-group mb-3 dir_ltr">
  <FastField
    component="textarea"
    className="form-control"
    name={name}
    placeholder={placeholder}
    rows="5"
  ></FastField>
  <span className="input-group-text w_6rem justify-content-center">
    {label}
  </span>
</div>
<ErrorMessage name={name} component={FormikErorr} />

</div> */
}
