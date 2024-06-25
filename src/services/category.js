import HttpServices from "./httpServices";

export const getCategory = (parentId = null) => {
  return HttpServices(
    `/admin/categories${parentId ? `?parent=${parentId}` : ""}`,
    "GET"
  );
};

export const addCategory = (data) => {
  if (data.image) {
    const formData=new FormData()
    formData.append("parent_id",data.parent_id)
    formData.append("title",data.title)
    formData.append("descriptions",data.descriptions)
    formData.append("image",data.image)
    formData.append("is_active",data.is_active)
    formData.append("show_in_menu",data.show_in_menu)
    data=formData
  }

  return HttpServices("/admin/categories","post",data);
};

export const editCategory = (id,data) => {
  return HttpServices(`/admin/categories/${id}`,"put",data);
};

export const deleteCategory = (id) => {
  return HttpServices(`/admin/categories/${id}`,"delete");
};

