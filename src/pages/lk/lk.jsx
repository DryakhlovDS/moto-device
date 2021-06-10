import "./lk.scss";
import { myRoom } from "../../routes";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import PkiStore, { PkiContext } from "../../store/PkiStore";

function Lk() {
  let { path } = useRouteMatch();
  return (
    <section className='my-room'>
      <div className='container'>
        <h2 className='my-room__title'>Личный кабинет</h2>
        <div className='my-room__inner'>
          <PkiContext.Provider value={{ basket: new PkiStore() }}>
            <Switch>
              <Route exact path={path}>
                <MainLk />
              </Route>
              {myRoom[0].routes.map((item) => (
                <Route
                  path={item.path}
                  component={item.component}
                  key={item.path}
                />
              ))}
            </Switch>
          </PkiContext.Provider>
        </div>
      </div>
    </section>
  );
}

export default Lk;

function MainLk() {
  let { url } = useRouteMatch();
  return (
    <>
      <h4>Выберите один из пунктов</h4>
      <ul>
        <li>
          <Link to={`${url}/device`}>Устройства</Link>
        </li>
        <li>
          <Link to={`${url}/pki`}>ПКИ</Link>
        </li>
        <li>
          <Link to={`${url}/graph`}>Графики</Link>
        </li>
      </ul>
    </>
  );
}
