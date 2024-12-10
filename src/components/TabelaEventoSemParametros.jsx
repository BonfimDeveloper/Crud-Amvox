import React, { useEffect, useState } from "react";
import {
  getEventosSemParametros,
  deletarEvento,
} from "../services/eventoService";
import { FaEye, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { toast } from "react-toastify";
import SpinnerLoading from "../components/SpinnerLoading";

// Configuração do Modal
Modal.setAppElement("#root"); // Necessário para acessibilidade

const TabelaEventoSemParametros = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [eventos, setEventos] = useState([]);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para abrir/fechar o modal
  const [eventoToDelete, setEventoToDelete] = useState(null); // Evento que será deletado

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const data = await getEventosSemParametros();
        setEventos(data.listaEvento);
        setTotalRegistros(data.totalRegistros);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar eventos.");
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const handleView = (evento) => {
    navigate("/consultar-evento", { state: { evento } });
  };

  const handleDelete = (evento) => {
    setEventoToDelete(evento); // Define o evento a ser deletado
    setIsModalOpen(true); // Abre o modal de confirmação
  };

  const confirmDelete = async () => {
    try {
      await deletarEvento(eventoToDelete.id); // Deleta o evento
      setEventos(eventos.filter((evento) => evento.id !== eventoToDelete.id)); // Atualiza a lista de eventos
      setIsModalOpen(false); // Fecha o modal
      toast.success(
        `Evento "${eventoToDelete.descricao}" deletado com sucesso!`
      );
    } catch (err) {
      setError("Erro ao excluir evento.");
      setIsModalOpen(false); // Fecha o modal em caso de erro
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); // Fecha o modal sem excluir
  };

  if (loading) return <SpinnerLoading />;

  return (
    <div className=" flex flex-col justify-center gap-20">
      <div className="w-full p-10 shadow-lg shadow-slate-200 flex flex-row gap-2 justify-start items-center">
        <h3 className="text-4xl font-semibold">Lista de Eventos:</h3>
      </div>
      <div className="flex lg:hidden w-full justify-center">
        <button
          className="bg-slate-700 hover:bg-slate-900 text-white p-4 rounded-md"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Criar Evento"
          onClick={() => navigate("/criar-evento")}
        >
          Novo Evento
        </button>
        <Tooltip id="my-tooltip" />
      </div>
      <div className="block lg:hidden gap-10">
        {eventos.map((evento) => (
          <div
            key={evento.id}
            className="max-w-sm mx-auto bg-white shadow-lg rounded-lg my-4 p-10"
          >
            <h2 className="text-xl font-semibold">{evento.tema || "N/A"}</h2>
            <p className="text-gray-600">{evento.descricao || "N/A"}</p>
            <p className="text-gray-500 text-sm mt-2">
              <strong>Data de Inclusão:</strong> {evento.dataInclusao || "N/A"}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              <strong>Data do Evento:</strong> {evento.dataEvento || "N/A"}
            </p>
            <div className="flex gap-4 mt-4 justify-center">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => handleView(evento)}
              >
                <FaEye size={20} />
              </button>
              <button
                className="bg-yellow-500 text-white p-2 rounded"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Editar Evento"
                onClick={() =>
                  navigate("/editar-evento", { state: { evento } })
                }
              >
                <FaEdit size={20} />
              </button>
              <Tooltip id="my-tooltip" />
              <button
                className="bg-red-500 text-white p-2 rounded"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Deletar Evento"
                onClick={() => handleDelete(evento)}
              >
                <FaTrashAlt size={20} />
              </button>
              <Tooltip id="my-tooltip" />
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:block">
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table
          className="min-w-full border-collapse table-auto mt-8"
          style={{ width: "100%", marginTop: "20px" }}
        >
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Tema</th>
              <th className="px-4 py-2 border-b">Descrição</th>
              <th className="px-4 py-2 border-b">Data de Inclusão</th>
              <th className="px-4 py-2 border-b">Data de Evento</th>
              <th className="px-4 py-2 border-b">Ações</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id}>
                <td className="px-4 py-2 border-b text-center">
                  {evento.tema || "N/A"}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {evento.descricao || "N/A"}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {evento.dataInclusao || "N/A"}
                </td>
                <td className="px-4 py-2 border-b text-center">
                  {evento.dataEvento || "N/A"}
                </td>
                <td className="px-4 py-2 border-b flex justify-center gap-10 text-center">
                  <button
                    className="bg-blue-500 text-white p-2 rounded"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Consultar Evento"
                    onClick={() => handleView(evento)}
                  >
                    <FaEye size={20} />
                  </button>
                  <Tooltip id="my-tooltip" />

                  <button
                    className="bg-yellow-500 text-white p-2 rounded"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Editar Evento"
                    onClick={() =>
                      navigate("/editar-evento", { state: { evento } })
                    }
                  >
                    <FaEdit size={20} />
                  </button>
                  <Tooltip id="my-tooltip" />

                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Deletar Evento"
                    onClick={() => handleDelete(evento)}
                  >
                    <FaTrashAlt size={20} />
                  </button>
                  <Tooltip id="my-tooltip" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full p-20 shadow-lg shadow-slate-200  flex flex-row gap-2 justify-center lg:justify-between items-center">
        <div className="flex flex-row gap-2">
          <h3 className="text-2xl font-semibold">TOTAL DE REGISTROS:</h3>
          <p className="text-2xl font-semibold">{totalRegistros || 0}</p>
        </div>
        <button
          className="hidden lg:block bg-slate-700 hover:bg-slate-900 text-white p-4 rounded-full"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Criar Evento"
          onClick={() => navigate("/criar-evento")}
        >
          <FaPlus size={24} />
        </button>
        <Tooltip id="my-tooltip" />
      </div>

      <div className="absolute">
        <Modal
          isOpen={isModalOpen}
          onRequestClose={cancelDelete}
          contentLabel="Confirmar Exclusão"
          className="modal"
          overlayClassName="overlay"
        >
          <h2 className="text-2xl font-bold">Confirmar Exclusão</h2>
          <p className="text-lg font-semibold pt-4">
            Tem certeza de que deseja excluir o evento "
            {eventoToDelete?.descricao}"?
          </p>
          <div className="flex flex-row justify-between pt-10">
            <button
              onClick={confirmDelete}
              className="bg-red-500 text-white p-2 rounded"
            >
              Confirmar
            </button>
            <button
              onClick={cancelDelete}
              className="bg-gray-500 text-white p-2 rounded"
            >
              Cancelar
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default TabelaEventoSemParametros;
