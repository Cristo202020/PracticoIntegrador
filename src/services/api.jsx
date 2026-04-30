const api = {
  getUsers: async () => {
    try {
      const response = await fetch("https://randomuser.me/api/?results=12&seed=tp-integrador");

      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error(error.message || "Error de red");
    }
  }
};

export default api;