import React from "react";

export default function DeletePopup(props) {
  function handleDelete() {
    props.onDelete(props.card._id);
  }

  return (
    <div
      className={`popup popup_type_delete-card ${
        props.card ? `popup_active` : ""
      }`}
    >
      <div className="popup__container popup__container_type-delete">
        <h2 className="popup__title popup__title_type_delete-card">
          Вы уверены ?
        </h2>
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <button
          className="popup__submit popup__submit_type-confirm"
          type="button"
          onClick={handleDelete}
        >
          Да
        </button>
      </div>
    </div>
  );
}
