import { $authHost, $host } from "./index";

export const createDevice = async (formData) => {
  const res = await $authHost.post("api/device", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("add device:", res);
};

export const updateDevice = async (id, formData) => {
  const res = await $authHost.put(`api/device/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("upd device:", res);
};

export const getAllDevices = async () => {
  const res = await $host.get("api/device");
  return res.data;
};

export const getOneDevice = async (id) => {
  const res = await $host.get(`api/device/${id}`);
  return res.data;
};

export const deleteDevice = async (id) => {
  const res = (await $authHost.delete(`api/device/${id}`)).status;
  return res;
};
