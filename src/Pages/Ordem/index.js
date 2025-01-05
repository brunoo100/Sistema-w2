import React, { useState, useEffect } from "react";
import supabase from "../../service/supabase";

// Função para aplicar a máscara de placa para exibição (sem o traço)
const aplicarMascaraPlaca = (placa) => {
  return placa
    .replace(/[^a-zA-Z0-9]/g, "")  // Remove caracteres não alfanuméricos
    .toUpperCase();  // Garante que a placa seja exibida em maiúsculas
};

export default function OrdemServico() {
  const [placa, setPlaca] = useState("");  // Estado para a Placa
  const [nome, setNome] = useState("");  // Estado para Nome do Cliente
  const [cpf, setCpf] = useState("");  // Estado para CPF do Cliente
  const [valorServico, setValorServico] = useState("");  // Estado para o valor do serviço
  const [descricaoServico, setDescricaoServico] = useState("");  // Estado para a descrição do serviço
  const [error, setError] = useState("");  // Estado para mensagens de erro

  // Função para buscar os dados do cliente e a placa associada
  const buscarDadosPorPlaca = async (placa) => {
    try {
      if (placa.length === 7) {  // Verifica se a placa tem o tamanho correto
        // Consulta os dados do cliente associados à placa
        const { data, error } = await supabase
          .from("veiculos")  // Busca na tabela 'veiculos'
          .select("placa, clientes(nome, cpf)")  // Retorna a placa e os dados do cliente
          .eq("placa", placa);  // Não remove o traço aqui, pois não será usado

        if (error) {
          console.error("Erro na consulta:", error);  // Log do erro
          setError("Erro ao buscar dados do veículo.");
          return;
        }

        if (data.length > 0) {
          setNome(data[0].clientes.nome);  // Armazena o nome do cliente
          setCpf(data[0].clientes.cpf);  // Armazena o CPF do cliente
          setError("");  // Limpa mensagens de erro
        } else {
          setNome("");  // Limpa o nome
          setCpf("");  // Limpa o CPF
          setError("Veículo não encontrado.");
        }
      } else {
        setNome("");  // Limpa o nome e o CPF caso a placa não tenha 7 caracteres
        setCpf("");
        setError("");
      }
    } catch (err) {
      console.error("Erro ao buscar dados do veículo:", err);  // Log do erro
      setError("Erro ao buscar dados do veículo.");
    }
  };

  // Função para salvar a ordem de serviço no banco de dados
  const salvarOrdemServico = async (e) => {
    e.preventDefault();

    if (!valorServico || !descricaoServico || !placa || !nome || !cpf) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const { error } = await supabase.from("ordens_servico").insert([{
        placa: placa,  // A placa é salva sem o traço
        valor_servico: valorServico,
        descricao_servico: descricaoServico,
        cpf_cliente: cpf,  // Utiliza o CPF do cliente encontrado
      }]);

      if (error) {
        console.error("Erro ao salvar ordem de serviço:", error);  // Log do erro
        setError("Erro ao salvar a ordem de serviço.");
        return;
      }

      setValorServico("");
      setDescricaoServico("");
      setPlaca("");
      setNome("");
      setCpf("");
      setError("");
      alert("Ordem de serviço cadastrada com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar ordem de serviço:", err);  // Log do erro
      setError("Erro ao salvar a ordem de serviço.");
    }
  };

  // Chama a função para buscar os dados do cliente sempre que a placa for alterada
  useEffect(() => {
    if (placa.length === 7) {
      buscarDadosPorPlaca(placa);
    } else {
      setNome("");
      setCpf("");
      setError("");
    }
  }, [placa]);

  return (
    <div className="container-cadastrocliente">
      <div className="card">
        <form onSubmit={salvarOrdemServico}>
          <h1>Ordem de Serviço</h1>
          {error && <p className="error">{error}</p>}

          <label>Placa do Veículo:</label>
          <input
            type="text"
            placeholder="Placa (ABC1234)"  // Placa sem o traço
            value={aplicarMascaraPlaca(placa)}  // Aplica máscara para exibir sem o traço
            onChange={(e) => setPlaca(e.target.value)}  // Atualiza o estado sem modificar a placa
            maxLength={7}  // Limite para placas com 7 caracteres
          />

          <label>Nome do Cliente:</label>
          <input
            type="text"
            value={nome}
            readOnly  // O nome será preenchido automaticamente
            placeholder="Nome do Cliente"
          />

          <label>CPF do Cliente:</label>
          <input
            type="text"
            value={cpf}
            readOnly  // O CPF será preenchido automaticamente
            placeholder="CPF do Cliente"
          />

          <label>Valor do Serviço:</label>
          <input
            type="text"
            placeholder="Valor do Serviço"
            value={valorServico}
            onChange={(e) => setValorServico(e.target.value)}
          />

          <label>Descrição do Serviço:</label>
          <textarea
            placeholder="Descrição do Serviço"
            value={descricaoServico}
            onChange={(e) => setDescricaoServico(e.target.value)}
          ></textarea>

          <button type="submit">Salvar Ordem de Serviço</button>
        </form>
      </div>
    </div>
  );
}
