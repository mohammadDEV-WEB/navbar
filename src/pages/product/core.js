import * as Yup from "yup";
import { addProduct, putProduct } from "../../services/products";
import { Alert } from "../../utils/switAlert";

export const initialValues = {
  category_ids: "",
  title: "",
  price: "",
  weight: "",
  brand_id: "",
  color_ids: "",
  guarantee_ids: "",
  descriptions: "",
  short_descriptions: "",
  cart_descriptions: "",
  image: "",
  alt_image: "",
  keywords: "",
  stock: "",
  discount: "",
};

export const onSubmit = async (value, objectSub,setReRendering,productToEdit) => {
  
  if (productToEdit) {
    const res = await putProduct(productToEdit.id,value);
    if (res.status == 200) {
      Alert("success", "انجام شد", res.data.message);
    }
    res && setReRendering(last=>last+1)
  } else {
    const res = await addProduct(value);
    if (res.status == 201) {
      Alert("success", "انجام شد", res.data.message);
    }
    res && setReRendering(last=>last+1)
  }
};

export const validationSchema = Yup.object({
  category_ids: Yup.string()
    .required("لطفا این قسمت را وارد کنید")
    .matches(/^[\0-9\s-]+$/, "فقط از اعداد و خط تیره استفاده شود"),
  title: Yup.string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده کنید"
    ),
  price: Yup.number().required("لطفا این قسمت را وارد کنید"),
  weight: Yup.number(),
  brand_id: Yup.number(),
  color_ids: Yup.string().matches(
    /^[\0-9\s-]+$/,
    "فقط از اعداد و خط تیره استفاده شود"
  ),
  guarantee_ids: Yup.string().matches(
    /^[\0-9\s-]+$/,
    "فقط از اعداد و خط تیره استفاده شود"
  ),
  descriptions: Yup.string(),
  // .matches(
  //   /^[\u0600-\u06ff\sa-zA-Z0-9@!%$<>/"';?&]+$/,
  //   "فقط از حروف و اعداد استفاده کنید"
  // ),
  short_descriptions: Yup.string()
  .matches(
    /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده کنید"
  ),
  cart_descriptions: Yup.string().matches(
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
  alt_image: Yup.string().matches(
    /^[\u0600-\u06ff\sa-zA-Z0-9@!%$?&]+$/,
    "فقط از حروف و اعداد استفاده کنید"
  ),
  stock: Yup.number(),
  discount: Yup.number(),
});
