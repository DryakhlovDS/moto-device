import "../../pages/userInfo.scss";
import { updateUserInfo } from "../../http/userAPI";

const UserInfoCard = ({ userInfo, closeModal, showOnly }) => {
  let { info, user } = userInfo;

  if (showOnly) {
    user = userInfo.showUser;
    info = user.info;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = new FormData(e.target);
    const res = await updateUserInfo(user.id, values);
    if (res.length || res.id) closeModal("Оформить");
  };

  if (!info.adress) {
    info.adress = { city: "", region: "", adress: "" };
  }
  return (
    <form className='user-page__form' onSubmit={handleSubmit}>
      <fieldset>
        <legend>ФИО</legend>
        <div className='user-page__group'>
          <label>Фамилия:</label>
          <input
            type='text'
            name='secondName'
            defaultValue={info.secondName || ""}
            required
            disabled={showOnly}
          />
        </div>
        <div className='user-page__group'>
          <label>Имя и Отчество:</label>
          <input
            type='text'
            name='firstName'
            defaultValue={info.firstName || ""}
            required
            disabled={showOnly}
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
            defaultValue={info.adress.region || ""}
            required
            disabled={showOnly}
          />
        </div>
        <div className='user-page__group'>
          <label>Населенный пункт:</label>
          <input
            type='text'
            name='city'
            defaultValue={info.adress.city || ""}
            required
            disabled={showOnly}
          />
        </div>
        <div className='user-page__group'>
          <label>Адрес:</label>
          <input
            type='text'
            name='street'
            defaultValue={info.adress.street || ""}
            required
            disabled={showOnly}
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
            defaultValue={user.email}
            disabled={showOnly}
          />
        </div>
        <div className='user-page__group'>
          <label>Телефон:</label>
          <input
            type='text'
            name='phone'
            defaultValue={info.phone || "+7"}
            required
            disabled={showOnly}
          />
        </div>
      </fieldset>
      {!showOnly && <button type='submit'>Подтвердить</button>}
    </form>
  );
};

export default UserInfoCard;
