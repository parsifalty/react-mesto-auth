import React from "react";
import FailSvg from "../images/Fail.svg";
import SuccessSvg from "../images/Success.svg";
import CloseButton from "../images/CloseIcon.svg";

export default function InfoTooltip(props) {
  return (
    <div
      className={`popup popup_type_tooltip ${props.isOpen && `popup_active`}`}
    >
      <div className={`popup__container popup__container_type-infoToolTip`}>
        {props.isSuccess ? (
          <>
            <img
              className={`popup__tooltip_image`}
              src={`${SuccessSvg}`}
              alt={`Succes`}
            />
            <p className={`popup__tooltip_text`}>
              Вы успешно зарегестрировались!
            </p>
          </>
        ) : (
          <>
            <img
              className={`popup__tooltip_image`}
              src={`${FailSvg}`}
              alt={`Fail`}
            />
            <p className={`popup__tooltip_text`}>Что-то пошло не так</p>
          </>
        )}
        <img
          src={`${CloseButton}`}
          alt={`Кнопка закрытия`}
          className={`popup__close-button`}
          onClick={props.onClose}
        />
      </div>
    </div>
  );
}
