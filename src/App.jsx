import "./App.scss";
import { useContext, useState, useEffect } from "react";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { myRoom, publicRoutes } from "./routes";
import Header from "./components/header/header";
import { DeviceContext, devices, GoodsContext } from "./store/store";
import { UserContext } from "./store/UserStore";
import Modal from "./components/modal/modal.jsx";
import Login from "./components/Login/Login.jsx";
import Message from "./components/Message/Message.jsx";
import DeviceInfo from "./components/DeviceInfo/deviceInfo";
import { observer } from "mobx-react-lite";
import { check } from "./http/userAPI";

const App = observer(() => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    check().then((data) => {
      user.setUser(data);
      user.setIsAuth(true);
    });
  }, []);

  const [goods, setGoods] = useState([]);
  let [isOpenModal, setOpenModal] = useState(false);
  let [typeOfModal, setTypeOfModal] = useState("");
  let [message, setMessage] = useState({});
  let history = useHistory();

  const admin = user.isAdmin;
  const openModal = (type) => {
    setTypeOfModal(type);
    setOpenModal(true);
  };

  const closeModal = (value) => {
    setOpenModal(false);
    Object.assign(message, { result: value });
    setMessage(message);
  };

  const addToCart = (idDevice) => {
    const enableInBasket = goods.some((item) => item.id === idDevice);
    if (!enableInBasket) {
      setGoods([...goods, Object.assign({}, devices[idDevice], { count: 1 })]);
    } else {
      setMessage({
        title: "Внимание!",
        text: "Этот товар уже в корзине!",
        cancel: "",
        ok: "Ok",
      });
      openModal("mess");
    }
  };

  const buyNow = (idDevice) => {
    addToCart(idDevice);
    history.push("/basket");
  };

  return (
    <div className='App'>
      <GoodsContext.Provider value={[goods, setGoods]}>
        <Header openLogin={openModal} />
        <DeviceContext.Provider
          value={{ devices, addToCart, buyNow, openModal }}
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
      </GoodsContext.Provider>
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
        {typeOfModal === "device" && <DeviceInfo />}
      </Modal>
    </div>
  );
});

export default App;
