import React, { useState, useEffect } from "react";
import supabase from "../../service/supabase"; // Importe seu arquivo supabase.js

export default function ListaClientes() {
  const [clientes, setClientes] = useState([]); // Para armazenar os dados dos clientes
  const [error, setError] = useState(""); // Para mensagens de erro
  const [cpfFiltro, setCpfFiltro] = useState(""); // Para armazenar o CPF do filtro

  // Função para buscar os dados da tabela de clientes com filtro de CPF
  const buscarClientes = async () => {
    try {
      // Inicia a consulta para pegar todos os clientes
      let query = supabase.from("clientes").select("id, nome, cpf, telefone");

      // Se houver um CPF no filtro, aplica o filtro
      if (cpfFiltro) {
        query = query.ilike("cpf", `%${cpfFiltro}%`); // Filtra por CPF
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Se não houver erro, armazena os dados
      setClientes(data || []);
    } catch (err) {
      setError("Erro ao buscar dados dos clientes.");
      console.error(err);
    }
  };

  // Chama a função de busca sempre que o filtro de CPF mudar
  useEffect(() => {
    buscarClientes();
  }, [cpfFiltro]); // Executa a busca sempre que o filtro de CPF mudar

  return (
    <div className="container-clientes">
      <h1>Lista de Clientes Cadastrados</h1>

      {/* Campo de filtro para o CPF */}
      <div className="filtro-cpf">
        <input
          type="search"
          placeholder="Buscar por CPF"
          value={cpfFiltro}
          onChange={(e) => setCpfFiltro(e.target.value)} // Atualiza o filtro com o CPF digitado
          style={{
            padding: "8px",
            fontSize: "16px",
            width: "250px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        />
      </div>

      {/* Exibe mensagens de erro se houver */}
      {error && <p className="error">{error}</p>}

      {/* Exibe a tabela com os dados dos clientes */}
      {clientes.length > 0 ? (
        <div className="servicos-lista">
          <h2>Todos os Clientes</h2>
          <table style={{ width: "%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Telefone</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.telefone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Não há clientes cadastrados.</p>
      )}
    </div>
  );
}
