import { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchAllDevices } from "../../http/buyAPI";

const Graph = () => {
  const [stat, setStat] = useState([]);

  useEffect(() => {
    fetchAllDevices().then((res) => setStat(res));
  }, []);

  return (
    <div className='stock'>
      <h4 className='stock__title'>Статистика</h4>
      <Link to='/lk'>Назад</Link>
      {/* <p>Здесь будет статистика</p> */}
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
                  <td>
                    {JSON.stringify(item.device_info).split(",").join(" ")}
                  </td>
                  <td>{item.device_uid}</td>
                  <td>
                    <input type='checkbox' />
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
