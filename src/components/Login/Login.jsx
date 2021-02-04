import React, { Component } from "react";

import "./Login.scss";
import locro from "./resources/locro.jpg";
import logo from "./resources/logo.svg";

import PrimaryButton from "../PrimaryButton/PrimaryButton";
import SecondaryButton from "../SecondaryButton/SecondaryButton";

class Login extends Component {
  state = {
    showLogin: true,
  };

  toggleShow = () => {
    this.setState((state) => ({
      showLogin: !state.showLogin,
    }));
  };

  handleEvent = (e) => {
    e.persist();
    e.preventDefault();
    e.target.classList.toggle("focusedInput");
  };

  render() {
    return (
      <div className="Login">
        <img className="Login-img" src={locro} alt="locro background" />
        <div className="Login-form-container">
          <div className="Logo">
            <h1>Sesion del Locro</h1>
            {/* <img src='https://frasesparami.com/wp-content/uploads/2019/09/imagenes-bonitas.jpg' alt='logo' width='50px' /> */}
            <img src={logo} alt="logo" width="50px" />
          </div>
          <form className="Login-form">
            <span id="errorMsg"></span>
            <label htmlFor="email">
              <h2>Email</h2>
              <input
                type="text"
                id="email"
                onFocus={this.handleEvent}
                onBlur={this.handleEvent}
                placeholder="example@hotmail.com"
              />
            </label>
            <label htmlFor="password">
              <h2>Contraseña</h2>
              <input
                type="password"
                id="password"
                onFocus={this.handleEvent}
                onBlur={this.handleEvent}
              />
            </label>
            <label htmlFor="submit">
              <PrimaryButton
                id="submit"
                value="Iniciar Sesión"
                action={(e) => {
                  e.preventDefault();
                  this.props.login();
                }}
              />
            </label>
            <div className="links">
              <SecondaryButton
                id="link"
                value="¿No tienes una cuenta?"
                action={this.props.toggleShowRegister}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
