import "./deviceInfo.scss";
import {
  createDevice,
  fetchOneDevice,
  updateDevice,
} from "../../http/deviceAPI";
import { fetchAllPki } from "../../http/pkiAPI";
import { fetchAllBrands } from "../../http/brandAPI";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
// import { PkiContext } from "../../store/PkiStore";
import { observer } from "mobx-react-lite";

const DeviceInfo = observer(() => {
  const [device, setDevice] = useState({});
  const [props, setProps] = useState([]);
  const [devicePki, setDevicePki] = useState([]);
  const { id } = useParams();
  const [allPki, setAllPki] = useState({});
  const [allBrands, setAllBrands] = useState({});
  let [inStockMax, setInStockMax] = useState(0);
  const [morePhoto, setMorePhoto] = useState(false);

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
      setAllPki(fetchPki);
    });
    fetchAllBrands().then((data) => {
      setAllBrands(data);
    });
  }, []);

  useEffect(() => {
    computedInStock();
  }, [devicePki, allPki]);

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
    setDevicePki([
      ...devicePki,
      { name: Object.keys(allPki)[0], value: "0", id: new Date() },
    ]);
  };

  const deletePki = (prop_id) => {
    setDevicePki(devicePki.filter((item) => item.id !== prop_id));
  };

  const computedInStock = () => {
    if (devicePki.length) {
      const arr = devicePki.map((devPki) => {
        const pkiValue = allPki[devPki.name] ? allPki[devPki.name].free : 0;
        return Math.floor(pkiValue / devPki.value);
      });
      setInStockMax(Math.min(...arr));
    } else {
      setInStockMax(0);
    }
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
            <label>????????????????????????:</label>
            <input
              type='text'
              id='name'
              name='name'
              defaultValue={device.name}
            />
          </div>
          <div className='info-device__group'>
            <label>??????????????????:</label>
            <input
              type='number'
              id='price'
              name='price'
              defaultValue={device.price}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>????????????????</legend>
          <label>????????????:</label>
          <textarea
            type='text'
            rows='4'
            id='descriptionFull'
            name='descriptionFull'
            defaultValue={device.descriptionFull}
          />

          <label>??????????????:</label>
          <textarea
            type='text'
            rows='2'
            id='descriptionShort'
            name='descriptionShort'
            defaultValue={device.descriptionShort}
          />
        </fieldset>
        <fieldset>
          <label>??????????????????????:</label>
          <input type='file' id='image' name='image' />
          {morePhoto && (
            <input type='file' id='photos' name='photos' multiple />
          )}
          <div className='propsline' key={id}>
            <button type='button' onClick={() => setMorePhoto(!morePhoto)}>
              {morePhoto ? "????????????" : "????????????"} ????????
            </button>
          </div>
        </fieldset>
        <fieldset>
          <legend>????????????????????????????</legend>
          <button type='button' onClick={addProp}>
            ???????????????? ????????????????????????????
          </button>
          {props.map(({ title, prop, id }) => {
            return (
              <div className='propsline' key={id}>
                <div className='propsline__group'>
                  <label>????????????????????????????:</label>
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
                  <label>????????????????:</label>
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
                  ??????????????
                </button>
              </div>
            );
          })}
        </fieldset>
        <fieldset>
          <legend>??????????????????????????</legend>
          <button type='button' onClick={addPki}>
            ???????????????? ??????????????????????????
          </button>
          {devicePki.map(({ name, value, id }) => {
            return (
              <div className='propsline' key={`${name}${id}`}>
                <div className='propsline__group'>
                  <label>??????????????????????????:</label>
                  <select
                    name='pki_name'
                    onChange={(e) => changePki("name", e.target.value, id)}
                  >
                    {Object.values(allPki).map((item) => {
                      return (
                        <option
                          value={item.name}
                          selected={item.name === name}
                          key={item.name + item.id}
                        >
                          {item.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className='propsline__group'>
                  <label>????????????????????:</label>
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
                  ??????????????
                </button>
              </div>
            );
          })}
        </fieldset>
        <fieldset>
          <legend>??????????</legend>
          <div className='propsline'>
            <div className='propsline__group'>
              <select name='brandId'>
                {allBrands.length &&
                  allBrands.map((item) => {
                    return (
                      <option
                        value={item.id}
                        selected={item.id === device.brandId}
                        key={item.name + item.id}
                      >
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div className='info-device__group'>
            <label>?? ??????????????:</label>
            <input
              type='number'
              id='inStock'
              name='inStock'
              defaultValue={device.inStock}
              max={device.inStock > inStockMax ? device.inStock : inStockMax}
              min='0'
            />
          </div>
          <div className='info-device__group'>
            <p>
              ???? ?????????? {inStockMax === Infinity ? "??????????????????????????" : inStockMax}
            </p>
          </div>
        </fieldset>
        <button type='submit'>??????????????????</button>
      </form>
    </div>
  );
});

export default DeviceInfo;
