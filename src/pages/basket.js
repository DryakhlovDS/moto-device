import "./basket.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GoodsContext } from "../store/store";
// import deviceImg from "../static/device.jpg";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import CardHorizon from "../components/CardHorizon/CardHorizon";

function Basket() {
  const [goods, setGoods] = useContext(GoodsContext);
  const noGoods = !goods.length;
  const totalCost = goods.reduce(
    (acc, item) => item.count * item.price + acc,
    0
  );
  const totalGoods = goods.reduce((acc, { count }) => acc + count, 0);
  const changeCount = (idDevice, func) => {
    const indexDevice = goods.findIndex((item) => item.id === idDevice);
    // eslint-disable-next-line default-case
    switch (func) {
      case "minus":
        goods[indexDevice].count--;
        break;
      case "plus":
        goods[indexDevice].count++;
        break;
    }
    setGoods([...goods]);
  };
  const deleteGoods = (idDevice) => {
    const refreshGoods = goods.filter((item) => item.id !== idDevice);
    setGoods(refreshGoods);
  };
  const deleteAllGoods = () => {
    setGoods([]);
  };
  return (
    <section className='basket'>
      <div className='container'>
        <h2>Корзина</h2>

        {noGoods && (
          <p>
            В корзине пока нет товаров! <Link to='/shop'>Выбрать товар</Link>
          </p>
        )}
        {!noGoods && (
          <div className='basket__container'>
            <aside className='basket__menu'>
              <div className='info'>
                <h3 className='info__title'>В корзине </h3>
                <p className='info__text'>{totalGoods} товаров</p>
                <p className='info__text'>К оплате: {totalCost} рублей</p>
                <button>оформить</button>
              </div>

              <button className='basket__btn' onClick={deleteAllGoods}>
                Очистить корзину
              </button>
            </aside>
            <div className='basket__goods'>
              {goods.map((item, index) => (
                <CardHorizon item={item} key={index}>
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
                    onClick={() => deleteGoods(item.id)}
                  />
                </CardHorizon>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Basket;
