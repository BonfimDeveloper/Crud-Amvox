import axios from "axios";

export const getEventosSemParametros = async () => {
  try {
    const response = await axios.get("/Evento"); // Sem parâmetros
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw error;
  }
};

export const createEvento = async (eventoData) => {
  try {
    const response = await axios.post("/Evento", eventoData, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    throw new Error("Erro ao criar evento: " + error.message);
  }
};

// Método para atualizar um evento
export const atualizarEvento = async (eventoData) => {
  try {
    const response = await axios.put("/Evento", eventoData, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    throw new Error("Erro ao atualizar evento: " + error.message);
  }
};

// Novo método para atualizar parcialmente um evento (PATCH)
export const patchEvento = async (eventoData) => {
  try {
    const response = await axios.patch("/Evento", eventoData, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    throw new Error("Erro ao atualizar parcialmente evento: " + error.message);
  }
};

export const deletarEvento = async (id) => {
  try {
    const response = await axios.delete(`/Evento/${id}`, {
      headers: {
        "accept": "application/json", // Define o cabeçalho de aceitação como JSON
      },
    });
    return response.data; // Retorna a resposta do servidor
  } catch (error) {
    throw new Error("Erro ao deletar evento");
  }
};
