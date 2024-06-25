import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import StyleOnClick, { addClassToActive } from "../utils/styleOnClick";
import LoadingCom from "./LoadingCom";
import { useParams } from "react-router";

const PaginateTable = ({
  children,
  tableData,
  dataInfo,
  loading,
  firstPag,
  errorMessage,
  searchElement,
  pageCount,
  currentPag,
  setCurrentPage,
  handelSearch,
  handelGetData,
}) => {
  const [pages, setPages] = useState([]);
  const [listOfData, setListOfData] = useState(1);

  let pageRang = 2;

  const params = useParams();

  useEffect(() => {
    if (firstPag) setCurrentPage(1);
  }, [firstPag]);

  useEffect(() => {
    let Arr = [];
    for (let i = 1; i <= pageCount; i++) {
      Arr.push(i);
    }
    setPages(Arr);
  }, [pageCount]);

  let timeout;
  const handelSetSearch = (char) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      handelSearch(char);
    }, 2000);
  };

  return (
    <>
      {params.attributeId ? (
        ""
      ) : (
        <div className="row justify-content-between">
          <div className="col-10 col-md-6 col-lg-4">
            <div className="input-group mb-3 dir_ltr">
              <input
                type="text"
                className="form-control"
                placeholder={searchElement.placeholder}
                onChange={(e) => handelSetSearch(e.target.value)}
              />
              <span className="input-group-text">{searchElement.title}</span>
            </div>
          </div>{" "}
          <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
            {children}
          </div>
        </div>
      )}
      {loading ? (
        <LoadingCom colorClass="text-primary" isSmall={false} />
      ) : tableData.length ? (
        <>
          <table className="table table-responsive  text-center table-hover table-bordered">
            <thead className="thead">
              <tr>
                {dataInfo.map((i) => (
                  <th className="th" key={i.filed + "__" + i.title}>
                    {i.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="tbody">
              {tableData.map((d) => (
                <tr key={d.id}>
                  {dataInfo.map((i, index) =>
                    i.filed ? (
                      <td key={i.filed + "_" + d.id}>{d[i.filed]}</td>
                    ) : (
                      <td key={i.title + "-2" + index}>{i.element(d)}</td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {params.attributeId ? (
            ""
          ) : (
            <nav
              aria-label="Page navigation example"
              className="d-flex justify-content-center"
            >
              <ul className="pagination dir_ltr">
                <li className="page-item">
                  <a
                    className={`page-link ${currentPag == 1 ? "disabled" : ""}`}
                    aria-label="Previous"
                    onClick={(e) => {
                      setCurrentPage(currentPag - 1);
                    }}
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>

                {currentPag > 3 ? (
                  <li className="page-item">
                    <a
                      className="page-link "
                      aria-label="Previous"
                      onClick={(e) => {
                        setCurrentPage(1);
                      }}
                    >
                      <span>...</span>
                      <span aria-hidden="true">1</span>
                    </a>
                  </li>
                ) : (
                  ""
                )}

                {pages.map((p, index) => {
                  return p < currentPag + pageRang &&
                    p > currentPag - pageRang ? (
                    <li key={Math.random()} className="page-item">
                      <a
                        className="page-link"
                        onClick={(e) => {
                          setCurrentPage(p);
                        }}
                      >
                        {p}
                      </a>
                    </li>
                  ) : null;
                })}

                {currentPag < pageCount - 1 ? (
                  <li className="page-item">
                    <a
                      className="page-link "
                      aria-label="Previous"
                      onClick={(e) => {
                        setCurrentPage(pageCount);
                      }}
                    >
                      <span aria-hidden="true">{pageCount}</span>
                      <span>...</span>
                    </a>
                  </li>
                ) : (
                  ""
                )}

                <li className="page-item">
                  <a
                    className={`page-link
                          ${currentPag == pageCount ? "disabled" : ""}`}
                    aria-label="Next"
                    onClick={(e) => {
                      setCurrentPage(currentPag + 1);
                    }}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          )}
          <div className="input-group mb-3 dir_ltr">
            <select
              className="form-control select-page"
              onChange={(e) => {
                const options = [...e.target.selectedOptions];
                const values = options.map((option) => option.value);
                handelGetData(1, values, "");
                setListOfData(values);
              }}
              defaultChecked={"1"}
              value={listOfData}
            >
              <option value={tableData.length} key="all">
                همه
              </option>
              <option value="1" key="1">
                1
              </option>
              <option value="2" key="2">
                2
              </option>
              <option value="3" key="3">
                3
              </option>
              <option value="4" key="4">
                4
              </option>
              <option value="5" key="5">
                5
              </option>
              <option value="6" key="6">
                6
              </option>
              <option value="7" key="7">
                7
              </option>
              <option value="8" key="8">
                8
              </option>
              <option value="9" key="9">
                9
              </option>
            </select>
            <span className="input-group-text span-page">
              دوست دارید چند ایتم در جدول بالا نمایش داده شود
            </span>
          </div>
        </>
      ) : (
        <h3 className="text-center text-danger">{errorMessage}</h3>
      )}
    </>
  );
};

export default PaginateTable;
