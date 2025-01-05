import logo from '../../img/image.png';
import { Link, useNavigate } from 'react-router-dom';  // Importando o hook useNavigate corretamente
import './header.css';
import supabase from '../../service/supabase';

export default function Header() {
  const navigate = useNavigate(); // Colocando useNavigate dentro do componente funcional

  const sair = async () => {
    await supabase.auth.signOut(); // Certifique-se de que a função é assíncrona
    navigate('/'); // Redireciona para o login após o logout
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="menu">
          <nav>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/cadastro">Cadastro de clientes</Link></li>
              <li><Link to="/ordem">Ordens de Serviço</Link></li>
              <li><Link to="/relatorio">Relatórios</Link></li>
              <li><Link to="/cadastrar">Cadastrar Veiculo</Link></li>
              <li><Link to="/listaclientes">Lista de Clientes</Link></li>
            </ul>
          </nav>
        </div>
        <div className="btn">
          <button onClick={sair}>Sair</button>
        </div>
      </header>
    </div>
  );
}
