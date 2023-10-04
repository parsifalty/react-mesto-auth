import React from "react";
import Header from "./Header";
import UserForm from "./UserForm";

export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function HandleSubmit(e) {
    e.preventDefault();
    props.onSubmit(email, password);
  }

  return (
    <>
      <Header text={"Зарегестрироваться"} path={"/register"} />
      <UserForm
        title={"Вход"}
        button={"Войти"}
        path={"/register"}
        onSubmit={HandleSubmit}
      >
        <input
          className="userForm__input userForm__input_type_username"
          id="userEmail"
          name="userEmail"
          type="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          onChange={handleEmail}
          value={email || ""}
        />
        <input
          className="userForm__input userForm__input_type_password"
          id="password"
          name="password"
          type="text"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="200"
          onChange={handlePassword}
          value={password || ""}
        />
      </UserForm>
    </>
  );
}
