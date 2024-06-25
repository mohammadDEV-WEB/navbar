import React, { memo, useContext, useEffect, useState } from "react";
import TableContainer from "../../components/Tablecontainer";
import AddCategory from "./AddCategoty";
import { deleteCategory, getCategory } from "../../services/category";
import ShowInMenu from "./categoryAditions/ShowInMenu";
import Actions from "./categoryAditions/Actions";
import { Outlet, useParams } from "react-router";
import { date } from "../../utils/date";
import { Alert, confirm } from "../../utils/switAlert";


const CategoryTable = () => {
  const params = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadPag, setLoadPag] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [rerendering, setRerendering] = useState(0);


  const handelDelete = async (rowData) => {
    if (
      await confirm(
        "warning",
        " حذف دسته",
        `ایامیخواهید دسته ${rowData.title} را حذف کنید ؟`
      )
    ) {
      const res = await deleteCategory(rowData.id);
      if (res.status == 200) {
        Alert("success", res.data.message);
        setLoadPag((last) => last + 1);
        setRerendering((last) => last + 1);
      } else {
      }
    }
  };

  const handelGetData = async () => {
    setLoading(true);
    try {
      const res = await getCategory(params.categoryId);
      if (res.status == 200) {
        setData(res.data.data);
        if (res.data.data.length == 0) {
          setErrorMessage("دسته وجود ندارد");
        }
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handelGetData();
  }, [params, rerendering]);

  const dataInfo = [
    { title: "#", filed: "id" },
    { title: "عنوان محصول", filed: "title" },
    { title: "والد", filed: "parent_id" },
  ];

  const additionField = [
    {
      title: "تاریخ",
      element: (rowData) => date(rowData.created_at),
    },
    {
      title: "نمایش در منو",
      element: (rowData) => <ShowInMenu rowData={rowData} />,
    },
    {
      title: "عملیات",
      element: (rowData) => (
        <Actions rowData={rowData} handelDelete={handelDelete} />
      ),
    },
  ];

  const searchElement={
    title:"جستجو",
    placeholder:"قسمتی از عنوان را وارد کنید",
    searchField:"title"   
  }

  return (
    <>
      <Outlet />
      <TableContainer
        data={data}
        dataInfo={dataInfo}
        additionField={additionField}
        loading={loading}
        loadPag={loadPag}
        errorMessage={errorMessage}
        searchElement={searchElement}
      >
        <AddCategory setRerendering={setRerendering} />
      </TableContainer>
    </>
  );
};

export default memo(CategoryTable);
