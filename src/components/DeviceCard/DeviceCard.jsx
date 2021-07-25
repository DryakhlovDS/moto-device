import "./DeviceCard.scss";

const DeviceCard = ({ device, setOpenModal }) => {
  return (
    <div className='show-card'>
      <h3>{device.name}</h3>
      <img
        src={process.env.REACT_APP_API_URL + "/" + device.img}
        alt='device'
      />
      <p>Стоимость: {device.price} руб.</p>
      <p>Полное описание: {device.descriptionFull}</p>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div>Свойства:</div>
        <div style={{ marginLeft: 40 }}>
          {device.props &&
            device.props.map((prop) => (
              <p>
                {prop.title} : {prop.prop}
              </p>
            ))}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div>Детали: </div>{" "}
        <div style={{ marginLeft: 40 }}>
          {device.pki &&
            device.pki.map((elem) => (
              <p>
                {elem.name} : {elem.value}
              </p>
            ))}
        </div>
      </div>
      {/* <button onClick={() => setOpenModal(false)}>Закрыть</button> */}
    </div>
  );
};

export default DeviceCard;
