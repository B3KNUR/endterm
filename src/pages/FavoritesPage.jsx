import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFavorites } from "../store/favoritesSlice";
import { Link } from "react-router-dom";
import "../styles/favorites.css";
   
function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(loadFavorites(user.uid));
    } else {
      dispatch(loadFavorites(null));
    }
  }, [dispatch, user]);

  if (favorites.length === 0) {
    return <p className="favorites-empty">No favorites yet.</p>;
  }

  return (
    <div className="favorites">
      <h1 className="favorites-title">Favorites</h1>

      <div className="favorites-list">
        {favorites.map((id) => (
          <div key={id} className="favorites-item">
            <Link className="favorites-link" to={`/items/${id}`}>
              Character #{id}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
