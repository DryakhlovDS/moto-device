import "./device.scss";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DeviceContext } from "../store/store";
import { DevicesContext } from "../store/DevicesStore";
import { getOneDevice } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";

const Device = observer(() => {
  const { addToCart, buyNow } = useContext(DeviceContext);
  const { devices } = useContext(DevicesContext);
  const { id } = useParams();
  const [device, setDevice] = useState({ props: [] });

  useEffect(() => {
    getOneDevice(id).then((data) => {
      setDevice(data);
      devices.setDevice(data.id, data);
    });
  }, []);

  return (
    <section className='device'>
      <div className='container'>
        <div className='device__inner'>
          <h2>{device.name}</h2>
          <img
            src={process.env.REACT_APP_API_URL + "/" + device.img}
            alt='device'
          />
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
          <p> В наличии: {device.inStock} шт.</p>
          <p> Стоимость: {device.price} руб.</p>
          <div className='device__links'>
            <button type='button' onClick={() => buyNow(device.id)}>
              Купить сейчас
            </button>
            <button type='button' onClick={() => addToCart(device.id)}>
              В Корзину
            </button>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Device;
