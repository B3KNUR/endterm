import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import "../styles/header.css";

function Header() {
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.data);
  const { logoutUser } = useAuth();

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/about" className="nav-link">About</Link>

        {!user && (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Signup</Link>
          </>
        )}

        <Link to="/items" className="nav-link">Items</Link>
        <Link to="/favorites" className="nav-link">Favorites</Link>
      </div>

      {user && (
        <div className="header-right">
          <Link to="/profile" className="nav-link">Profile</Link>

          {profile?.photoURL && (
            <img
              src={profile.photoURL}
              alt="Avatar"
              className="header-avatar"
            />
          )}

          <button className="logout-btn" onClick={logoutUser}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
