import { $authHost } from "./index";

export const changeDeviceUID = async (id, device_uid) => {
  const res = await $authHost.put("api/statistics/" + id, { device_uid });
  return res.status;
};

export const changeReady = async (arrayChangedStats) => {
  const res = await $authHost.put("api/statistics", {
    toChange: arrayChangedStats,
  });
  return res.status;
};
