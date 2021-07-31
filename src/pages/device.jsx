import "./device.scss";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BasketContext } from "../store/BasketStore";
import { DevicesContext } from "../store/DevicesStore";
import { fetchOneDevice } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";

const Device = observer(() => {
  const { devices } = useContext(DevicesContext);
  const { basket } = useContext(BasketContext);
  const { id } = useParams();
  const [device, setDevice] = useState({ props: [] });
  let history = useHistory();

  useEffect(() => {
    fetchOneDevice(id).then((data) => {
      setDevice(data);
      devices.setDevice(data.id, data);
    });
  }, []);

  const enableInBasket = (idDevice) =>
    basket.allDevices.some((item) => item.id === idDevice);

  const addToCart = (idDevice) => {
    !enableInBasket(idDevice) && basket.saveInBasket(idDevice);
  };

  const buyNow = (idDevice) => {
    addToCart(idDevice);
    history.push("/basket");
  };
  console.log(device);
  return (
    <section className='device'>
      <div className='container'>
        <div className='device__inner'>
          <h2>{device.name}</h2>
          <img
            src={process.env.REACT_APP_API_URL + "/" + device.img}
            alt='device'
          />
          {device &&
            device.photos.length &&
            device.photos.map((img) => (
              <img
                src={`${process.env.REACT_APP_API_URL}/${device.name}/${img}`}
                alt={device.name}
              />
            ))}
          <p>{device.descriptionFull}</p>
          <table className='device__props'>
            <thead>
              <tr>
                <th>Характеристика</th>
                <th>Значение</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(device.props).map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.prop}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p>Тип мотоцикла: {devices.getType(device.typeId)}</p>
          <p> В наличии: {device.inStock} шт.</p>
          <p> Стоимость: {device.price} руб.</p>
          <div className='device__links'>
            <button type='button' onClick={() => buyNow(id)}>
              Купить сейчас
            </button>
            <button type='button' onClick={() => addToCart(id)}>
              {enableInBasket(id) ? "Перейти " : "Добавить "} в корзину
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Device;
