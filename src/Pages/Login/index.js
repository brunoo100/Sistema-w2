import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../service/supabase";
import logo from "../../img/image.png";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Para exibir erros de autenticação

  const navigate = useNavigate();

  async function entrar(e) {
    e.preventDefault();
    setError(null); // Limpa erros anteriores
    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Erro ao autenticar:", err.message);
      setError("Erro inesperado ao tentar fazer login.");
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/home");
      }
    });
  }, [navigate]);

  return (
    <div className="container-login">
      <div className="left-login">
        <img src={logo} alt="Logo" />
      </div>
      <div className="right-login">
        <form className="card-login" onSubmit={entrar}>
          <h1>Login</h1>
          {error && <p className="error">{error}</p>} {/* Exibe mensagem de erro */}
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Senha:</label>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <p>Esqueci minha senha</p>
        </form>
      </div>
    </div>
  );
}
