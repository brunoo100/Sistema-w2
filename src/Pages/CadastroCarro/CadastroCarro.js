import React, { useState, useEffect } from "react";
import supabase from "../../service/supabase";
import "../../styles/styles.css"; // Importando o arquivo CSS global

export default function CadastroCarro() {
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");
  const [nomeCliente, setNomeCliente] = useState("");
  const [cpf, setCpf] = useState("");
  const [error, setError] = useState("");

  // Função para buscar o nome do cliente pelo CPF
  const buscarNomeCliente = async (cpf) => {
    try {
      // Buscar o cliente no banco pelo CPF
      const { data, error } = await supabase
        .from("clientes")  // Tabela que contém os dados dos clientes
        .select("nome")
        .eq("cpf", cpf);

      if (error) {
        console.error("Erro ao buscar cliente:", error);
        setError("Erro ao buscar nome do cliente.");
        return;
      }

      if (data.length > 0) {
        setNomeCliente(data[0].nome);  // Preenche o nome do cliente
      } else {
        setNomeCliente("");  // Limpa o nome se o CPF não for encontrado
        setError("Cliente não encontrado.");
      }
    } catch (err) {
      console.error("Erro inesperado ao buscar cliente:", err);
      setError("Erro ao buscar nome do cliente.");
    }
  };

  // Função para cadastrar o carro
  const cadastrarCarro = async (e) => {
    e.preventDefault();

    if (!modelo || !placa || !nomeCliente || !cpf) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      // Inserir o carro no banco de dados
      const { data, error: insertError } = await supabase
        .from("veiculos")
        .insert([{ modelo, placa, cpf_cliente: cpf }]);

      if (insertError) throw insertError;

      // Limpar campos após o sucesso
      setModelo("");
      setPlaca("");
      setNomeCliente("");
      setCpf("");
      setError("");
      alert("Carro cadastrado com sucesso!");
    } catch (err) {
      setError("Erro ao cadastrar carro. Tente novamente.");
    }
  };

  // Chama a função para buscar o nome do cliente sempre que o CPF for alterado
  useEffect(() => {
    if (cpf.length === 11) {  // Verifica se o CPF tem 11 caracteres
      buscarNomeCliente(cpf);  // Chama a função para buscar o nome
    } else {
      setNomeCliente("");  // Limpa o nome se o CPF não tiver 11 caracteres
      setError("");
    }
  }, [cpf]);

  return (
    <div className="container-cadastrocliente">
      <div className="card">
        <form onSubmit={cadastrarCarro}>
          <h1>Cadastro de Carro</h1>
          {error && <p className="error">{error}</p>}

          <label>Nome do Cliente:</label>
          <input
            type="text"
            placeholder="Nome do Cliente"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            readOnly  // O nome será preenchido automaticamente, portanto, não pode ser alterado diretamente
          />

          <label>CPF do Cliente:</label>
          <input
            type="text"
            placeholder="CPF do Cliente"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            maxLength={14}  // Limite de 14 caracteres para CPF formatado
          />

          <label>Modelo do Veículo:</label>
          <input
            type="text"
            placeholder="Modelo do Veículo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />

          <label>Placa do Veículo:</label>
          <input
            type="text"
            placeholder="Placa (ABC1234)"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            maxLength={7}  // Limite de 8 caracteres para a placa
          />

          <button type="submit">Cadastrar Carro</button>
        </form>
      </div>
    </div>
  );
}
