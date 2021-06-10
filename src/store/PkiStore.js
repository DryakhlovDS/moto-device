import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export default class PkiStore {
  constructor() {
    this._pki = {};
    makeAutoObservable(this);
  }

  setAllPki(devices) {
    this._devices = devices;
  }

  setPki(id, data) {
    this._devices[id] = data;
  }

  get allPki() {
    return this._devices;
  }
}

export const PkiContext = createContext();
