import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { atualizarEvento } from "../services/eventoService";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import SpinnerLoading from "../components/SpinnerLoading";

const EventoEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Estado para armazenar os dados do evento
  const [evento, setEvento] = useState({
    tema: "",
    descricao: "",
    dataEvento: "",
    dataInclusao: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    // Quando o componente for carregado, obtém o evento a partir do estado da localização
    if (location.state && location.state.evento) {
      setEvento(location.state.evento); // Preenche o estado com os dados do evento
    }
  }, [location]);

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();

    try {
      const updatedEvento = await atualizarEvento(evento);
      setResponseMessage("Evento atualizado com sucesso!");
      toast.success("Evento atualizado com sucesso!");
      // Após a atualização, navegue de volta para a página de lista
      navigate("/");
      setLoading(false);
    } catch (error) {
      setResponseMessage("Erro ao atualizar evento.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvento((prevEvento) => ({
      ...prevEvento,
      [name]: value,
    }));
  };

  if (loading) return <SpinnerLoading />;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Editar Evento
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Data do Evento:
            </label>
            <input
              type="datetime-local"
              name="dataEvento"
              value={evento.dataEvento}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Descrição:</label>
            <input
              type="text"
              name="descricao"
              value={evento.descricao}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Tema:</label>
            <input
              type="text"
              name="tema"
              value={evento.tema}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col gap-4">
            <button
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Salvar alterações"
              type="submit"
              className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            >
              Atualizar Evento
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

export default EventoEdit;
