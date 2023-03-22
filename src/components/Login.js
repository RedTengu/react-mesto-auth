import { useState } from "react";
import { useNavigate } from 'react-router-dom';

import FormForAuth from "./FormForAuth";

import authApi from "../utils/authApi";

function Login ({ setLoggedIn, setHeaderEmail }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {

    const {name, value} = e.target
    
    setFormValue({
      ...formValue,
      [name]: value
    })
  }

  const resetForm = () => {
    setFormValue({
      email: '',
      password: ''
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { email, password } = formValue;

    authApi.authorization(email, password)
      .then(res => {
        if (res.token) {
          setHeaderEmail(email);
          resetForm();
          setLoggedIn(true);
          localStorage.setItem('token', res.token);
          navigate("/", {replace: true});
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <FormForAuth 
      title="Вход"
      formName="sign-in" 
      btnText="Войти"
      formValue={formValue}
      onChange={handleChange}
      onSubmit={handleSubmit} />
  );
}

export default Login;