import React from "react";
import "../App.css";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePopup from "./DeletePopup";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRouteElement from "./ProtectedRoute";
import * as auth from "../utils/Auth";
import InfoTooltip from "./InfoTooltip";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = React.useState({});

  const [isInfoTooltip, setInfoToolTipPopup] = React.useState(false);

  const [isSuccessInfoTooltipStatus, setSuccessInfoTooltipStatus] =
    React.useState(false);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [cards, setCards] = React.useState([]);

  const [currentUser, setCurrentUser] = React.useState({});

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [cardToDelete, setCardToDelete] = React.useState(null);

  function handleToolTipOpen() {
    setInfoToolTipPopup(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAppPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleDeleteCard(card) {
    setCardToDelete(card);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setCardToDelete(null);
    setInfoToolTipPopup(false);
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            console.log(data);
            setUserEmail({ email: data.data.email });
            console.log(userEmail);
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  function registerSubmit(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        setSuccessInfoTooltipStatus(true);
        handleToolTipOpen();
        navigate("/login");
      })
      .catch((err) => {
        console.error(err);
        setSuccessInfoTooltipStatus(false);
        handleToolTipOpen();
      });
  }

  function loginSubmit(email, password) {
    auth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setLoggedIn(true);
        setSuccessInfoTooltipStatus(true);
        setUserEmail({ email: email });
        navigate("/");
        handleToolTipOpen();
      })
      .catch((err) => {
        console.error(err);
        setSuccessInfoTooltipStatus(false);
        handleToolTipOpen();
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleCardDelete(id) {
    api
      .deleteCard(id)
      .then((card) => {
        setCards((cards) => cards.filter((c) => c._id !== id));
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleSubmitUserForm(obj) {
    api
      .setNewUserInfo(obj)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    navigate("/login");
    setLoggedIn(false);
  }

  function handleAvatarUserForm(avatar) {
    api
      .setNewAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    Promise.all([api.getUserFromServer(), api.getInitialCards()])
      .then(([user, cardsList]) => {
        setCards(cardsList);
        setCurrentUser(user);
        console.log(loggedIn);
      })
      .catch((err) => console.error(err));
  }, [loggedIn ? true : false]);
  console.log(currentUser);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header
          email={userEmail.email}
          signOut={handleSignOut}
          loggedIn={loggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                logged={loggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAppPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                handleCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                onDelete={handleDeleteCard}
              />
            }
          />
          <Route
            path="/register"
            element={<Register onSubmit={registerSubmit} />}
          />
          <Route path="/login" element={<Login onSubmit={loginSubmit} />} />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
        {loggedIn ? <Footer /> : ""}
        <EditProfilePopup
          onSubmit={handleSubmitUserForm}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          onSubmit={handleAvatarUserForm}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />
        <AddPlacePopup
          onSubmit={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <DeletePopup
          onClose={closeAllPopups}
          card={cardToDelete}
          onDelete={handleCardDelete}
        />
        <InfoTooltip
          isOpen={isInfoTooltip}
          onClose={closeAllPopups}
          isSuccess={isSuccessInfoTooltipStatus}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
