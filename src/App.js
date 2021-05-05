import "./App.scss";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import routes from "./routes";
import Header from "./components/header/header";
import { DeviceContext, devices, GoodsContext } from "./store/store";

function App() {
  const [goods, setGoods] = useState([]);
  const addToCart = (idDevice) => {
    const enableInBasket = goods.some((item) => item.id === idDevice);
    if (!enableInBasket) {
      setGoods([...goods, Object.assign({}, devices[idDevice], { count: 1 })]);
    } else {
      alert("Этот товар уже в корзине!");
    }
  };
  return (
    <Router>
      <div className='App'>
        <GoodsContext.Provider value={[goods, setGoods]}>
          <Header />
          <DeviceContext.Provider value={{ devices, addToCart }}>
            <main>
              <Switch>
                {routes.map((item, index) => (
                  <Route
                    key={index}
                    path={item.path}
                    component={item.component}
                    exact
                  />
                ))}
                <Redirect to='/' />
              </Switch>
            </main>
          </DeviceContext.Provider>
        </GoodsContext.Provider>
      </div>
    </Router>
  );
}

export default App;
