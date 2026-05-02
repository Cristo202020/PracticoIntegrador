import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../store/favoritesSlice";
import UserCard from "../components/userCard";

function Favorites() {
  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();

  if (favorites.length === 0) return <p>No hay favoritos</p>;

  return (
    <>
      <h1>Favoritos</h1>

      <div className="grid">
        {favorites.map((user) => (
          <UserCard
            key={user.login.uuid}
            user={user}
            isFav={true}
            onToggle={() => dispatch(removeFavorite(user.login.uuid))}
          />
        ))}
      </div>
    </>
  );
}

export default Favorites;
