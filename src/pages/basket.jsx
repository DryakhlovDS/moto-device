import "./basket.scss";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { BasketContext } from "../store/BasketStore";
import { DeviceContext } from "../store/store";
import { DevicesContext } from "../store/DevicesStore";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CardHorizon from "../components/CardHorizon/CardHorizon";
import { observer } from "mobx-react-lite";
import { UserContext } from "../store/UserStore";
import { buyDevices } from "../http/buyAPI";

const Basket = observer(() => {
  const { basket } = useContext(BasketContext);
  const { devices } = useContext(DevicesContext);
  const { user } = useContext(UserContext);
  const { openModal } = useContext(DeviceContext);

  const goods = basket.allDevices.length;
  const totalCost = basket.allDevices.reduce(
    (acc, item) => item.count * devices.allDevices[item.id].price + acc,
    0
  );
  const totalGoods = basket.allDevices.reduce(
    (acc, { count }) => acc + count,
    0
  );
  const changeCount = (idDevice, func) => {
    const indexDevice = basket.allDevices.findIndex(
      (item) => item.id === idDevice
    );
    // eslint-disable-next-line default-case
    switch (func) {
      case "minus":
        basket.countDec(indexDevice);
        break;
      case "plus":
        basket.countInc(indexDevice);
        break;
    }
  };
  const deleteGood = (idDevice) => {
    basket.deleteFromBasket(idDevice);
  };

  const deleteAllGoods = () => {
    basket.clearBasket();
  };

  const buy = async () => {
    const toBuy = { user_id: user.user.id, devices: basket.allDevices };
    toBuy.devices.forEach((item) => (item.info = devices.getDevice(item.id)));
    const res = await buyDevices(toBuy);
    if (res.status === 200) deleteAllGoods();
    console.log("Покупка", res);
  };

  return (
    <section className='basket'>
      <div className='container'>
        <h2>Корзина</h2>

        {!goods ? (
          <p>
            В корзине пока нет товаров! <Link to='/shop'>Выбрать товар</Link>
          </p>
        ) : (
          <div className='basket__container'>
            <aside className='basket__menu'>
              <div className='info'>
                <h3 className='info__title'>В корзине </h3>
                <p className='info__text'>{totalGoods} товаров</p>
                <p className='info__text'>К оплате: {totalCost} рублей</p>
                {user.isAuth ? (
                  <button onClick={buy}>Оформить</button>
                ) : (
                  <button onClick={() => openModal("login")}>Войти</button>
                )}
              </div>

              <button className='basket__btn' onClick={deleteAllGoods}>
                Очистить корзину
              </button>
            </aside>
            <div className='basket__goods'>
              {basket.allDevices.map((item, index) => (
                <CardHorizon item={devices.getDevice(item.id)} key={index}>
                  <div className='options'>
                    <label htmlFor='count'>Количество</label>
                    <div className='options__control'>
                      <button
                        className='options__btn'
                        onClick={() => changeCount(item.id, "minus")}
                        disabled={item.count < 2}
                      >
                        -
                      </button>
                      <output name='count'>{item.count}</output>
                      <button
                        className='options__btn'
                        onClick={() => changeCount(item.id, "plus")}
                        disabled={item.count === item.inStock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <DeleteForeverIcon
                    className='icon-button'
                    onClick={() => deleteGood(item.id)}
                  />
                </CardHorizon>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

export default Basket;
