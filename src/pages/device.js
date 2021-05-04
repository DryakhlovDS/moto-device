import "./device.scss";
import { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { DeviceContext } from "../store/store";
import deviceImg from "../static/device.jpg";

function Device() {
  const devices = useContext(DeviceContext);
  const { id } = useParams();
  const { name, image, description, props } = devices[id.slice(1)];
  const addToCart = () => {
    console.log("Add device in cart");
  };
  return (
    <section className='device'>
      <div className='container'>
        <div className='device__inner'>
          <h2>{name}</h2>
          <img src={deviceImg} alt='device' />
          <p>{description.full}</p>
          <table className='device__props'>
            <thead>
              <tr>
                <th>Характеристика</th>
                <th>Значение</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(props).map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className='device__links'>
            <Link to='/shop'>Купить сейчас</Link>
            <button onClick={addToCart}>В Корзину</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Device;
