import { $authHost, $host } from "./index";

export const fetchAllPki = async () => {
  const res = await $host.get("api/pki");
  return res.data;
};

export const deletePki = async (id) => {
  const res = (await $authHost.delete(`api/pki/${id}`)).status;
  return res;
};

export const updatePki = async (formData) => {
  const res = await $authHost.post("api/pki", formData);
  return res;
};
