import { $authHost, $host } from "./index";

export const fetchAllTypes = async () => {
  const res = await $host.get("api/type");
  return res.data;
};

export const deleteType = async (id) => {
  const res = (await $authHost.delete(`api/type/${id}`)).status;
  return res;
};

export const updateType = async (formData) => {
  const res = await $authHost.post("api/type", formData);
  return res;
};
