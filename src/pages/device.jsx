import "./device.scss";
import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BasketContext } from "../store/BasketStore";
import { DevicesContext } from "../store/DevicesStore";
import { fetchOneDevice } from "../http/deviceAPI";
import { observer } from "mobx-react-lite";
import SimpleImageSlider from "react-simple-image-slider";

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

  const slides = [{ url: process.env.REACT_APP_API_URL + "/" + device.img }];

  device.photos &&
    device.photos.forEach((img) =>
      slides.push({
        url: `${process.env.REACT_APP_API_URL}/${device.name}/${img}`,
      })
    );

  return (
    <section className='device'>
      <div className='container'>
        <div className='device__inner'>
          <h2>{device.name}</h2>

          {device.photos && device.photos.length ? (
            <SimpleImageSlider
              width={480}
              height={270}
              images={slides}
              showBullets={true}
              showNavs={true}
              navSize={30}
              navMargin={10}
              style={{ margin: "0 auto" }}
            />
          ) : (
            <img
              src={process.env.REACT_APP_API_URL + "/" + device.img}
              alt='device'
            />
          )}
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
          <p>Марка мотоцикла: {devices.getBrand(device.brandId)}</p>
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
