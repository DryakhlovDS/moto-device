import { useState, useContext } from "react";
import { login, registration } from "../../http/userAPI";
import { UserContext } from "../../store/UserStore";
import "./login.scss";

function Login({ setOpenModal }) {
  let [auth, setAuth] = useState("login");
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  let [isValidPass, setValid] = useState(false);
  const { user } = useContext(UserContext);
  const [errorStr, setErrorStr] = useState("");

  const changeForm = (e) => {
    e.preventDefault();
    auth === "login" ? setAuth("reg") : setAuth("login");
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      let res;

      if (auth === "login") {
        res = await login(email, pass);
      } else {
        if (isValidPass) res = await registration(email, pass);
      }
      console.log("res:", res.message);
      if (res) {
        e.target.reset();
        user.setUser(res);
        user.setIsAuth(true);
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error.response.status);
      console.log(error.response.data.message);
      setErrorStr(error.response.data.message);
    }
  };
  return (
    <>
      <h3>{auth === "login" ? "Войти" : "Зарегистрироваться"}</h3>
      <form id='auth' name='auth' className='auth' onSubmit={signIn}>
        <fieldset>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            required
            name='email'
            onBlur={(e) => setEmail(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor='pass'>Password:</label>
          <input
            type='password'
            id='pass'
            required
            name='password'
            onBlur={(e) => setPass(e.target.value)}
          />
        </fieldset>
        {auth === "reg" && (
          <fieldset>
            <label htmlFor='confirmPass'>Confirm password:</label>
            <input
              type='password'
              id='confirmPass'
              name='confirmPass'
              onBlur={(e) => setValid(pass === e.target.value)}
            />
            {!isValidPass && pass && (
              <p className='auth__helptext'>Пароль не совпадает</p>
            )}
          </fieldset>
        )}
        {errorStr && <p>{errorStr}</p>}
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
