import React, { useEffect, useState } from "react";
import TableContainer from "../../components/Tablecontainer";
import AddGrantees from "./AddGrantees";
import { deleteGuarantees, getGuarantees } from "../../services/garantys";
import Action from "./tableAdition/Action";
import { Alert, confirm } from "../../utils/switAlert";

const TableGrantees = () => {
  const [data,setData]=useState([])
  const [firstPag,setFirstPag]=useState(0)
  const [loading,setLoading]=useState(false)
  const [errorMessage,setErrorMessage]=useState("")
  const [guaranteesToEdit,setGuaranteesToEdit]=useState(null)

  const handelDeleteGuarantees= async(data)=>{
    if (await confirm("warning","!حذف دسته",`ایا میخواهید ${data.title} حذف کنید؟`)) {
      const res =await deleteGuarantees(data.id)
    if (res.status==200) {
      Alert("success","انجام شد",res.data.message)
      setData(last=>last.filter(d=>d.id!==data.id))
      setFirstPag(last=>last+1)
    }
    }
  }

  const handelGetData=async()=>{
    setLoading(true)
    const res = await getGuarantees()

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
    {title:"توضیحات",filed:"descriptions"},
    {title:"مدت گارانتی",filed:"length"},
    {title:"واحد",filed:"length_unit"},
  ]

  const additionField=[
    {
      title:"عملیات",
      element:(rowData)=><Action rowData={rowData} setGuaranteesToEdit={setGuaranteesToEdit} handelDeleteGuarantees={handelDeleteGuarantees} />
    }
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

      <AddGrantees setData={setData} guaranteesToEdit={guaranteesToEdit}/>
    </TableContainer>
  );
};

export default TableGrantees;
