import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen && `popup_active`
      }`}
    >
      <div
        className={`popup__container ${
          props.isAvatarContainer ? `popup__container_${props.container}` : ""
        }`}
      >
        <h2 className="popup__title">{props.title}</h2>
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <form
          className={`popup__form popup__form_type${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="popup__submit" type="submit">
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
