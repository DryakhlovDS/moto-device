import { $authHost } from "./index";

export const buyDevices = async (basket) => {
  const res = await $authHost.post("api/statistics", basket);
  return res;
};

export const fetchAllDevices = async () => {
  const res = await $authHost.get("api/statistics");
  return res.data;
};
