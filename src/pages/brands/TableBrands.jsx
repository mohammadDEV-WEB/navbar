import React, { useEffect, useState } from 'react';
import TableContainer from '../../components/Tablecontainer';
import AddBrands from './AddBrands';
import { apiPath } from '../../services/httpServices';
import Action from './tableAdition/Action';
import { deleteBrands, getBrands } from '../../services/brands';
import { Alert, confirm } from '../../utils/switAlert';

const TableBrands = () => {
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false)
  const [errorMessage,setErrorMessage]=useState("")
  const [brandToEdit,setBrandToEdit]=useState(null)
  const [firstPag, setFirstPag] = useState(0);

  const handelDeleteBrands= async(data)=>{
    if (await confirm("warning","!حذف دسته",`ایا میخواهید ${data.original_name} حذف کنید؟`)) {
      const res =await deleteBrands(data.id)
    if (res.status==200) {
      Alert("success","انجام شد",res.data.message)
      setData(last=>last.filter(d=>d.id!==data.id))
      setFirstPag(last=>last+1)
    }
    }
  }
  
  const dataInfo=[
    {title:"#",filed:"id"},
    {title:"عنوان لاتینی",filed:"original_name"},
    {title:"عنوان فارسی",filed:"persian_name"},
    {title:"توضیحات",filed:"descriptions"},
  ]

  const additionField=[
    {
      title:"لوگو",
      element:(rowData)=>rowData.logo?<img src={apiPath+"/"+rowData.logo} width={40} /> :null
    },
    {
      title:"عملیات",
      element:(rowData)=><Action rowData={rowData} setBrandToEdit={setBrandToEdit} handelDeleteBrands={handelDeleteBrands} />
    }
  ]

  const searchElement={
    title :"جستجو",
    placeholder:"قسمتی از عنوان را وارد کنید",
    searchField:"original_name"
  }

  const handelGetData=async()=>{
    setLoading(true)
    const res = await getBrands()
    if (res.status==200) {
      setData(res.data.data)
      setLoading(false)
      if (!res.data.data) {
        setErrorMessage("هیچ اطلاعاتی وجود ندارد")
      }
    }
  }
  useEffect(() => {
    handelGetData()
  }, []);
    return (
      <TableContainer
      data={data}
      dataInfo={dataInfo}
      additionField={additionField}
      loading={loading}
      errorMessage={errorMessage} 
      searchElement={searchElement}
      firstPag={firstPag}
      >
        <AddBrands setData={setData} brandToEdit={brandToEdit} setBrandToEdit={setBrandToEdit} />
      </TableContainer>
    );
}

export default TableBrands;
