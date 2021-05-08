import { useContext } from "react";
import { Link } from "react-router-dom";
// import deviceImg from "../static/device.jpg";
import { DeviceContext } from "../store/store";
import "./devices.scss";

function Devices() {
  const { devices } = useContext(DeviceContext);
  return (
    <section className='devices'>
      <div className='container'>
        <div className='devices__inner'>
          <h2>Устройства</h2>
          {Object.values(devices).map(
            ({ name, id, description, image: deviceImg }, index) => {
              return (
                <div className='devices__item' key={index}>
                  <div className='devices__image'>
                    <img src={deviceImg} alt='device' />
                  </div>
                  <div className='devices__description'>
                    <h3>{name}</h3>
                    <p>{description.short}</p>
                    <Link to={`/device/${id}`}>Подробнее</Link>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}

export default Devices;
