import "./shop.scss";
import { Link, useHistory } from "react-router-dom";
import { BasketContext } from "../store/BasketStore";
import { DevicesContext } from "../store/DevicesStore";
import { useContext, useState } from "react";
import { observer } from "mobx-react-lite";

const Shop = observer(() => {
  const { devices } = useContext(DevicesContext);
  const { basket } = useContext(BasketContext);
  const [devicesInShop, setDevicesInShop] = useState(
    Object.values(devices.allDevices)
  );
  let history = useHistory();

  let [filterString, setFilterString] = useState("");
  let [filterInStock, setFilterInStock] = useState(false);
  let [filterBrands, setFilterBrands] = useState([]);

  const enableInBasket = (idDevice) =>
    basket.allDevices.some((item) => item.id === idDevice);

  const addToCart = (idDevice) => {
    !enableInBasket(idDevice) && basket.saveInBasket(idDevice);
  };

  const buyNow = (idDevice) => {
    addToCart(idDevice);
    history.push("/basket");
  };

  const handleFilter = (event) => {
    event.preventDefault();
    let filterResult = Object.values(devices.allDevices);

    if (filterString)
      filterResult = filterResult.filter((device) =>
        device.name.toLowerCase().includes(filterString.toLowerCase())
      );

    if (filterInStock)
      filterResult = filterResult.filter((device) => device.inStock > 0);
    if (filterBrands.length) {
      filterResult = filterResult.filter((device) =>
        filterBrands.includes(`${device.brandId}`)
      );
    }
    setDevicesInShop(filterResult);
  };

  const changeFilterBrand = (brand) => {
    if (filterBrands.includes(brand)) {
      setFilterBrands(filterBrands.filter((item) => item !== brand));
    } else {
      setFilterBrands([...filterBrands, brand]);
    }
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
                <form
                  name='filter'
                  className='filter__form'
                  onSubmit={handleFilter}
                >
                  <input
                    type='text'
                    name='query'
                    placeholder='Поиск по названию'
                    defaultValue={filterString}
                    onBlur={(e) => setFilterString(e.target.value)}
                  />
                  <div className='filter__group'>
                    <input
                      type='checkbox'
                      id='inStock'
                      name='inStock'
                      checked={filterInStock}
                      onChange={() => setFilterInStock(!filterInStock)}
                    />
                    <label htmlFor='inStock'>В наличии</label>
                  </div>
                  <p>По марке:</p>
                  {devices.allBrands.map((brand) => {
                    return (
                      <div className='filter__group' key={brand[1]}>
                        <input
                          type='checkbox'
                          id={`brand_${brand[0]}`}
                          name={brand[1]}
                          checked={filterBrands.includes(brand[0])}
                          onChange={() => changeFilterBrand(brand[0])}
                        />
                        <label htmlFor={`brand_${brand[0]}`}>{brand[1]}</label>
                      </div>
                    );
                  })}
                  <button type='submit'>Показать</button>
                </form>
              </div>
            </aside>
            <div className='shop__goods'>
              {devicesInShop &&
                devicesInShop.map((item, index) => {
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
                            {enableInBasket(item.id) ? "Перейти " : "Добавить "}{" "}
                            в Корзину
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
