import "./App.scss";
import { useContext, useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { myRoom, publicRoutes } from "./routes";
import Header from "./components/header/header";
import { DeviceContext, devices, GoodsContext } from "./store/store";
import { UserContext } from "./store/UserStore";
import { DevicesContext } from "./store/DevicesStore";
import Modal from "./components/modal/modal.jsx";
import Login from "./components/Login/Login.jsx";
import Message from "./components/Message/Message.jsx";
import DeviceInfo from "./components/DeviceInfo/deviceInfo";
import { observer } from "mobx-react-lite";
import { check } from "./http/userAPI";
import { fetchAllDevices } from "./http/deviceAPI";
import BasketStore, { BasketContext } from "./store/BasketStore";

const App = observer(() => {
  const { user } = useContext(UserContext);
  const { devices } = useContext(DevicesContext);

  useEffect(() => {
    check().then((data) => {
      user.setUser(data);
      user.setIsAuth(true);
    });
    fetchAllDevices().then((data) => {
      const devs = {};
      data.forEach((device) => {
        devs[device.id] = device;
      });
      devices.setAllDevices(devs);
    });
  }, []);

  let [isOpenModal, setOpenModal] = useState(false);
  let [typeOfModal, setTypeOfModal] = useState("");
  let [message, setMessage] = useState({});
  const [dialogResult, setDialogResult] = useState("");

  const admin = user.isAdmin;
  const openModal = (type) => {
    setTypeOfModal(type);
    setOpenModal(true);
  };

  const closeModal = (value) => {
    setOpenModal(false);
    setDialogResult(value);
    setMessage(message);
  };

  return (
    <div className='App'>
      <BasketContext.Provider value={{ basket: new BasketStore() }}>
        <Header openLogin={openModal} />
        <DeviceContext.Provider
          value={{
            isOpenModal,
            openModal,
            setMessage,
            dialogResult,
            setOpenModal,
          }}
        >
          <main>
            <Switch>
              {publicRoutes.map((item, index) => (
                <Route
                  key={index}
                  path={item.path}
                  component={item.component}
                  exact
                />
              ))}
              {admin &&
                myRoom.map((item, index) => (
                  <Route
                    key={index + 100}
                    path={item.path}
                    component={item.component}
                  />
                ))}
              <Redirect to='/' />
            </Switch>
          </main>
        </DeviceContext.Provider>
      </BasketContext.Provider>
      <Modal isOpen={isOpenModal} setOpenModal={setOpenModal}>
        {typeOfModal === "login" && <Login setOpenModal={setOpenModal} />}
        {typeOfModal === "mess" && (
          <Message
            title={message.title}
            text={message.text}
            ok={message.ok}
            cancel={message.cancel}
            closeModal={closeModal}
          />
        )}
        {typeOfModal === "device" && <DeviceInfo setOpenModal={setOpenModal} />}
      </Modal>
    </div>
  );
});

export default App;
