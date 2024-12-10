import React, { useState } from "react";
import { createEvento } from "../services/eventoService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import SpinnerLoading from "../components/SpinnerLoading";

const EventoCreate = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);


  const [dataEvento, setDataEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tema, setTema] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Adicionando a data de inclusão como a data atual
  const dataInclusao = new Date().toISOString();


  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();

    const eventoData = {
      dataEvento: dataEvento,
      dataInclusao: dataInclusao,  // Agora inclui a data de inclusão
      descricao: descricao,
      tema: tema,
    };

    try {
      const response = await createEvento(eventoData);
      setResponseMessage(`Evento criado com sucesso! ID: ${response.id}`);
      toast.success("Evento criado com sucesso!");
      navigate("/")
    setLoading(false);


    } catch (error) {
      setResponseMessage("Erro ao criar evento: " + error.message);
    setLoading(false);

    }
  };
  if (loading) return <SpinnerLoading />;


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Criar Evento</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Data do Evento:</label>
            <input
              type="datetime-local"
              value={dataEvento}
              onChange={(e) => setDataEvento(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Descrição:</label>
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tema:</label>
            <input
              type="text"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          

          <div className="flex flex-col gap-4">

          <button
          data-tooltip-id="my-tooltip"
            data-tooltip-content="Salvar Novo Evento "
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Criar Evento
          </button>
          <Tooltip id="my-tooltip" />

          <button
           type="button"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Voltar para Listagem de eventos"
            className="w-full p-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
          <Tooltip id="my-tooltip" />
          </div>
        </form>

        {responseMessage && (
          <p className="mt-4 text-center text-gray-700">{responseMessage}</p>
        )}
      </div>
    </div>
  );
};

export default EventoCreate;