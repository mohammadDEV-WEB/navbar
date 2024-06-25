import React, { useEffect, useState } from "react";
import TableContainer from "../../components/Tablecontainer";
import AddDiscounts from "./AddDiscounts";
import { Alert, confirm } from "../../utils/switAlert";
import { deleteDiscounts, getDiscounts } from "../../services/discounts";
import ActionDiscount from "./discoundsAditions/ActionDiscount";
import For from "./discoundsAditions/For";
import DiscountPercent from "./discoundsAditions/DiscountPercent";
import { date } from "../../utils/date";

const TableDiscounts = () => {
  const [data,setData]=useState([])
  const [firstPag,setFirstPag]=useState(0)
  const [loading,setLoading]=useState(false)
  const [errorMessage,setErrorMessage]=useState("")
  const [discountsToEdit,setDiscountsToEdit]=useState(null)

  const handelDeleteDiscounts= async(data)=>{
    if (await confirm("warning","!حذف دسته",`ایا میخواهید ${data.title} حذف کنید؟`)) {
      const res =await deleteDiscounts(data.id)
    if (res.status==200) {
      Alert("success","انجام شد",res.data.message)
      setData(last=>last.filter(d=>d.id!==data.id))
      setFirstPag(last=>last+1)
    }
    }
  }

  const handelGetData=async()=>{
    setLoading(true)
    const res = await getDiscounts()

    res&&setLoading(false)

    if (res.status==200) {
      setData(res.data.data)
      if (!res.data.data) {
        setErrorMessage(res.data.message)
      }
    }
  }

  useEffect(() => {
    handelGetData()
  }, []);

  const dataInfo=[
    {title:"#",filed:"id"},
    {title:"عنوان",filed:"title"},
    {title:"کد",filed:"code"},
  ]

  const additionField=[
    {
      title:"درصد تخفیف",
      element:(rowData)=><DiscountPercent rowData={rowData}/>
    },
    {
      title:"تا تاریخ",
      element:(rowData)=>date(rowData.expire_at)
    },
    {
      title:"برای همه",
      element:(rowData)=><For rowData={rowData}/>
    },
    {
      title:"عملیات",
      element:(rowData)=><ActionDiscount rowData={rowData} setDiscountsToEdit={setDiscountsToEdit} handelDeleteDiscounts={handelDeleteDiscounts}  />
    },
  ]

  const searchElement={
    title:"جستجو",
    placeholder:"قسمتی از عنوان را وارد کنید",
    searchField:"title"  
  }
  return (
    <TableContainer
    data={data}
    dataInfo={dataInfo}
    additionField={additionField}
    firstPag={firstPag}
    loading={loading}
    errorMessage={errorMessage}
    searchElement={searchElement}
    >
      <AddDiscounts setData={setData} discountsToEdit={discountsToEdit} setDiscountsToEdit={setDiscountsToEdit} />
    </TableContainer>
  );
};

export default TableDiscounts;
