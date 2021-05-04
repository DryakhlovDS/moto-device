import Lk from "./pages/lk";
import Main from "./pages/main";
import Devices from "./pages/devices";
import Device from "./pages/device";
import Basket from "./pages/basket";
import Shop from "./pages/shop";

const routes = [
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
  {
    path: "/lk",
    component: Lk,
  },
];

export default routes;
