// import { useLocation } from "react-router";
import { Link, useHistory } from "react-router-dom";
import { DeviceContext } from "../../store/store";
import { PkiContext } from "../../store/PkiStore";
import { useContext, useEffect, useState } from "react";
import { DevicesContext } from "../../store/DevicesStore";
import CardHorizon from "../../components/CardHorizon/CardHorizon.jsx";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { fetchAllDevices, deleteDevice } from "../../http/deviceAPI";
import { fetchAllPki } from "../../http/pkiAPI";
import EditIcon from "@material-ui/icons/Edit";
import { observer } from "mobx-react-lite";

const Stock = observer(() => {
  const { isOpenModal, openModal, setMessage, dialogResult } =
    useContext(DeviceContext);
  const { devices } = useContext(DevicesContext);
  const { pki } = useContext(PkiContext);
  const [selected, setSelected] = useState("");
  let history = useHistory();

  useEffect(() => {
    fetchAllPki().then((data) => {
      const fetchPki = data.reduce((acc, item) => {
        acc[item.name] = item;
        return acc;
      }, {});
      pki.setAllPki(fetchPki);
    });
  }, []);

  useEffect(() => {
    fetchAllDevices().then((data) => {
      const devs = {};
      data.forEach((device) => {
        devs[device.id] = device;
      });
      devices.setAllDevices(devs);
    });
  }, [isOpenModal]);

  useEffect(() => {
    if (dialogResult === "Удалить") {
      deleteDevice(selected).then((res) => {
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
    history.push("/lk/addDevice");
  };

  const editDevice = (id) => {
    history.push("/lk/addDevice/" + id);
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
      <h4 className='stock__title'>Устройства</h4>
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

export default Stock;
