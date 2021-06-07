import "./cardHorizon.scss";

function CardHorizon({ children, item }) {
  return (
    <div className='card-h'>
      <div className='card-h__image'>
        <img
          src={process.env.REACT_APP_API_URL + "/" + item.img}
          alt='device'
        />
      </div>
      <div className='card-h__header'>
        <h3 className='card-h__title'>{item.name}</h3>
      </div>
      <div className='card-h__body'>
        <p>{item.descriptionShort}</p>
        <p>В наличии: {item.inStock} шт.</p>
        <p> Стоимость: {item.price} руб.</p>
      </div>
      <div className='card-h__footer'>{children}</div>
    </div>
  );
}

export default CardHorizon;
