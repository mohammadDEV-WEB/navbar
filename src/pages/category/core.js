import { addCategory, editCategory } from "../../services/category";
import * as Yup from "yup";
import { Alert } from "../../utils/switAlert";

export const initialValues = {
  parent_id: "",
  title: "",
  descriptions: "",
  image: undefined,
  is_active: true,
  show_in_menu: true,
};

export const onSubmit = async (value, objectSub, editId_id,setRerendering) => {
  try {
    value = {
      ...value,
      is_active: value.is_active ? 1 : 0,
      show_in_menu: value.show_in_menu ? 1 : 0,
    };
    if (editId_id) {
      const res = await editCategory(editId_id, value);
      if (res.status == 201) {
        setRerendering(last=>last+1)
        Alert("success", "موفق !", "دسته ویرایش شد");
      }
    } else {
      const res = await addCategory(value);
      if ((res.status = 201)) {
        Alert("success", "موفق !", "دسته ایجاد شد");
        objectSub.resetForm();
        setRerendering(last=>last+1)
      } else if ((res.status = 202)) {
        Alert("warning", "خطا!", res.data.title[0]);
      }
    }
  } catch (error) {
  } finally {
  }
};

export const validationSchema = Yup.object({
  parent_id: Yup.number(),
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده کنید"
    ),
  descriptions: Yup.string().matches(
    /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده کنید"
  ),
  image: Yup.mixed()
    .test(
      "filesize",
      "حجم فایل نمی تواند بیشتر از 500 کیلو بایت باشد",
      (value) => (!value ? true : value.size <= 500 * 1024)
    )
    .test("format", "باید فورمت تصویر jpg باشد", (value) =>
      !value ? true : value.type === "image/jpeg"
    ),
  is_active: Yup.boolean(),
  show_in_menu: Yup.boolean(),
});
