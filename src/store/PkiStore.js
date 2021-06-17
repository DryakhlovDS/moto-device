import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export default class PkiStore {
  constructor() {
    this._pki = {};
    makeAutoObservable(this);
  }

  setAllPki(pki) {
    this._pki = { ...this._pki, ...pki };
  }

  get allPki() {
    return this._pki;
  }

  getOnePki(id) {
    return this._pki[id];
  }
}

export const PkiContext = createContext();
