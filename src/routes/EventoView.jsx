


import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const EventoView = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const evento = location.state?.evento; // Acessa o evento passado como estado

  if (!evento) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Evento não encontrado.</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4 text-center">Detalhes do Evento</h1>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">
            <strong>Tema:</strong> {evento.tema}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">
            <strong>Descrição:</strong> {evento.descricao}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">
            <strong>Data de Inclusão:</strong> {evento.dataInclusao}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">
            <strong>Data do Evento:</strong> {evento.dataEvento}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Voltar para Listagem de eventos"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => navigate("/")}
          >
            Voltar
          </button>
          <Tooltip id="my-tooltip" />

          <button
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Ajustar parcialmente o evento"
            className="w-full p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition duration-200"
            onClick={() => navigate("/patch-evento", { state: { evento } })}
          >
            Ajustar
          </button>
          <Tooltip id="my-tooltip" />
        </div>
      </div>
    </div>
  );
};

export default EventoView;
