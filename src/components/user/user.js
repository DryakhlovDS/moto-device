import { useContext } from "react";
import { UserContext } from "../../store/UserStore";
import { Link } from "react-router-dom";
import "./user.scss";

function User() {
  const { user } = useContext(UserContext);
  const isAdmin = user.isAdmin;

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem("token");
  };
  return (
    <div className='user'>
      <p className='user__name'>{user.user.email}</p>
      {isAdmin && (
        <Link className='user__link' to='/lk'>
          ЛК
        </Link>
      )}
      <button className='user__logout' onClick={logOut}>
        Выйти
      </button>
    </div>
  );
}

export default User;
