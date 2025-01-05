import React, { useState, useEffect } from "react";
import supabase from "../../service/supabase"; // Importe seu arquivo supabase.js
import "./relatorio.css"; // Importando seu arquivo CSS

export default function RelatorioServicos() {
  const [servicos, setServicos] = useState([]); // Para armazenar os serviços
  const [error, setError] = useState(""); // Para mensagens de erro
  const [placaFiltro, setPlacaFiltro] = useState(""); // Estado para armazenar a placa de filtro

  // Função para buscar os dados da tabela ordens_servico com filtro de placa
  const buscarServicos = async () => {
    try {
      // Inicia a consulta
      let query = supabase.from("ordens_servico").select(
        "id, placa, valor_servico, descricao_servico, cpf_cliente, created_at" // Incluindo 'created_at'
      );

      // Aplica o filtro de placa se houver valor
      if (placaFiltro) {
        query = query.ilike("placa", `%${placaFiltro}%`); // Filtra pela placa (se fornecida)
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Se não houver erro, armazena os dados
      setServicos(data || []);
    } catch (err) {
      setError("Erro ao buscar ordens de serviço.");
      console.error(err);
    }
  };

  // Chama a função de busca ao carregar o componente e sempre que a placa de filtro mudar
  useEffect(() => {
    buscarServicos();
  }, [placaFiltro]); // Dependência no placaFiltro para chamar novamente a função ao mudar o filtro

  // Função para formatar a data 'created_at'
  const formatarData = (data) => {
    const date = new Date(data);
    return date.toLocaleDateString("pt-BR"); // Formata a data no padrão brasileiro
  };

  return (
    <div className="container-relatorio">
      <h1>Relatório de Ordens de Serviço</h1>

      {/* Exibe mensagens de erro se houver */}
      {error && <p className="error">{error}</p>}

      {/* Campo de filtro para a placa */}
      <div className="filtro-placa">
        <input
          type="search"
          placeholder="Filtrar por Placa"
          value={placaFiltro}
          onChange={(e) => setPlacaFiltro(e.target.value)} // Atualiza o filtro com o valor da placa
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

      {/* Exibe a tabela com os serviços */}
      {servicos.length > 0 ? (
        <div className="servicos-lista">
          <h2>Todos os Serviços</h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th>Placa</th>
                <th>Valor do Serviço</th>
                <th>Descrição do Serviço</th>
                <th>CPF do Cliente</th>
                <th>Data de Cadastro</th> {/* Nova coluna para a data de cadastro */}
              </tr>
            </thead>
            <tbody>
              {servicos.map((servico) => (
                <tr key={servico.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td>{servico.placa}</td>
                  <td>R$ {servico.valor_servico}</td>
                  <td>{servico.descricao_servico}</td>
                  <td>{servico.cpf_cliente}</td>
                  <td>{formatarData(servico.created_at)}</td> {/* Exibe a data formatada */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Não há ordens de serviço cadastradas.</p>
      )}
    </div>
  );
}
