import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { getAttribute } from "../../services/attributeCategory";
import LoadingCom from "../../components/LoadingCom";

const AttributeProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [mainAttribute, setMainAttribute] = useState(null);

  const handelSetMainAttr = async () => {
    let dataArr = [];
    Promise.all(
      location.state.productAttr.categories.map(async (m) => {
        if (dataArr.findIndex((d) => d.parentId == m.id) == -1) {
          const res = await getAttribute(m.id);
          if (res.status == 200) {
            dataArr = [
              ...dataArr,
              { parentTitle: m.title, parentId: m.id, data: res.data.data },
            ];
          }
        } else {
          return null;
        }
      })
    ).then(() => {
      setMainAttribute(dataArr);
    });
  };

  useEffect(() => {
    handelSetMainAttr();
  }, []);

  return (
    <>
      <div className="background-dark">
        <div className="modal-header ">
          <h5 className="modal-title flex-fill" id="exampleModalLabel">
            افزودن ویژگی برای دسته
            <span className="text-primary">
              {" "}
              {location.state?.productAttr.title}{" "}
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
        <div className="container">
          <Formik>
            <Form>
              {mainAttribute ? (
                <>
                  {mainAttribute.map((m) => (
                    <div
                      className="row justify-content-center"
                      key={m.parentTitle}
                    >
                      <h5 className="text-center">
                        ویژگی ها یه:{" "}
                        <span className="text-bolder text-danger">
                          {m.parentTitle}
                        </span>
                      </h5>
                      {m.data.length!==0?m.data.map((d) => (
                        <div className="col-12 col-md-6 col-lg-8" key={d.id}>
                          <div className="input-group my-3 dir_ltr">
                            <span className="input-group-text w_6rem justify-content-center">
                              {d.unit}
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                            />
                            <span className="input-group-text w_8rem justify-content-center">
                              {d.title}
                            </span>
                          </div>
                        </div>
                      )):<span>{m.data.message}</span>}
                    </div>
                  ))}
                  <div className="btn_box text-center m-4">
                    <button className="btn btn-primary ">ذخیره</button>
                  </div>
                </>
              ) : (
                <LoadingCom
                  colorClass={"text-primary"}
                  isSmall={false}
                  inline={false}
                />
              )}
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};

export default AttributeProduct;
