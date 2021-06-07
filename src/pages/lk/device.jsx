import "./lk.scss";
import DeviceInfo from "../../components/DeviceInfo/deviceInfo.jsx";
import { Route, Switch } from "react-router-dom";

const DeviceAdd = () => {
  return (
    <div className='wrapper'>
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
