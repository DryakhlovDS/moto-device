import "./lk.scss";
import DeviceInfo from "../../components/DeviceInfo/deviceInfo.jsx";
import { Route, Switch, Link, useRouteMatch } from "react-router-dom";
import { observer } from "mobx-react-lite";

const DeviceAdd = () => {
  let match = useRouteMatch("/lk/addDevice/:id");

  return (
    <div className='wrapper'>
      <h4 className='stock__title'>
        {match ? "Редактирование устройства" : "Новое устройство"}
      </h4>
      <Link to='/lk/device'>Назад</Link>
      <Switch>
        <Route path='/lk/addDevice' exact>
          <DeviceInfo />
        </Route>
        <Route path='/lk/addDevice/:id'>
          <DeviceInfo />
        </Route>
      </Switch>
    </div>
  );
};

export default DeviceAdd;
