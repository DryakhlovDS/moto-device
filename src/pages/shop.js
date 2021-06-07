import "./shop.scss";
import { Link } from "react-router-dom";
// import deviceImg from "../static/device.jpg";
import { DeviceContext } from "../store/store";
import { DevicesContext } from "../store/DevicesStore";
import { useContext } from "react";

function Shop() {
  const { addToCart, buyNow } = useContext(DeviceContext);
  const { devices } = useContext(DevicesContext);

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
                        <button onClick={() => addToCart(item.id)}>
                          В Корзину
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
}

export default Shop;
