import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeletePopup(props) {
  function handleDelete() {
    props.onDelete(props.card._id);
  }

  return (
    <PopupWithForm
      name={"delete-card"}
      isOpen={props.card}
      title={"Вы уверены?"}
      button={"Да"}
      container={"delete"}
      onClose={props.onClose}
      onDelete={handleDelete}
      buttonConfirm={"confirm"}
      popupTitle={"_delete-card"}
      delete
    />
  );
}
