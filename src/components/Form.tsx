interface FormProps {
  onHandleCancel: (arg: boolean) => void;
}

function Form({ onHandleCancel }: FormProps) {
  return (
    <div>
      <form>
        <label htmlFor="Nome do serviço">
          Nome do serviço
          <input type="text" id="Nome do serviço" />
        </label>
        <label htmlFor="Login">
          Login
          <input type="text" id="Login" />
        </label>
        <label htmlFor="Senha">
          Senha
          <input type="password" id="Senha" />
        </label>
        <label htmlFor="URL">
          URL
          <input type="text" id="URL" />
        </label>
        <button>Cadastrar</button>
        <button onClick={ () => onHandleCancel(false) }>Cancelar</button>
      </form>
    </div>
  );
}

export default Form;
