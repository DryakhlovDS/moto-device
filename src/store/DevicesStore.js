import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._devices = {};
    makeAutoObservable(this);
  }

  setAllDevices(devices) {
    this._devices = devices;
  }

  setDevice(id, data) {
    this._devices[id] = data;
  }

  get allDevices() {
    return this._devices;
  }

  getDevice(id) {
    return this._devices[id];
  }
}

export const DevicesContext = createContext();
