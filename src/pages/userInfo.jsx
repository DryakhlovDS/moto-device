import "./userInfo.scss";
import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../store/UserStore";
import { fetchUserInfo, updateUserInfo } from "../http/userAPI";
import { DeviceContext } from "../store/store";

const UserInfo = () => {
  const { user } = useContext(UserContext);
  const { openModal, setMessage } = useContext(DeviceContext);
  const { nickname } = useParams();
  const [userInfo, setUserInfo] = useState({ adress: {} });

  useEffect(() => {
    if (nickname === user.user.nickname)
      fetchUserInfo(user.user.id).then((res) =>
        setUserInfo({
          ...userInfo,
          ...res,
          nickname: user.user.nickname,
          email: user.user.email,
        })
      );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = new FormData(e.target);
    const res = await updateUserInfo(user.user.id, values);
    if (res.id || res.length) {
      setMessage({
        title: "Успешно",
        text: `Ваши данные обновлены`,
        cancel: "",
        ok: "OK",
      });
      openModal("mess");
    }
  };

  return (
    <section className='user-page'>
      <div className='container'>
        <div className='user-page__inner'>
          <h2>{user.user.email}</h2>
          <form className='user-page__form' onSubmit={handleSubmit}>
            <fieldset>
              <legend>ФИО</legend>
              <div className='user-page__group'>
                <label>Фамилия:</label>
                <input
                  type='text'
                  name='secondName'
                  defaultValue={userInfo.secondName || ""}
                />
              </div>
              <div className='user-page__group'>
                <label>Имя и Отчество:</label>
                <input
                  type='text'
                  name='firstName'
                  defaultValue={userInfo.firstName || ""}
                />
              </div>
              <div className='user-page__group'>
                <label>Никнейим:</label>
                <input
                  type='text'
                  name='nickname'
                  defaultValue={user.user.nickname || ""}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Адрес</legend>
              <div className='user-page__group'>
                <label>Регион:</label>
                <input
                  type='text'
                  name='region'
                  defaultValue={userInfo.adress.region || ""}
                />
              </div>
              <div className='user-page__group'>
                <label>Населенный пункт:</label>
                <input
                  type='text'
                  name='city'
                  defaultValue={userInfo.adress.city || ""}
                />
              </div>
              <div className='user-page__group'>
                <label>Адрес:</label>
                <input
                  type='text'
                  name='street'
                  defaultValue={userInfo.adress.street || ""}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Контактные данные</legend>
              <div className='user-page__group'>
                <label>Email:</label>
                <input
                  type='email'
                  name='email'
                  defaultValue={user.user.email}
                />
              </div>
              <div className='user-page__group'>
                <label>Телефон:</label>
                <input type='text' name='phone' defaultValue={userInfo.phone} />
              </div>
            </fieldset>
            <button type='submit'>Save</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
