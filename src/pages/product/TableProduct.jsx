import React, { useEffect, useState } from "react";
import TableContainer from "../../components/Tablecontainer";
import AddProduct from "./AddProduct";
import { Alert, confirm } from "../../utils/switAlert";
import { getProduct } from "../../services/products";
import Action from "./tableAditions/Action";
import PaginateTable from "../../components/PaginateTable";

const TableProduct = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [productToEdit, setProductToEdit] = useState(null);
  const [searchChar, setSearchChar] = useState("");
  const [currentPag, setCurrentPage] = useState(1);
  const [countOfPage, setCountOfPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [reRendering,setReRendering]=useState(0)

  const dataInfo = [
    { title: "#", filed: "id" },
    {
      filed: null,
      title: "گروه محصول ",
      element: (rowData) =>rowData.categories[0]?.title
    },
    { title: "عنوان", filed: "title" },
    {
      filed: null,
      title: "توضیحات",
      element: (rowData) =><span dangerouslySetInnerHTML={{__html:rowData.descriptions}}></span>
    },
    { title: "قیمت", filed: "price" },
    { title: "موجودیت", filed: "stock" },
    {
      filed: null,
      title: "عملیات",
      element: (rowData) => <Action rowData={rowData} setProductToEdit={setProductToEdit} />,
    },
  ];

  const searchElement = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
  };

  const handelGetData = async (page, count, char) => {
    setLoading(true);
    const res = await getProduct(page, count, char);

    res && setLoading(false);

    if (res.status == 200) {
      setData(res.data.data);
      setPageCount(res.data.last_page);
      if (!res.data.data.length) {
        setErrorMessage("هیچ دسته وجود ندارد");
      }
    }
  };

  useEffect(() => {
    handelGetData(currentPag, countOfPage, searchChar);
  }, [currentPag, searchChar]);

  const handelSearch = (char) => {
    setSearchChar(char);
    handelGetData(1, countOfPage, searchChar);
  };

  return (
    <>
      <PaginateTable
        tableData={data}
        dataInfo={dataInfo}
        loading={loading}
        errorMessage={errorMessage}
        searchElement={searchElement}
        currentPag={currentPag}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
        handelSearch={handelSearch}
        countOfPage={countOfPage}
        setCountOfPage={setCountOfPage}
        handelGetData={handelGetData}
      >
        <AddProduct setReRendering={setReRendering} productToEdit={productToEdit} setProductToEdit={setProductToEdit} />
      </PaginateTable>
    </>
  );
};

export default TableProduct;
