function UserCard({ user, isFav, onToggle }) {
  return (
    <div className="card">
      <img src={user.picture.medium} alt={user.name.first} />
      <h2>{user.name.first} {user.name.last}</h2>
      <p>Edad: {user.dob.age} años</p>
      <p className="email">📧 {user.email}</p>

      <button onClick={onToggle}>
        {isFav ? "❤️ Quitar" : "🤍 Favorito"}
      </button>
    </div>
  );
}

export default UserCard;