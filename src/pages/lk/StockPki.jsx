// import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { DeviceContext } from "../../store/store";
import { useContext, useEffect, useState } from "react";
import { DevicesContext } from "../../store/DevicesStore";
import CardHorizon from "../../components/CardHorizon/CardHorizon.jsx";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { fetchAllPki, deletePki } from "../../http/pkiAPI";
import EditIcon from "@material-ui/icons/Edit";
import { observer } from "mobx-react-lite";

const StockPki = observer(() => {
  const { isOpenModal, openModal, setMessage, dialogResult } =
    useContext(DeviceContext);
  const { devices } = useContext(DevicesContext);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetchAllPki().then((data) => {
      const devs = {};
      data.forEach((device) => {
        devs[device.id] = device;
      });
      devices.setAllDevices(devs);
    });
  }, [isOpenModal]);

  useEffect(() => {
    if (dialogResult === "Удалить") {
      deletePki(selected).then((res) => {
        if (res === 200) {
          setMessage({
            title: "Успешно",
            text: `Устройство удалено`,
            cancel: "",
            ok: "OK",
          });
          openModal("mess");
        }
      });
    }
  }, [dialogResult]);

  const addDevice = () => {
    console.log("add Pki");
  };

  const editDevice = (id) => {
    console.log("edit Pki");
  };

  const openDialogToDelete = (id, name) => {
    setMessage({
      title: "Внимание!",
      text: `Вы действительно хотите удалить ${name} ?`,
      cancel: "Отмена",
      ok: "Удалить",
    });
    setSelected(id);
    openModal("mess");
  };

  return (
    <div className='stock'>
      <h4 className='stock__title'>ПКИ</h4>
      <Link to='/lk'>Назад</Link>
      <div className='stock__devices'>
        {Object.values(devices.allDevices).map((device) => (
          <CardHorizon item={device} key={device.id}>
            <DeleteForeverIcon
              className='icon-button'
              onClick={() => openDialogToDelete(device.id, device.name)}
            />
            <EditIcon
              className='icon-button'
              onClick={() => editDevice(device.id)}
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
});

export default StockPki;
