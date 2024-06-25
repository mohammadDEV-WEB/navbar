import * as Yup from "yup";
import { Alert } from "../../utils/switAlert";
import { addGuarantees, putGuarantees } from "../../services/garantys";

export const initialValues = {
  title: "",
  descriptions: "",
  length: "",
  length_unit: "",
};

export const onSubmit = async (value, objectSub, setData, guaranteesToEdit) => {
  if (guaranteesToEdit) {
    const res = await putGuarantees(guaranteesToEdit.id, value);
    if (res.status == 200) {
      Alert("success", "انجام شد", res.data.message);
      setData(last=>{
        const newData=[...last]
        const index = newData.findIndex(d=>d.id==guaranteesToEdit.id)
        newData[index]=res.data.data
        return newData
      })
    }
  } else {
    const res = await addGuarantees(value);
    if (res.status == 201) {
      Alert("success", "انجام شد", res.data.message);
      objectSub.resetForm();
      setData((last) => [...last, res.data.data]);
    }
  }
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/, "فقط از حروف و اعداد استفاده کنید"),
  descriptions: Yup.string().matches(
    /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده کنید"
  ),
  length: Yup.string().matches(
    /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده کنید"
  ),

  length: Yup.string().matches(
    /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده کنید"
  ),
  
});
