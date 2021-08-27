import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._devices = {};
    this._brands = {};
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

  setBrands(brands) {
    this._brands = brands;
  }

  getBrand(id) {
    return this._brands[id];
  }
  get allBrands() {
    return Object.entries(this._brands);
  }

  setShowDevice(device) {
    this._showDevice = device;
  }

  get showDevice() {
    return this._showDevice;
  }
}

export const DevicesContext = createContext();
