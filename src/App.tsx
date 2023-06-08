import React, { useState } from 'react';
import './App.css';
import Form from './components/Form';
import { ValidateForm } from './components/types';

function App() {
  const initialData = {
    name: '',
    login: '',
    password: '',
    url: '',
  };
  const [changeButton, setChangeButton] = useState<boolean>(false);
  const [data, setData] = useState<ValidateForm>(initialData);

  const [savedInfos, setSavedInfos] = useState<ValidateForm[]>([]);
  const [form, setForm] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      id: Date.now(),
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newSavedInfos = [...savedInfos, data];

    setSavedInfos(newSavedInfos);

    setChangeButton(false);

    setData({
      name: '',
      login: '',
      password: '',
      url: '',
    });
  };

  const valid = (valor: string | number, regex: any): boolean => {
    if (!valor) return false;
    return regex.test(valor);
  };

  const validatedForm = () => {
    const regexLyrics = /[a-zA-Z]+/i;

    const regexNumber = /[0-9]+/i;

    const regexCaracterSpecial = /[!@#$\-_?.:&%]+/i;

    const isNameValid = valid(data.name, regexLyrics);

    const isLoginValid = valid(data.login, regexLyrics);

    const isPasswordValid = valid(data.password, regexLyrics)
      && valid(data.password, regexNumber)
      && valid(data.password, regexCaracterSpecial)
      && data.password.length >= 8 && data.password.length <= 16;

    setForm(isNameValid && isLoginValid && isPasswordValid);
  };

  const passwordCheck = 'valid-password-check';
  const passwordInvalid = 'invalid-password-check';

  const deleteItem = (id: number | undefined): void => {
    setSavedInfos(savedInfos.filter((info) => info.id !== id));
  };

  return (
    <div>
      <h1>Gerenciador de senhas</h1>
      {changeButton
        ? (
          <div>
            <Form
              onHandleCancel={ setChangeButton }
              handleChangeInput={ handleChange }
              submitForm={ handleSubmit }
              data={ data }
              isFormValidated={ form }
              isForm={ validatedForm }
            />
            <div>
              <p
                className={ (data.password.length >= 8)
                  ? passwordCheck : passwordInvalid }
              >
                Possuir 8 ou mais caracteres
              </p>
              <p
                className={ (data.password.length < 16)
                  ? passwordCheck : passwordInvalid }
              >
                Possuir até 16 caracteres
              </p>
              <p className={ valid(data.password, /[a-zA-Z][0-9]+/i) ? passwordCheck : passwordInvalid }>Possuir letras e números</p>
              <p className={ valid(data.password, /[!@#$\-_?.:&%]+/i) ? passwordCheck : passwordInvalid }>Possuir algum caractere especial</p>
            </div>
          </div>
        )
        : (
          <>
            <button onClick={ () => setChangeButton(true) }>Cadastrar nova senha</button>
            <section>
              <div>
                {savedInfos.length === 0
                  ? <h2>Nenhuma senha cadastrada</h2> : <h2>Lista de senhas</h2>}
                {savedInfos.map((info) => (
                  <div key={ info.id }>
                    <button
                      data-testid="remove-btn"
                      onClick={ () => deleteItem(info.id) }
                    >
                      X
                    </button>
                    <ul>
                      <li>
                        <a href={ info.url } target="_blank" rel="noreferrer">
                          {info.name}
                        </a>
                      </li>
                      <li>
                        <p>Login:</p>
                        <p>{info.login}</p>
                      </li>
                      <li>
                        <p>Senha:</p>
                        <p>{info.password}</p>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
    </div>
  );
}

export default App;
