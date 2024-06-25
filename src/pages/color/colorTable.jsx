import React, { useEffect, useState } from "react";
import TableContainer from "../../components/Tablecontainer";
import AddColors from "./AddColors";
import { Alert, confirm } from "../../utils/switAlert";
import { deleteColors, getColors } from "../../services/colors";
import Action from "./tableAdition/Action";

const ColorTable = () => {
  const [data,setData]=useState([])
  const [firstPag,setFirstPag]=useState(0)
  const [loading,setLoading]=useState(false)
  const [errorMessage,setErrorMessage]=useState("")
  const [colorsToEdit,setColorsToEdit]=useState(null)

  const handelDeleteColors= async(data)=>{
    if (await confirm("warning","!حذف دسته",`ایا میخواهید ${data.title} حذف کنید؟`)) {
      const res =await deleteColors(data.id)
    if (res.status==200) {
      Alert("success","انجام شد",res.data.message)
      setData(last=>last.filter(d=>d.id!==data.id))
      setFirstPag(last=>last+1)
    }
    }
  }

  const handelGetData=async()=>{
    setLoading(true)
    const res = await getColors()

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
    {title:"اسم رنگ",filed:"title"},
    {title:"کد رنگ",filed:"code"},
  ]

  const additionField=[
    {
      title:"رنگ",
      element:(rowData)=><div className="w-100 h-100 d-block" style={{backgroundColor:rowData.code,color:rowData.code}}>...</div>
    },
    {
      title:"عملیات",
      element:(rowData)=><Action rowData={rowData} setColorsToEdit={setColorsToEdit} handelDeleteColors={handelDeleteColors}  />
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
      <AddColors setData={setData} colorsToEdit={colorsToEdit} setColorsToEdit={setColorsToEdit} />
    </TableContainer>
  );
};

export default ColorTable;
