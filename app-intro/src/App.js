import logo from './logo.svg';
import './App.css';
import Example from './Example';
import Usuario from './Usuario';
import Menu from './Menu';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import PrimeReact from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function App() {

  const [opcao, setOpcao] = useState('Example');

  if (opcao === 'Example'){
    return (
      <div className="App">
           <Menu setOpcao={setOpcao}/>  
           <Example/>  
      </div>
    );

  } else if (opcao ===  'Usuario'){
    return (
      <div className="App">
           <Menu setOpcao={setOpcao}/>
           <Usuario/>
      </div>
    );
  }

}

export default App;
