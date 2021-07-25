import { Link, useHistory } from "react-router-dom";
import { DeviceContext } from "../../store/store";
import { useContext, useEffect, useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { fetchAllTypes, deleteType, updateType } from "../../http/typeAPI";
import { observer } from "mobx-react-lite";

const Type = observer(() => {
  const { openModal, setMessage, dialogResult } = useContext(DeviceContext);
  const [selected, setSelected] = useState("");
  const [typeArray, setTypeArray] = useState([]);
  let history = useHistory();

  useEffect(() => {
    fetchAllTypes().then((data) => {
      data.forEach((item) => (item.disabled = true));
      setTypeArray(data);
    });
  }, []);

  useEffect(() => {
    if (dialogResult === "Удалить") {
      deleteType(selected).then((res) => {
        if (res === 200) {
          setMessage({
            title: "Успешно",
            text: `Тип удалён`,
            cancel: "",
            ok: "OK",
          });
          setTypeArray(typeArray.filter((item) => item.id !== selected));
          openModal("mess");
        }
      });
    }
  }, [dialogResult]);

  const addType = () => {
    setTypeArray([...typeArray, { name: "", id: new Date(), disabled: false }]);
  };

  const editType = (id) => {
    const editType = typeArray.map((item) =>
      item.id === id ? { ...item, disabled: false } : item
    );
    setTypeArray(editType);
  };

  const handleSaveType = async (e) => {
    e.preventDefault();

    const typeToSave = typeArray
      .filter((type) => type.name !== "")
      .filter((type) => type.disabled === false);
    let saveType = new FormData();
    saveType.append("data", JSON.stringify(typeToSave));
    await updateType(saveType);
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
    setTypeArray(
      typeArray.map((item) =>
        item.id === prop_id ? { ...item, [key]: value } : item
      )
    );
  };

  return (
    <div className='stock'>
      <h4 className='stock__title'>Тип модели</h4>
      <Link to='/lk'>Назад</Link>
      <div className='stock__pki'>
        <form className='table' onSubmit={handleSaveType}>
          <fieldset>
            <legend>Модели</legend>
            <ol>
              {typeArray.map((item) => (
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

                    <button type='button' onClick={() => editType(item.id)}>
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
              <button className='stock__btn' type='button' onClick={addType}>
                Добавить модель
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

export default Type;
