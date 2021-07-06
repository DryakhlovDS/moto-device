import "./shop.scss";
import { Link, useHistory } from "react-router-dom";
import { BasketContext } from "../store/BasketStore";
import { DevicesContext } from "../store/DevicesStore";
import { useContext } from "react";
import { observer } from "mobx-react-lite";

const Shop = observer(() => {
  const { devices } = useContext(DevicesContext);
  const { basket } = useContext(BasketContext);
  let history = useHistory();

  const enableInBasket = (idDevice) =>
    basket.allDevices.some((item) => item.id === idDevice);

  const addToCart = (idDevice) => {
    !enableInBasket(idDevice) && basket.saveInBasket(idDevice);
  };

  const buyNow = (idDevice) => {
    addToCart(idDevice);
    history.push("/basket");
  };

  return (
    <section className='shop'>
      <div className='container'>
        <div className='shop__inner'>
          <h2>Магазин</h2>
          <div className='shop__container'>
            <aside className='shop__menu'>
              <div className='filter'>
                <h3>Фильтры</h3>
                <form name='filter' className='filter__form'>
                  <input
                    type='text'
                    name='query'
                    placeholder='Поиск по названию'
                  />
                  <div className='filter__group'>
                    <label htmlFor='inStock'>В наличии</label>
                    <input type='checkbox' id='inStock' />
                  </div>
                  <button type='submit'>Показать</button>
                </form>
              </div>
            </aside>
            <div className='shop__goods'>
              {Object.values(devices.allDevices).map((item, index) => {
                return (
                  <div className='card' key={index}>
                    <div className='card__image'>
                      <img
                        src={process.env.REACT_APP_API_URL + "/" + item.img}
                        alt='device'
                      />
                    </div>
                    <div className='card__header'>
                      <h3 className='card__title'>{item.name}</h3>
                    </div>
                    <div className='card__body'>
                      <p>{item.descriptionShort}</p>
                      <p>
                        <Link to={`/device/${item.id}`}>Подробнее</Link>
                      </p>
                      <p>В наличии: {item.inStock} шт.</p>
                      <p> Стоимость: {item.price} руб.</p>
                    </div>
                    <div className='card__footer'>
                      <div className='card__btns'>
                        <button onClick={() => buyNow(item.id)}>
                          Купить сейчас
                        </button>
                        <button
                          onClick={() =>
                            enableInBasket(item.id)
                              ? buyNow(item.id)
                              : addToCart(item.id)
                          }
                        >
                          {enableInBasket(item.id) ? "Перейти " : "Добавить "} в
                          Корзину
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Shop;
