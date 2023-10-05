import React from "react";
import logo from "../images/Vector.svg";
import { Link, Routes, Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="логотип" />
      <Routes>
        <Route
          path={"/login"}
          element={
            <Link className="header__link" to={"/register"}>
              Регистрация
            </Link>
          }
        />
        <Route
          path={"/register"}
          element={
            <Link className="header__link" to={"/login"}>
              Войти
            </Link>
          }
        />
        <Route
          path={"/"}
          element={
            <div className={`header__box`}>
              <p className={`header__email`}>{props.email}</p>
              <button className={`header__button`} onClick={props.signOut}>
                Выйти
              </button>
            </div>
          }
        ></Route>
      </Routes>
    </header>
  );
}

export default Header;
