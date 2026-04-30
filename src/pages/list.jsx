import { useEffect, useState } from "react";
import api from "../services/api";

function List() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // 🔹 Carga inicial
  useEffect(() => {
    api.getUsers()
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // 🔹 Filtro reactivo (Ejercicio 3 real)
  useEffect(() => {
    setUpdating(true);

    let result = users;

    // filtro por género
    if (gender !== "all") {
      result = result.filter((user) => user.gender === gender);
    }

    // filtro por texto
    if (search !== "") {
      result = result.filter((user) =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    setFilteredUsers(result);

    // pequeña simulación visual
    const timer = setTimeout(() => setUpdating(false), 200);
    return () => clearTimeout(timer);

  }, [search, gender, users]);

  // 🔹 estados
  if (loading) return <p>⏳ Cargando usuarios...</p>;
  if (error) return <p>❌ Error: {error}</p>;


  return (
  <>
    <h1>Usuarios</h1>

    <div className="controls">
      <input
        type="text"
        placeholder="Nombre, Apellido o Email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="all">Todos</option>
        <option value="male">Hombres</option>
        <option value="female">Mujeres</option>
      </select>
    </div>

    {updating && <p>Actualizando...</p>}

    {/* 🔥 acá va el mensaje */}
    {filteredUsers.length === 0 ? (
      <p>📭 No hay resultados</p>
    ) : (
      <div className="grid">
        {filteredUsers.map((user) => (
          <div key={user.login.uuid} className="card">
            <img src={user.picture.medium} alt={user.name.first} />
            <h2>{user.name.first} {user.name.last}</h2>
            <p>Edad: {user.dob.age} años</p>
            <p className="email">📧 {user.email}</p>
          </div>
        ))}
      </div>
    )}
  </>
);
}

export default List;