import "./deviceInfo.scss";
import {
  createDevice,
  fetchOneDevice,
  updateDevice,
} from "../../http/deviceAPI";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

function DeviceInfo() {
  const [device, setDevice] = useState({});
  const [props, setProps] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchOneDevice(id).then((data) => {
        setDevice(data);
        setProps(data.props);
      });
    }
  }, []);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDevice = new FormData(e.target);
    newDevice.append("props", JSON.stringify(props));
    try {
      if (id) {
        await updateDevice(id, newDevice);
      } else {
        await createDevice(newDevice);
      }
      // setOpenModal(false);
      e.target.reset();
      history.push("/lk/device");
    } catch (error) {
      console.log(error);
    }
  };

  const addProp = () => {
    setProps([...props, { title: "", prop: "", prop_id: new Date() }]);
  };

  const deleteProp = (prop_id) => {
    setProps(props.filter((item) => item.prop_id !== prop_id));
  };

  const changeProps = (key, value, prop_id) => {
    setProps(
      props.map((item) =>
        item.prop_id === prop_id ? { ...item, [key]: value } : item
      )
    );
  };

  return (
    <div className='info-device'>
      <h3 className='info-device__title'>Добавить устройство</h3>
      <form
        name='deviceInfo'
        className='info-device__form'
        onSubmit={handleSubmit}
      >
        <fieldset>
          {/* <legend>Наименование</legend> */}
          {/* <div className='info-device__group'>
            <label>ID:</label>
            <input type='text' id='device_id' name='device_id' />
          </div> */}
          <div className='info-device__group'>
            <label>Наименование:</label>
            <input
              type='text'
              id='name'
              name='name'
              defaultValue={device.name}
            />
          </div>
          <div className='info-device__group'>
            <label>Стоимость:</label>
            <input
              type='number'
              id='price'
              name='price'
              defaultValue={device.price}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Описание</legend>
          <label>Полное:</label>
          <textarea
            type='text'
            rows='4'
            id='descriptionFull'
            name='descriptionFull'
            defaultValue={device.descriptionFull}
          />

          <label>Краткое:</label>
          <textarea
            type='text'
            rows='2'
            id='descriptionShort'
            name='descriptionShort'
            defaultValue={device.descriptionShort}
          />
        </fieldset>
        <fieldset>
          <label>Изображение:</label>
          <input type='file' id='image' name='image' />
        </fieldset>
        <fieldset>
          <legend>Характеристики</legend>
          <button type='button' onClick={addProp}>
            Добавить характеристику
          </button>
          {props.map(({ title, prop, prop_id }) => {
            return (
              <div className='propsline' key={prop_id}>
                <div className='propsline__group'>
                  <label>Характеристика:</label>
                  <input
                    type='text'
                    name='title'
                    defaultValue={title}
                    onBlur={(e) =>
                      changeProps("title", e.target.value, prop_id)
                    }
                  />
                </div>
                <div className='propsline__group'>
                  <label>Значение:</label>
                  <input
                    type='text'
                    name='prop'
                    defaultValue={prop}
                    onBlur={(e) => changeProps("prop", e.target.value, prop_id)}
                  />
                </div>
                <button
                  className='propsline__btn'
                  onClick={() => deleteProp(prop_id)}
                  type='button'
                >
                  Удалить
                </button>
              </div>
            );
          })}
        </fieldset>

        <button type='submit'>Сохранить</button>
      </form>
    </div>
  );
}

export default DeviceInfo;
