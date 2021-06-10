import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export default class BasketStore {
  constructor() {
    this._devices = [];
    makeAutoObservable(this);
  }

  saveInBasket(idDevice) {
    this._devices = [...this._devices, { id: idDevice, count: 1 }];
  }

  deleteFromBasket(idDevice) {
    this._devices = this._devices.filter((item) => item.id !== idDevice);
  }

  clearBasket() {
    this._devices = [];
  }

  countInc(index) {
    this._devices[index].count++;
  }

  countDec(index) {
    this._devices[index].count--;
  }

  get allDevices() {
    return this._devices;
  }
}

export const BasketContext = createContext();
