import { createContext } from "react";

export const devices = {
  t1: {
    name: "Device #1",
    id: "t1",
    inStock: 2,
    price: 1200,
    image:
      "https://srpmqa.ch.files.1drv.com/y4m3u5O-u9y1CRVMHN8tYi7cgErp-3JbBn2n7lkiWvu7BWMOJm9iZtWCLErntO5Hgl-yD5ww2Ym6i2oSs55vtOr5OprsqgOvpClCPnGI6Xkmhborb9N1qi4sXNb_TKWg0lUNTJN2aFQ-NNeat54riLtIBzG9PlD1pUvgweqrhUhtGUFf23yD9f1y-bOiW-hbZau-nvHAgJYu1JmZ-LFlXpUjA/device.jpg?psid=1",
    description: {
      short:
        "Здесь нужно дать краткую информацию об устройстве, его свойствах. Написать какое оно хорошее и замечательное. Полная информация будет предоставлена на страничке описания этого устройства по ссылке ниже.",
      full:
        "Здесь нужно дать полную информацию об устройстве, его свойствах. Написать какое оно хорошее и замечательное. Было придумано для людей которые хотят получить от своего мотоцикла всё. Скорее всего в отом месте будет очень много текста...",
    },
    props: {
      speed: {
        title: "Скорость, км/ч",
        value: 120,
      },
      rotate: {
        title: "Рабочие обороты, об/мин",
        value: 3500,
      },
    },
  },
  t2: {
    name: "Device #2",
    id: "t2",
    inStock: 1,
    price: 800,
    image:
      "https://srpmqa.ch.files.1drv.com/y4m3u5O-u9y1CRVMHN8tYi7cgErp-3JbBn2n7lkiWvu7BWMOJm9iZtWCLErntO5Hgl-yD5ww2Ym6i2oSs55vtOr5OprsqgOvpClCPnGI6Xkmhborb9N1qi4sXNb_TKWg0lUNTJN2aFQ-NNeat54riLtIBzG9PlD1pUvgweqrhUhtGUFf23yD9f1y-bOiW-hbZau-nvHAgJYu1JmZ-LFlXpUjA/device.jpg?psid=1",
    description: {
      short:
        "Здесь нужно дать краткую информацию об устройстве, его свойствах. Написать какое оно хорошее и замечательное. Полная информация будет предоставлена на страничке описания этого устройства по ссылке ниже.",
      full:
        "Здесь нужно дать полную информацию об устройстве, его свойствах. Написать какое оно хорошее и замечательное. Было придумано для людей которые хотят получить от своего мотоцикла всё. Скорее всего в отом месте будет очень много текста...",
    },
    props: {
      speed: {
        title: "Скорость, км/ч",
        value: 80,
      },
      rotate: {
        title: "Рабочие обороты, об/мин",
        value: 3000,
      },
    },
  },
  t3: {
    name: "Device #3",
    id: "t3",
    inStock: 3,
    price: 1000,
    image:
      "https://srpmqa.ch.files.1drv.com/y4m3u5O-u9y1CRVMHN8tYi7cgErp-3JbBn2n7lkiWvu7BWMOJm9iZtWCLErntO5Hgl-yD5ww2Ym6i2oSs55vtOr5OprsqgOvpClCPnGI6Xkmhborb9N1qi4sXNb_TKWg0lUNTJN2aFQ-NNeat54riLtIBzG9PlD1pUvgweqrhUhtGUFf23yD9f1y-bOiW-hbZau-nvHAgJYu1JmZ-LFlXpUjA/device.jpg?psid=1",
    description: {
      short:
        "Здесь нужно дать краткую информацию об устройстве, его свойствах. Написать какое оно хорошее и замечательное. Полная информация будет предоставлена на страничке описания этого устройства по ссылке ниже.",
      full:
        "Здесь нужно дать полную информацию об устройстве, его свойствах. Написать какое оно хорошее и замечательное. Было придумано для людей которые хотят получить от своего мотоцикла всё. Скорее всего в отом месте будет очень много текста...",
    },
    props: {
      speed: {
        title: "Скорость, км/ч",
        value: 100,
      },
      rotate: {
        title: "Рабочие обороты, об/мин",
        value: 4500,
      },
    },
  },
};

export const DeviceContext = createContext();

export const GoodsContext = createContext();
