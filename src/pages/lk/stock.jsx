// import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { DeviceContext } from "../../store/store";
import { useContext } from "react";
import CardHorizon from "../../components/CardHorizon/CardHorizon.jsx";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function Stock() {
  // const url = useLocation();
  // const path = url.pathname.split("/")[2];

  const { devices, openModal } = useContext(DeviceContext);
  const addDevice = () => {
    console.log("open empty form");
    openModal("device");
  };

  return (
    <div className='stock'>
      <h4 className='stock__title'>Устройства</h4>
      <Link to='/lk'>Назад</Link>
      <div className='stock__devices'>
        {Object.values(devices).map((device) => (
          <CardHorizon item={device} key={device.id}>
            <DeleteForeverIcon
              className='icon-button'
              onClick={() => console.log(device.id)}
            />
          </CardHorizon>
        ))}
      </div>
      <div className='stock__add'>
        <button className='stock__btn' onClick={addDevice}>
          Добавить устройство
        </button>
      </div>
    </div>
  );
}

export default Stock;
