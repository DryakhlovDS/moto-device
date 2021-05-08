import { useState } from "react";
import "./login.scss";

function Login() {
  let [auth, setAuth] = useState("login");
  const changeForm = (e) => {
    e.preventDefault();
    auth === "login" ? setAuth("reg") : setAuth("login");
  };
  return (
    <>
      <h3>{auth === "login" ? "Войти" : "Зарегистрироваться"}</h3>
      <form name='auth' className='auth'>
        <fieldset>
          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' required />
        </fieldset>
        <fieldset>
          <label htmlFor='pass'>Password:</label>
          <input type='password' id='pass' required />
        </fieldset>
        {auth === "reg" && (
          <fieldset>
            <label htmlFor='confirmPass'>Confirm password:</label>
            <input type='password' id='confirmPass' />
          </fieldset>
        )}
        <div className='auth__footer'>
          <>
            {auth === "login" ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            <a href='#noscroll' onClick={changeForm}>
              {auth === "login" ? "Зарегистрируйся" : "Войди"}
            </a>
          </>
          <button type='submit'>
            {auth === "login" ? "Войти" : "Зарегистрироваться"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
