import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../service/supabase"; // Importe seu serviço supabase
import Header from "../../Components/Header"; // Importe o Header

const PrivateRoute = ({ element: Element, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  // Verificação do estado de autenticação do usuário
  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setAuthenticated(!!user); // Se o usuário existir, setAuthenticated será true
      setLoading(false);

      if (!user) {
        // Se o usuário não estiver autenticado, redireciona para o login
        navigate("/login");
      }
    };

    checkSession();
  }, [navigate]);

  // Enquanto estiver carregando a verificação, podemos mostrar uma tela de "Loading..."
  if (loading) {
    return <div>Loading...</div>;
  }

  // Se o usuário estiver autenticado, renderiza o Header e a página protegida
  return authenticated ? (
    <>
      <Header /> {/* Renderiza o Header apenas se o usuário estiver autenticado */}
      <Element {...rest} /> {/* Renderiza a página privada */}
    </>
  ) : (
    // Caso contrário, redireciona para a página de login
    <Navigate to="/" />
  );
};

export default PrivateRoute;
