import React, { useState } from "react";
import supabase from "../../service/supabase";
import "./cadastrocliente.css";

export default function CadastroCliente() {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [error, setError] = useState(null);

  const cadastrarCliente = async (e) => {
    e.preventDefault();

    if (!nome || !cpf || !telefone) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      // Inserir o cliente no banco de dados
      const { data, error: insertError } = await supabase
        .from("clientes")
        .insert([{ nome, cpf, telefone }]);

      if (insertError) throw insertError;

      // Limpar campos após o sucesso
      setNome("");
      setCpf("");
      setTelefone("");
      setError(null);
      alert("Cliente cadastrado com sucesso!");
    } catch (err) {
      setError("Erro ao cadastrar cliente. Tente novamente.");
    }
  };

  return (
    <div className="container-cadastrocliente">
      <div className="card">
        <form onSubmit={cadastrarCliente}>
          <h1>Cadastro de Cliente</h1>
          {error && <p className="error">{error}</p>}
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label>CPF:</label>
          <input
            type="text"
            placeholder="CPF (000.000.000-00)"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            maxLength={14}
          />
          <label>Telefone:</label>
          <input
            type="text"
            placeholder="Telefone (somente números)"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            maxLength={11}
          />
          <button type="submit">Salvar Cliente</button>
        </form>
      </div>
    </div>
  );
}
