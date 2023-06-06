import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import { ValidateForm } from './components/types';

function App() {
  const [changeButton, setChangeButton] = useState<boolean>(false);
  const [data, setData] = useState<ValidateForm>({
    name: '',
    login: '',
    password: '',
    url: '',
  });
  const [form, setForm] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setData({
      name: '',
      login: '',
      password: '',
      url: '',
    });
  };

  const validatedForm = () => {
    const regexName = /[a-zA-Z]+/i;

    const regexLogin = /[a-zA-Z]+/i;

    const regexPassword = /[a-zA-Z]+/i;

    const regexNumber = /[0-9]+/i;

    const regexCaracterSpecial = /[!@#$\-_?.:&%]+/i;

    const isNameValid = regexName.test(data.name)
      && data.name.length !== undefined;

    const isLoginValid = regexLogin.test(data.login) && data.login.length > 0;

    const isPasswordValid = regexPassword.test(data.password)
      && regexCaracterSpecial.test(data.password)
      && regexNumber.test(data.password)
      && data.password.length >= 8 && data.password.length <= 16;

    setForm(isNameValid && isLoginValid && isPasswordValid);
  };

  return (
    <div>
      <h1>Gerenciador de senhas</h1>
      {changeButton
        ? (<Form
            onHandleCancel={ setChangeButton }
            handleChangeInput={ handleChange }
            submitForm={ handleSubmit }
            data={ data }
            isFormValidated={ form }
            isForm={ validatedForm }
        />)
        : (<button onClick={ () => setChangeButton(true) }>Cadastrar nova senha</button>)}
    </div>
  );
}

export default App;
