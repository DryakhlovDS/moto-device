import "./modal.scss";

export default function Modal({ children, isOpen, setOpenModal }) {
  return (
    <div className={isOpen === true ? "modal modal_active" : "modal"}>
      <div className='modal__container'>
        {children}
        <button
          className='modal__close'
          type='button'
          onClick={() => setOpenModal(false)}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
