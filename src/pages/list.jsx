import { useEffect, useState } from "react";
import api from "../services/Api";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/FavoritesSlice";
import UserCard from "../components/userCard";

function List() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  useEffect(() => {
    api
      .getUsers()
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setUpdating(true);

    let result = users;

    if (gender !== "all") {
      result = result.filter((user) => user.gender === gender);
    }

    if (search !== "") {
      result = result.filter((user) =>
        `${user.name.first} ${user.name.last}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      );
    }

    setFilteredUsers(result);

    const timer = setTimeout(() => setUpdating(false), 200);
    return () => clearTimeout(timer);
  }, [search, gender, users]);

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

      {filteredUsers.length === 0 ? (
        <p>📭 No hay resultados</p>
      ) : (
        <div className="grid">
          {filteredUsers.map((user) => {
            const isFav = favorites.some(
              (fav) => fav.login.uuid === user.login.uuid,
            );

            return (
              <UserCard
                key={user.login.uuid}
                user={user}
                isFav={isFav}
                onToggle={() =>
                  isFav
                    ? dispatch(removeFavorite(user.login.uuid))
                    : dispatch(addFavorite(user))
                }
              />
            );
          })}
        </div>
      )}
    </>
  );
}

export default List;
