import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._devices = {};
    this._types = {};
    this._showDevice = {};
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

  setTypes(types) {
    this._types = types;
  }

  getType(id) {
    return this._types[id];
  }
  get allTypes() {
    return Object.entries(this._types);
  }

  setShowDevice(device) {
    this._showDevice = device;
  }

  get showDevice() {
    return this._showDevice;
  }
}

export const DevicesContext = createContext();
