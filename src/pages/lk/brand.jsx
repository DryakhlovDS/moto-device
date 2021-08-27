import { Link, useHistory } from "react-router-dom";
import { DeviceContext } from "../../store/store";
import { useContext, useEffect, useState } from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { fetchAllBrands, deleteBrand, updateBrand } from "../../http/brandAPI";
import { observer } from "mobx-react-lite";

const Brand = observer(() => {
  const { openModal, setMessage, dialogResult } = useContext(DeviceContext);
  const [selected, setSelected] = useState("");
  const [brandArray, setBrandArray] = useState([]);
  let history = useHistory();

  useEffect(() => {
    fetchAllBrands().then((data) => {
      data.forEach((item) => (item.disabled = true));
      setBrandArray(data);
    });
  }, []);

  useEffect(() => {
    if (dialogResult === "Удалить") {
      deleteBrand(selected).then((res) => {
        if (res === 200) {
          setMessage({
            title: "Успешно",
            text: `Тип удалён`,
            cancel: "",
            ok: "OK",
          });
          setBrandArray(brandArray.filter((item) => item.id !== selected));
          openModal("mess");
        }
      });
    }
  }, [dialogResult]);

  const addBrand = () => {
    setBrandArray([
      ...brandArray,
      { name: "", id: new Date(), disabled: false },
    ]);
  };

  const editBrand = (id) => {
    const editBrand = brandArray.map((item) =>
      item.id === id ? { ...item, disabled: false } : item
    );
    setBrandArray(editBrand);
  };

  const handleSaveBrand = async (e) => {
    e.preventDefault();

    const brandToSave = brandArray
      .filter((brand) => brand.name !== "")
      .filter((brand) => brand.disabled === false);
    let saveBrand = new FormData();
    saveBrand.append("data", JSON.stringify(brandToSave));
    await updateBrand(saveBrand);
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
    setBrandArray(
      brandArray.map((item) =>
        item.id === prop_id ? { ...item, [key]: value } : item
      )
    );
  };

  return (
    <div className='stock'>
      <h4 className='stock__title'>Марка</h4>
      <Link to='/lk'>Назад</Link>
      <div className='stock__pki'>
        <form className='table' onSubmit={handleSaveBrand}>
          <fieldset>
            <legend>Марки</legend>
            <ol>
              {brandArray.map((item) => (
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

                    <button type='button' onClick={() => editBrand(item.id)}>
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
              <button className='stock__btn' type='button' onClick={addBrand}>
                Добавить марку
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

export default Brand;
