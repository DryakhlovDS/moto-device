import { $host, $authHost } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
  });
  data && data.token && localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  data && data.token && localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  data && data.token && localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const fetchUserInfo = async (id) => {
  const { data } = await $authHost.get("api/user/info/" + id);
  return data;
};

export const updateUserInfo = async (id, formData) => {
  const { data } = await $authHost.put("api/user/info/" + id, formData);
  return data;
};
