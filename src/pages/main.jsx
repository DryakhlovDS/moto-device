import "./main.scss";
import { Link } from "react-router-dom";

function Main() {
  return (
    <section className='main'>
      <div className='container'>
        <div className='main__inner'>
          <h1>Moto-device</h1>
          <h3>Прокачай свой байк!</h3>
          <div className='main__description'>
            <p>
              Краткое описание предлагаемых устройств, их функционал и
              достоинства.
            </p>
            <div className='main__links'>
              <Link to='/shop'>Купить</Link>
              <Link to='/device'>Устройства</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Main;
