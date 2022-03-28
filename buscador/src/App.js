import {FiSearch} from 'react-icons/fi';
import {useState} from 'react';
import api from './services/api';
import './app.css'

function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  const HandleSearch = async () => {
         if(input===''){
           alert("Digite o Cep")
           return;
         }

         try{
           const response = await api.get(`${input}/json`);
           setCep(response.data)
           setInput('')
         }catch{
             alert("Ops Deu erro")
             setInput('')
         }
  }


  return (
    <div className="container">
      <h1 className="title">Buscador de Cep</h1>
      <div className="container-input">
        <input 
          type="text"
          placeholder="Digite Seu Cep"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="buttonSearch" onClick={HandleSearch}><FiSearch size={20} color='White'/></button>
        </div>
        {Object.keys(cep).length >0 && (
            <main>
            <h2>CEP: {cep.cep}</h2>

            <span>{cep.logradouro}</span><br/>
            <span>Complemento: {cep.complemento}</span><br/>
            <span>{cep.bairro}</span><br/>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        )}
      


     
    </div>
  );
}

export default App;
