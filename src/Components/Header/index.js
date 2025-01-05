import logo from '../../img/image.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react'; // Para gerenciar o estado do menu
import './header.css';
import supabase from '../../service/supabase';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false); // Estado para controlar a visibilidade do menu
  const navigate = useNavigate();

  const sair = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Redireciona para o login após o logout
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto); // Alterna o estado do menu
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="menu">
          <nav className={menuAberto ? "open" : ""}> {/* Aplica a classe 'open' se o menu estiver aberto */}
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
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </header>
    </div>
  );
}
