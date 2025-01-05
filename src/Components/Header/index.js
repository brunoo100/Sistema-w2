import logo from '../../img/image.png';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react'; // useRef foi adicionado
import './header.css';
import supabase from '../../service/supabase';

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false); // Estado para controlar a visibilidade do menu
  const menuRef = useRef(null); // Referência para o menu
  const navigate = useNavigate();

  const sair = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Redireciona para o login após o logout
  };

  const toggleMenu = () => {
    setMenuAberto(!menuAberto); // Alterna o estado do menu
  };

  // Efeito para detectar cliques fora do menu e fechá-lo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false); // Fecha o menu se o clique for fora dele
      }
    };

    // Adiciona o evento de clique
    document.addEventListener('mousedown', handleClickOutside);

    // Limpa o evento quando o componente for desmontado
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <header>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="menu" ref={menuRef}> {/* Adiciona a referência aqui */}
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
