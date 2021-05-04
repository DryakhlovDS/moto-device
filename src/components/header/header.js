import "./header.scss";
import User from "../user/user";
import Nav from "../nav/nav";
import { useState } from "react";
import enginIcon from "../../static/v-engine.svg";

export default function Header() {
  let [isLogin, setLogin] = useState(false);
  const enterUser = () => {
    setLogin(true);
  };
  return (
    <header className='header'>
      <div className='container'>
        <div className='header__inner'>
          <div className='header__logo'>
            <Logo />
          </div>
          <div className='header__nav'>
            <Nav />
          </div>
          <div className='header__user'>
            {isLogin && <User />}
            {!isLogin && (
              <button className='header__login' onClick={enterUser}>
                Войти
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <div className='logo'>
      <img src={enginIcon} alt='Engine' />
    </div>
  );
}
