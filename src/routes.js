import Lk from "./pages/lk/lk.jsx";
import Main from "./pages/main";
import Devices from "./pages/devices";
import Device from "./pages/device";
import Basket from "./pages/basket";
import Shop from "./pages/shop";
import Stock from "./pages/lk/stock.jsx";
import StockPki from "./pages/lk/StockPki.jsx";
import Graph from "./pages/lk/graph.jsx";
import DeviceAdd from "./pages/lk/device.jsx";

export const publicRoutes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/device",
    component: Devices,
  },
  {
    path: "/device/:id",
    component: Device,
  },
  {
    path: "/shop",
    component: Shop,
  },
  {
    path: "/basket",
    component: Basket,
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
    ],
  },
];
