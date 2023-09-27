import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(card) {
  const UserContext = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === UserContext._id;
  const cardId = card._id;
  const isLiked = card.likes.some((i) => i._id === UserContext._id);
  function handleClick() {
    card.onCardClick(card);
  }
  function handleLike() {
    card.onCardLike(card);
  }

  function handleDeleteCard() {
    card.onDelete(card);
  }

  return (
    <article className="grid-net__item">
      <div className="grid-net__item-image-box">
        <img
          src={card.link}
          className="grid-net__item-image"
          alt={card.name}
          onClick={handleClick}
        />
      </div>
      {isOwn && (
        <button
          className="grid-net__item-button-delete"
          onClick={handleDeleteCard}
          type="delete"
        ></button>
      )}
      <div className="grid-net__item-box">
        <h2 className="grid-net__item-title">{card.name}</h2>
        <div className="grid-net__item-user-box">
          <button
            className={`grid-net__item-button ${
              isLiked && `grid-net__item-button_active`
            }`}
            onClick={handleLike}
          ></button>
          <span className="grid-net__item-number">{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
