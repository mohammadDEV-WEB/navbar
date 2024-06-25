import * as Yup from "yup";
import {
  addAttribute,
  editAttribute,
  putAttribute,
} from "../../../services/attributeCategory";
import { Alert } from "../../../utils/switAlert";

export const initialValues = {
  title: "",
  unit: "",
  in_filter: false,
};

export const onSubmit = async (value, objectSub, id, setData, editAttr) => {
  try {
    value = {
      ...value,
      in_filter: value.in_filter ? 1 : 0,
    };
    if (editAttr) {
      const res = await editAttribute(editAttr.id, value);
      if (res.status == 200) {
        Alert("success", "انجام شد", res.data.message);
        setData((last) => {
          const newData = [...last];
          const index = newData.findIndex((d) => d.id === editAttr.id);
          newData[index] = res.data.data;
          return newData;
        });
      }
    } else {
      const res = await addAttribute(id, value);
      if (res.status == 201) {
        Alert("success", "انجام شد", res.data.message);
        setData((last) => [...last, res.data.data]);
      }
    }
  } catch (error) {}
};

export const validationSchema = Yup.object({
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده کنید"
    ),
  unit: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده کنید"
    ),
  in_filter: Yup.boolean(),
});
