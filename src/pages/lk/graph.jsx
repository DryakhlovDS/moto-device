import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchAllDevices } from "../../http/buyAPI";
import { DevicesContext } from "../../store/DevicesStore";
import { DeviceContext } from "../../store/store";

const Graph = () => {
  const { devices } = useContext(DevicesContext);
  const { openModal } = useContext(DeviceContext);

  const [stat, setStat] = useState([]);
  let [changeUID, setChangeUID] = useState([]);

  useEffect(() => {
    fetchAllDevices().then((res) => setStat(res));
  }, []);

  const deviceInfo = (info) => {
    return (
      <div className='statistic__card'>
        <h3>{info.name}</h3>
        <p>Обновлен: {info.updatedAt.split("T")[0]}</p>
        <p>{info.descriptionShort}</p>
        <a
          onClick={() => {
            openModal("device");
            devices.setShowDevice(info);
          }}
        >
          Подробнее
        </a>
      </div>
    );
  };

  const saveUID = () => {
    console.log("saveUID");
  };

  return (
    <div className='stock'>
      <h4 className='stock__title'>Статистика</h4>
      <Link to='/lk'>Назад</Link>
      <table className='statistic__table'>
        <thead>
          <tr>
            <th>user_id</th>
            <th>device_id</th>
            <th>device_info</th>
            <th>device_uid</th>
            <th>ready</th>
          </tr>
        </thead>
        <tbody>
          {stat.length &&
            stat.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.user_id}</td>
                  <td>{item.device_id}</td>
                  <td>{deviceInfo(item.device_info)}</td>
                  <td>
                    <div>
                      <input
                        value={item.device_uid}
                        disabled={!changeUID[index]}
                      />
                      <button
                        onClick={() =>
                          !changeUID[index]
                            ? () => {
                                changeUID[index] = true;
                                setChangeUID(changeUID);
                              }
                            : saveUID()
                        }
                      >
                        {changeUID[index] ? "Сохранить" : "Изменить"} UID
                      </button>
                    </div>
                  </td>
                  <td>
                    <input type='checkbox' checked={item.ready} />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Graph;
