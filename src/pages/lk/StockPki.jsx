import { Link, useHistory } from "react-router-dom";
import { DeviceContext } from "../../store/store";
import { useContext, useEffect, useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { fetchAllPki, deletePki, updatePki } from "../../http/pkiAPI";
import { observer } from "mobx-react-lite";

const StockPki = observer(() => {
  const { openModal, setMessage, dialogResult } = useContext(DeviceContext);
  const [selected, setSelected] = useState("");
  const [pkiArray, setPkiArray] = useState([]);
  let history = useHistory();

  useEffect(() => {
    fetchAllPki().then((data) => {
      data.forEach((item) => (item.disabled = true));
      setPkiArray(data);
    });
  }, []);

  useEffect(() => {
    if (dialogResult === "Удалить") {
      deletePki(selected).then((res) => {
        if (res === 200) {
          setMessage({
            title: "Успешно",
            text: `Комплектующее удалено`,
            cancel: "",
            ok: "OK",
          });
          setPkiArray(pkiArray.filter((item) => item.id !== selected));
          openModal("mess");
        }
      });
    }
  }, [dialogResult]);

  const addPki = () => {
    setPkiArray([
      ...pkiArray,
      { name: "", deliver: "", value: 0, id: new Date() },
    ]);
  };

  const editPki = (id) => {
    const editPki = pkiArray.map((item) =>
      item.id === id ? { ...item, disabled: false } : item
    );
    setPkiArray(editPki);
  };

  const handleSavePki = async (e) => {
    e.preventDefault();

    const pkiToSave = pkiArray.filter((pki) => pki.name !== "");
    let savePki = new FormData();
    savePki.append("data", JSON.stringify(pkiToSave));
    await updatePki(savePki);
    e.target.reset();
    history.push("/lk");
  };

  const openDialogToDelete = (id, name) => {
    setMessage({
      title: "Внимание!",
      text: `Вы действительно хотите удалить ${name} ?`,
      cancel: "Отмена",
      ok: "Удалить",
    });
    setSelected(id);
    openModal("mess");
  };

  const changeProps = (key, value, prop_id) => {
    setPkiArray(
      pkiArray.map((item) =>
        item.id === prop_id ? { ...item, [key]: value } : item
      )
    );
  };

  return (
    <div className='stock'>
      <h4 className='stock__title'>ПКИ</h4>
      <Link to='/lk'>Назад</Link>
      <div className='stock__pki'>
        <form className='table' onSubmit={handleSavePki}>
          <fieldset>
            <legend>Комплектующие</legend>
            <div className='table__head'>
              <p>№</p>
              <p>Наименование</p>
              <p>Срок доставки, дней</p>
              <p>Количество, шт</p>
            </div>
            <ol>
              {pkiArray.map((item) => (
                <li key={item.name + item.id}>
                  <div className='table__row'>
                    <input
                      type='text'
                      name='name'
                      defaultValue={item.name}
                      onBlur={(e) => {
                        const val = e.target.value.trim();
                        e.target.value = val;
                        changeProps("name", val, item.id);
                      }}
                      disabled={item.disabled}
                    />
                    <input
                      type='text'
                      name='deliver'
                      defaultValue={item.deliver}
                      onBlur={(e) => {
                        const val = e.target.value.trim();
                        e.target.value = val;
                        changeProps("deliver", val, item.id);
                      }}
                      disabled={item.disabled}
                    />
                    <input
                      type='number'
                      name='value'
                      defaultValue={item.value}
                      min='0'
                      onBlur={(e) => {
                        const val = parseInt(e.target.value, 10);
                        e.target.value = val;
                        changeProps("value", val, item.id);
                      }}
                      disabled={item.disabled}
                    />
                    <button type='button' onClick={() => editPki(item.id)}>
                      Редактировать
                    </button>
                    <DeleteForeverIcon
                      className='icon-button'
                      onClick={() => openDialogToDelete(item.id, item.name)}
                    />
                  </div>
                </li>
              ))}
            </ol>
            <div className='table__add'>
              <button className='stock__btn' type='button' onClick={addPki}>
                Добавить комплектующее
              </button>
            </div>
          </fieldset>
          <div className='table__save'>
            <button className='stock__btn' type='submit'>
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default StockPki;
