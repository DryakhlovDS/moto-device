import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import routes from "./routes";
import Header from "./components/header/header";
import { DeviceContext, devices } from "./store/store";

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <DeviceContext.Provider value={devices}>
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
      </div>
    </Router>
  );
}

export default App;
