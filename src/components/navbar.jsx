import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Mi App</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/List">Listado</Link></li>
        <li><Link to="/Favorites">Favoritos</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;