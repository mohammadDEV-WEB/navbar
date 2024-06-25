import * as Yup from "yup";
import { Alert } from "../../utils/switAlert";
import { addBrands, putBrands } from "../../services/brands";

export const initialValues = {
  original_name: "",
  persian_name: "",
  descriptions: "",
  logo: undefined,
};

export const onSubmit = async (value, objectSub, setData, brandToEdit) => {
  if (brandToEdit) {
    const res = await putBrands(brandToEdit.id, value);
    if (res.status == 200) {
      Alert("success", "انجام شد", res.data.message);
      setData(last=>{
        const newData=[...last]
        const index = newData.findIndex(d=>d.id==brandToEdit.id)
        newData[index]=res.data.data
        return newData
      })
    }
  } else {
    const res = await addBrands(value);
    if (res.status == 201) {
      Alert("success", "انجام شد", res.data.message);
      objectSub.resetForm();
      setData((last) => [...last, res.data.data]);
    }
  }
};

export const validationSchema = Yup.object({
  original_name: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(/^[a-zA-Z0-9\s@!%$?&]+$/, "فقط از حروف و اعداد استفاده کنید"),
  persian_name: Yup.string().matches(
    /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده کنید"
  ),
  descriptions: Yup.string().matches(
    /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده کنید"
  ),
  short_description: Yup.string().matches(
    /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده کنید"
  ),
  logo: Yup.mixed()
    .test(
      "filesize",
      "حجم فایل نمی تواند بیشتر از 500 کیلو بایت باشد",
      (value) => (!value ? true : value.size <= 500 * 1024)
    )
    .test("format", "باید فورمت تصویر jpg باشد", (value) =>
      !value ? true : value.type === "image/jpeg" || value.type === "image/png"
    ),
});
