import HttpServices from "./httpServices";

export const login = (values) => {
  return HttpServices("/auth/login", "post", {
        ...values,
        remember: values.remember ? 1 : 0,
    })
};

export const checkUser = () => {
  return HttpServices("/auth/user", "get")
};


export const logout = () => {
  return HttpServices("/auth/logout", "GET");
};


