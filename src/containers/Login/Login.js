import React, { useState, useContext } from "react";
import "./Login.css";

import { NetflixLogo, LoginBackground } from "assets/images/";
import { TextField } from "@material-ui/core";
import Button from "components/UI/Button/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom";
import { AuthenticationContext } from 'context/Authentication'
import { validEmailAndPhoneNumber } from 'utils/validation'



const Login = props => {
  const [form, setForm] = useState({
    email: {
      value: '',
      touched: false,
      valid: false
    },

    password: {
      value: '',
      touched: false,
      valid: false
    },

    onSubmitInvalid: false
  })

  const history = useHistory()
  const authContext = useContext(AuthenticationContext)

  const inputChangeHandler = event => {
    const { name, value } = event.target;
    if (name === "email") {
      setForm(prevForm => ({
        ...prevForm,
        email: {
          ...prevForm.email,
          value: value, touched: true, valid: value.length > 0 && validEmailAndPhoneNumber(value)
        }
      }))

    } else if (name === "password") {
      setForm(prevForm => ({
        ...prevForm,
        password: {
          ...prevForm.password, value: value, touched: true,
          valid: value.length >= 4 && value.length <= 60
        }
      }))
    }
  };

  
  const fieldBlurHandler = event => {
    if (event.target.name === 'email') {
      if (form.email.value === '') {
        setForm(prevForm => ({
          ...prevForm,
          email: { ...prevForm.email, touched: true }
        }))
      }
    }

    if (event.target.name === 'password') {
      if (form.password.value === '') {
        setForm(prevForm => ({
          ...prevForm,
          password: { ...prevForm.password, touched: true }
        }))
      }
    }
  };

  let [emailSpan, passwordSpan] = [null, null];

  if ((!form.email.valid && form.email.touched) || (form.onSubmitInvalid && !form.email.valid)) {
    emailSpan = <span>Colocar um email valido ou número.</span>
  }

  if ((!form.password.valid && form.password.touched) || (form.onSubmitInvalid && !form.password.valid)) {
    passwordSpan = <span>Sua senha deve conter de 4 a 60 caractere.</span>
  }

  const formSubmitHandler = (event) => {
    event.preventDefault()
    if (!form.email.valid || !form.password.valid) {
      setForm(prevForm => ({ ...prevForm, onSubmitInvalid: true }))
    } else {
      authContext.login()
      history.push("/browse");
    }
  }

  return (
    <div
      className="Login"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <img src={NetflixLogo} alt="Logo" />
      <div className="LoginCard">
        <h1>Login</h1>
        <form onSubmit={formSubmitHandler}>
          <TextField
            name="email"
            className="textField"
            label="Email ou número"
            variant="filled"
            type="text"
            style={{ backgroundColor: "#333" }}
            color="secondary"
            value={form.email.value}
            onChange={inputChangeHandler}
            onBlur={fieldBlurHandler}
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#8c8c8c" }
            }}
          />

          {emailSpan}

          <TextField
            name="password"
            className="textField"
            label="Senha"
            variant="filled"
            type="password"
            style={{ backgroundColor: "#333" }}
            color="secondary"
            value={form.password.value}
            onChange={inputChangeHandler}
            onBlur={fieldBlurHandler}
            autoComplete="off"
            InputLabelProps={{
              style: { color: "#8c8c8c" }
            }}
          />

          {passwordSpan}

          <Button
            height="45px" width="100%"
            backgroundColor="#e50914"
            textColor="#fff">
            Login
          </Button>

        </form>

        <div className="HorizontalDiv">
          <FormControlLabel
            style={{ marginLeft: "-12px" }}
            control={
              <Checkbox style={{ color: "rgb(229, 9, 20)" }} name="checkedB" />
            }
            label="Me manter conectado"
          />
          <span>Preicsa de ajuda?</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
