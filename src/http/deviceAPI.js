import { $authHost, $host } from "./index";

export const createDevice = async (formData) => {
  const res = await $authHost.post("api/device", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateDevice = async (id, formData) => {
  const res = await $authHost.put(`api/device/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const fetchAllDevices = async () => {
  const res = await $host.get("api/device");
  return res.data;
};

export const fetchOneDevice = async (id) => {
  const res = await $host.get(`api/device/${id}`);
  return res.data;
};

export const deleteDevice = async (id) => {
  const res = await $authHost.delete(`api/device/${id}`);
  return res.status;
};
