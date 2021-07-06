import { useContext } from "react";
import { Link } from "react-router-dom";
import { DevicesContext } from "../store/DevicesStore";
import { observer } from "mobx-react-lite";
import "./devices.scss";

const Devices = observer(() => {
  const { devices } = useContext(DevicesContext);
  return (
    <section className='devices'>
      <div className='container'>
        <div className='devices__inner'>
          <h2>Устройства</h2>
          {Object.values(devices.allDevices).map(
            ({ name, id, img, descriptionShort }, index) => {
              return (
                <div className='devices__item' key={index}>
                  <div className='devices__image'>
                    <img
                      src={process.env.REACT_APP_API_URL + "/" + img}
                      alt='device'
                    />
                  </div>
                  <div className='devices__description'>
                    <h3>{name}</h3>
                    <p>{descriptionShort}</p>
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
});

export default Devices;
