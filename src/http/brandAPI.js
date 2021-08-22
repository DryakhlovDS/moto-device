import { $authHost, $host } from "./index";

export const fetchAllBrands = async () => {
  const res = await $host.get("api/brand");
  return res.data;
};

export const deleteBrand = async (id) => {
  const res = (await $authHost.delete(`api/brand/${id}`)).status;
  return res;
};

export const updateBrand = async (formData) => {
  const res = await $authHost.post("api/brand", formData);
  return res;
};
