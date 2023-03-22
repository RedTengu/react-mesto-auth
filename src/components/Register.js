import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import FormForAuth from "./FormForAuth";

import authApi from "../utils/authApi";

function Register ({ setIsSuccess, setIsInfoTooltipOpen }) {
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

    authApi.register(email, password)
      .then(res => {
        resetForm();
        setIsSuccess(true);
        setIsInfoTooltipOpen(true);
      })
      .then(() => {
        navigate("/sign-in", {replace: true});
      })
      .catch(err => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
  }

  return (
    <FormForAuth 
      title="Регистрация"
      formName="sign-up" 
      btnText="Зарегистрироваться"
      formValue={formValue}
      onChange={handleChange}
      onSubmit={handleSubmit}>
        <Link to="/sign-in" className="form-for-auth__to-login hover-opacity">Уже зарегистрированы? Войти</Link>
    </FormForAuth>
  );
}

export default Register;