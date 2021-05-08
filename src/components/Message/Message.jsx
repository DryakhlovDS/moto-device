import "./message.scss";

function Message({ title, text, ok = "", cancel = "Cancel", closeModal }) {
  return (
    <div className='message'>
      <div className='message__header'>
        <h4>{title}</h4>
      </div>
      <div className='message__body'>
        <p>{text}</p>
      </div>

      {ok && (
        <div className='message__footer'>
          <button type='button' onClick={() => closeModal(ok)}>
            {ok}
          </button>
          {cancel && (
            <button type='button' onClick={() => closeModal(cancel)}>
              {cancel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Message;
