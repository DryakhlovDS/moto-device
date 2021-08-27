import { createContext } from "react";
import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._info = {};
    makeAutoObservable(this);
  }

  setIsAuth(val) {
    this._isAuth = val;
  }

  setUser(userData) {
    this._user = { ...this._user, ...userData };
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get isAdmin() {
    return this._user.role && this._user.role === "ADMIN";
  }

  get info() {
    return this._info;
  }

  setInfo(info) {
    this._info = info;
  }
}

export const UserContext = createContext();
