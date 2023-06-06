import { ValidateForm } from './types';

interface FormProps {
  data: ValidateForm;
  handleChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  submitForm: (event: React.FormEvent<HTMLFormElement>) => void;
  onHandleCancel: (arg: boolean) => void;
  isFormValidated: boolean;
  isForm: () => void;
}

function Form(props: FormProps) {
  const { onHandleCancel, isFormValidated, data,
    submitForm, handleChangeInput, isForm } = props;
  return (
    <div>
      <form onSubmit={ submitForm } onChange={ isForm }>
        <label htmlFor="Nome do serviço">
          Nome do serviço
          <input
            name="name"
            type="text"
            id="Nome do serviço"
            value={ data.name }
            onChange={ (event) => handleChangeInput(event) }
          />
        </label>
        <label htmlFor="Login">
          Login
          <input
            name="login"
            type="text"
            id="Login"
            value={ data.login }
            onChange={ (event) => handleChangeInput(event) }
          />
        </label>
        <label htmlFor="Senha">
          Senha
          <input
            name="password"
            type="password"
            id="Senha"
            value={ data.password }
            onChange={ (event) => handleChangeInput(event) }
          />
        </label>
        <label htmlFor="URL">
          URL
          <input
            name="url"
            type="text"
            id="URL"
            value={ data.url }
            onChange={ (event) => handleChangeInput(event) }
          />
        </label>
        <button type="submit" disabled={ !isFormValidated }>Cadastrar</button>
        <button onClick={ () => onHandleCancel(false) }>Cancelar</button>
      </form>
    </div>
  );
}

export default Form;
