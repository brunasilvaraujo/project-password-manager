import { useState } from 'react';
import './App.css';
import Form from './components/Form';

function App() {
  const [changeButton, setChangeButton] = useState<boolean>(false);

  return (
    <div>
      <h1>Gerenciador de senhas</h1>
      {changeButton
        ? (<Form onHandleCancel={ setChangeButton } />)
        : (<button onClick={ () => setChangeButton(true) }>Cadastrar nova senha</button>)}
    </div>
  );
}

export default App;
