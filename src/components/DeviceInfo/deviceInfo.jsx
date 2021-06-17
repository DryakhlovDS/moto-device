import "./deviceInfo.scss";
import {
  createDevice,
  fetchOneDevice,
  updateDevice,
} from "../../http/deviceAPI";
import { fetchAllPki } from "../../http/pkiAPI";
import { useEffect, useState, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PkiContext } from "../../store/PkiStore";
import { observer } from "mobx-react-lite";

const DeviceInfo = observer(() => {
  const [device, setDevice] = useState({});
  const [props, setProps] = useState([]);
  const [devicePki, setDevicePki] = useState([]);
  const { id } = useParams();
  const { pki } = useContext(PkiContext);
  const allPki = pki.allPki;

  useEffect(() => {
    if (id) {
      fetchOneDevice(id).then((data) => {
        setDevice(data);
        data.props.length && setProps(data.props);
        data.pki.length && setDevicePki(data.pki);
      });
    }
    fetchAllPki().then((data) => {
      const fetchPki = data.reduce((acc, item) => {
        acc[item.name] = item;
        return acc;
      }, {});
      pki.setAllPki(fetchPki);
    });
  }, []);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDevice = new FormData(e.target);
    props.length && newDevice.append("props", JSON.stringify(props));
    devicePki.length && newDevice.append("pki", JSON.stringify(devicePki));
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
    setProps([...props, { title: "", prop: "", id: new Date() }]);
  };

  const deleteProp = (prop_id) => {
    setProps(props.filter((item) => item.id !== prop_id));
  };

  const changeProps = (key, value, prop_id) => {
    setProps(
      props.map((item) =>
        item.id === prop_id ? { ...item, [key]: value } : item
      )
    );
  };

  const changePki = (key, value, prop_id) => {
    setDevicePki(
      devicePki.map((item) =>
        item.id === prop_id ? { ...item, [key]: value } : item
      )
    );
  };

  const addPki = () => {
    setDevicePki([...devicePki, { name: "", value: "", id: new Date() }]);
  };

  const deletePki = (prop_id) => {
    setDevicePki(devicePki.filter((item) => item.id !== prop_id));
  };

  return (
    <div className='info-device'>
      <form
        name='deviceInfo'
        className='info-device__form'
        onSubmit={handleSubmit}
      >
        <fieldset>
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
          {props.map(({ title, prop, id }) => {
            return (
              <div className='propsline' key={id}>
                <div className='propsline__group'>
                  <label>Характеристика:</label>
                  <input
                    type='text'
                    name='title'
                    defaultValue={title}
                    onBlur={(e) => {
                      const val = e.target.value.trim();
                      changeProps("title", val, id);
                      e.target.value = val;
                    }}
                  />
                </div>
                <div className='propsline__group'>
                  <label>Значение:</label>
                  <input
                    type='text'
                    name='prop'
                    defaultValue={prop}
                    onBlur={(e) => {
                      const val = e.target.value.trim();
                      e.target.value = val;
                      changeProps("prop", val, id);
                    }}
                  />
                </div>
                <button
                  className='propsline__btn'
                  onClick={() => deleteProp(id)}
                  type='button'
                >
                  Удалить
                </button>
              </div>
            );
          })}
        </fieldset>
        <fieldset>
          <legend>Комплектующие</legend>
          <button type='button' onClick={addPki}>
            Добавить компелктующее
          </button>
          {devicePki.map(({ name, value, id }) => {
            return (
              <div className='propsline' key={`${name}${id}`}>
                <div className='propsline__group'>
                  <label>Комплектующее:</label>
                  <select
                    name='pki_name'
                    defaultValue='Выберите пункт меню'
                    onChange={(e) => changePki("name", e.target.value, id)}
                  >
                    {Object.keys(pki.allPki).map((item) => {
                      return (
                        <option value={item} selected={item === name}>
                          {item}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='propsline__group'>
                  <label>Количество:</label>
                  <input
                    type='number'
                    min='1'
                    name='value'
                    defaultValue={value}
                    onBlur={(e) => {
                      const val = e.target.value.trim();
                      e.target.value = val;
                      changePki("value", val, id);
                    }}
                  />
                </div>
                <button
                  className='propsline__btn'
                  onClick={() => deletePki(id)}
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
});

export default DeviceInfo;
