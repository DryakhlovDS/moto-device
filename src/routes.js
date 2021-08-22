import Lk from "./pages/lk/lk.jsx";
import Device from "./pages/device.jsx";
import Basket from "./pages/basket.jsx";
import Shop from "./pages/shop.jsx";
import About from "./pages/about.jsx";
import Contacts from "./pages/contacts.jsx";
import Pay from "./pages/pay.jsx";
import UserInfo from "./pages/userInfo.jsx";
import Stock from "./pages/lk/stock.jsx";
import StockPki from "./pages/lk/StockPki.jsx";
import Graph from "./pages/lk/graph.jsx";
import DeviceAdd from "./pages/lk/device.jsx";
import Brand from "./pages/lk/brand.jsx";

export const publicRoutes = [
  // {
  //   path: "/",
  //   component: Main,
  // },
  {
    path: "/device/:id",
    component: Device,
  },
  {
    path: "/",
    component: Shop,
  },
  {
    path: "/basket",
    component: Basket,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/contacts",
    component: Contacts,
  },
  {
    path: "/pay",
    component: Pay,
  },
  {
    path: "/user/:nickname",
    component: UserInfo,
  },
];
export const myRoom = [
  {
    path: "/lk",
    component: Lk,
    routes: [
      {
        path: "/lk/device",
        component: Stock,
      },
      {
        path: "/lk/addDevice",
        component: DeviceAdd,
      },
      {
        path: "lk/addDevice/:id",
        component: DeviceAdd,
      },
      {
        path: "/lk/pki",
        component: StockPki,
      },
      {
        path: "/lk/graph",
        component: Graph,
      },
      {
        path: "/lk/brand",
        component: Brand,
      },
    ],
  },
];
