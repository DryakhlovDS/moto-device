import "../../pages/userInfo.scss";
import { updateUserInfo } from "../../http/userAPI";

const UserInfoCard = ({ userInfo, closeModal }) => {
  const { info, user } = userInfo;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = new FormData(e.target);
    const res = await updateUserInfo(user.id, values);
    if (res.length) closeModal("Оформить");
  };

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
          />
        </div>
        <div className='user-page__group'>
          <label>Имя и Отчество:</label>
          <input
            type='text'
            name='firstName'
            defaultValue={info.firstName || ""}
            required
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
          />
        </div>
        <div className='user-page__group'>
          <label>Населенный пункт:</label>
          <input
            type='text'
            name='city'
            defaultValue={info.adress.city || ""}
            required
          />
        </div>
        <div className='user-page__group'>
          <label>Адрес:</label>
          <input
            type='text'
            name='street'
            defaultValue={info.adress.street || ""}
            required
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Контактные данные</legend>
        <div className='user-page__group'>
          <label>Email:</label>
          <input type='email' name='email' defaultValue={user.email} />
        </div>
        <div className='user-page__group'>
          <label>Телефон:</label>
          <input
            type='text'
            name='phone'
            defaultValue={info.phone || "+7"}
            required
          />
        </div>
      </fieldset>
      <button type='submit'>Подтвердить</button>
    </form>
  );
};

export default UserInfoCard;
