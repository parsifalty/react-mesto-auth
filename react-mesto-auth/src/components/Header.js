import React from "react";
import logo from "../images/Vector.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип" />
      <Link to={props.path} className={"header__link"}>
        {props.text}
      </Link>
      {props.loggedIn && (
        <div className={`header__box`}>
          <p className={`header__email`}>{props.email}</p>
          <button className={`header__button`} onClick={props.SignOut}>
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
