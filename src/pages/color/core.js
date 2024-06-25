import * as Yup from "yup";
import { Alert } from "../../utils/switAlert";
import { addBrands, putBrands } from "../../services/brands";
import { addColors, putColors } from "../../services/colors";

export const initialValues = {
  title:"",
  code:"#000"
};

export const onSubmit = async (value, objectSub, setData, colorsToEdit) => {
  if (colorsToEdit) {
    const res = await putColors(colorsToEdit.id, value);
    if (res.status == 200) {
      Alert("success", "انجام شد", res.data.message);
      setData(last=>{
        const newData=[...last]
        const index = newData.findIndex(d=>d.id==colorsToEdit.id)
        newData[index]=res.data.data
        return newData
      })
    }
  } else {
    const res = await addColors(value);
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
  code: Yup.string().required("رنگ را انتخاب کنید"),
});