import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchAllStatistics } from "../../http/buyAPI";
import { changeDeviceUID, changeReady } from "../../http/statisticsAPI";
import { DevicesContext } from "../../store/DevicesStore";
import { DeviceContext } from "../../store/store";
import { UserContext } from "../../store/UserStore";

const Graph = () => {
  const { devices } = useContext(DevicesContext);
  const { openModal, setMessage } = useContext(DeviceContext);
  const { user } = useContext(UserContext);

  const [stat, setStat] = useState([]);
  const [filterResult, setFilterResult] = useState([]);
  const [changeUID, setChangeUID] = useState({});
  const [isReady, setIsReady] = useState({});

  useEffect(() => {
    fetchAllStatistics().then((res) => {
      setStat(res);
      setFilterResult(res.filter((item) => !item.ready));
    });
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

  const userInfo = (userInfo) => {
    return (
      <div className='statistic__card'>
        <h3>{userInfo.email}</h3>
        <p>Обновлен: {userInfo.updatedAt.split("T")[0]}</p>
        <p>{userInfo.role}</p>
        <a
          onClick={() => {
            openModal("user");
            user.setShowUser(userInfo);
          }}
        >
          Подробнее
        </a>
      </div>
    );
  };

  const saveUID = async (index) => {
    const res = await changeDeviceUID(stat[index].id, stat[index].device_uid);
    res === 200 && setChangeUID({ ...changeUID, [index]: false });
  };

  const saveDevicesReady = async () => {
    const res = await changeReady(Object.values(isReady));
    if (res === 200) {
      setMessage({
        title: "Успешно",
        text: `Данные обновлены`,
        cancel: "",
        ok: "OK",
      });
      openModal("mess");
    }
  };

  const showFiltered = (e) => {
    e.preventDefault();
    let filtered;
    const filterParams = new FormData(e.target);

    if (filterParams.get("ready") === "all") filtered = stat;
    else
      filtered = stat.filter(
        (item) => item.ready === Boolean(filterParams.get("ready"))
      );

    if (filterParams.get("user") !== "all")
      filtered = filtered.filter(
        (item) => item.user.email === filterParams.get("user")
      );

    if (filterParams.get("device") !== "all")
      filtered = filtered.filter(
        (item) => item.device_info.name === filterParams.get("device")
      );

    if (filterParams.get("fromDate") !== "") {
      filtered = filtered.filter(
        (item) =>
          new Date(item.createdAt).getTime() >
          new Date(filterParams.get("fromDate")).getTime()
      );
    }

    if (filterParams.get("toDate") !== "") {
      filtered = filtered.filter(
        (item) =>
          new Date(item.createdAt).getTime() <
          new Date(filterParams.get("toDate")).getTime() + 86399999
      );
      console.log(filtered);
    }

    setFilterResult(filtered);
  };

  return (
    <div className='stock'>
      <h4 className='stock__title'>Статистика</h4>
      <Link to='/lk'>Назад</Link>
      <div className='statistic'>
        <form className='statistic__filter' onSubmit={showFiltered}>
          <div className='statistic__wrapper'>
            <fieldset>
              <label>user</label>
              <select name='user'>
                <option selected value='all'>
                  все
                </option>
                {stat
                  .reduce((array, item) => {
                    if (!array.includes(item.user.email))
                      array.push(item.user.email);
                    return array;
                  }, [])
                  .map((user) => (
                    <option value={user}>{user}</option>
                  ))}
              </select>
            </fieldset>
            <fieldset>
              <label>device name</label>
              <select name='device'>
                <option selected value='all'>
                  все
                </option>
                {stat
                  .reduce((array, item) => {
                    if (!array.includes(item.device_info.name))
                      array.push(item.device_info.name);
                    return array;
                  }, [])
                  .map((device) => (
                    <option value={device}>{device}</option>
                  ))}
              </select>
            </fieldset>
            <fieldset>
              <label style={{ width: 40 }}>ready</label>
              <select name='ready' style={{ width: 140 }}>
                <option value='all'>все</option>
                <option value='ready'>готовые</option>
                <option selected value=''>
                  не готовые
                </option>
              </select>
            </fieldset>
            <fieldset>
              <label>c</label>
              <input type='date' name='fromDate' />
              <label> по</label>
              <input type='date' name='toDate' />
            </fieldset>
          </div>
          <button type='submit'>Показать</button>
        </form>
        <button type='submit' onClick={saveDevicesReady}>
          Подтвердить выполнение
        </button>
        <table className='statistic__table'>
          <thead>
            <tr>
              <th>user</th>
              <th>date</th>
              <th>device_info</th>
              <th>device_uid</th>
              <th>ready</th>
            </tr>
          </thead>
          <tbody>
            {!!filterResult.length &&
              filterResult.map((item, index) => {
                return (
                  <tr key={`${index}.tr`}>
                    <td>{userInfo(item.user)}</td>
                    <td>{item.createdAt.split("T").join(" ")}</td>
                    <td>{deviceInfo(item.device_info)}</td>
                    <td>
                      <div>
                        <input
                          defaultValue={item.device_uid}
                          disabled={!changeUID[index]}
                          onChange={(e) => {
                            stat[index].device_uid = e.target.value;
                          }}
                        />
                        <button
                          onClick={
                            !changeUID[index]
                              ? () =>
                                  setChangeUID({ ...changeUID, [index]: true })
                              : () => saveUID(index)
                          }
                        >
                          {changeUID[index] ? "Сохранить" : "Изменить"} UID
                        </button>
                      </div>
                    </td>
                    <td>
                      <input
                        type='checkbox'
                        checked={item.ready}
                        className='customCheckbox'
                        onChange={() => {
                          stat[index].ready = !stat[index].ready;
                          setIsReady({
                            ...isReady,
                            [index]: {
                              id: stat[index].id,
                              ready: stat[index].ready,
                            },
                          });
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Graph;
