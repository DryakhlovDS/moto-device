import "./deviceInfo.scss";

function DeviceInfo() {
  return (
    <div className='info-device'>
      <h3 className='info-device__title'>Добавить устройство</h3>
      <form name='deviceInfo' className='info-device__form'>
        <fieldset>
          <legend>Наименование</legend>
          <div className='info-device__group'>
            <label>ID:</label>
            <input type='text' id='id' />
          </div>
          <div className='info-device__group'>
            <label>Название:</label>
            <input type='text' id='name' />
          </div>
        </fieldset>
        <fieldset>
          <legend>Описание</legend>
          <label>Полное:</label>
          <textarea type='text' rows='4' id='descriptionFull' />

          <label>Краткое:</label>
          <textarea type='text' rows='2' id='descriptionShort' />
        </fieldset>
        <label>Image:</label>
        <input type='text' id='image' />

        <fieldset>
          <legend>Характеристики</legend>
          <div className='info-device__group'>
            <label>Скорость:</label>
            <input type='text' id='speed' />
          </div>
          <div className='info-device__group'>
            <label>Количество оборотов:</label>
            <input type='text' id='rotate' />
          </div>
        </fieldset>

        <button type='submit'>Сохранить</button>
      </form>
    </div>
  );
}

export default DeviceInfo;
