import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { loadCharacterDetails } from "../store/itemsSlice";
import "../styles/itemDetails.css";

function ItemDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedItem, loading, error } = useSelector(
    (state) => state.items
  );

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("search") || "";

  useEffect(() => {
    dispatch(loadCharacterDetails(id));
  }, [dispatch, id]);

  if (loading) return <p className="details-loading">Loading...</p>;
  if (error) return <p className="details-error">{error}</p>;
  if (!selectedItem) return null;

  return (
    <div className="details">
      <h1 className="details-title">{selectedItem.name}</h1>

      <div className="details-card">
        <img
          src={selectedItem.image}
          alt={selectedItem.name}
          className="details-image"
        />

        <div className="details-info">
          <p><span>Status:</span> {selectedItem.status}</p>
          <p><span>Species:</span> {selectedItem.species}</p>
          <p><span>Gender:</span> {selectedItem.gender}</p>
          <p><span>Origin:</span> {selectedItem.origin.name}</p>
          <p><span>Location:</span> {selectedItem.location.name}</p>
          <p><span>Created:</span> {selectedItem.created}</p>
        </div>
      </div>

      <Link
        to={`/items?page=${page}&search=${search}`}
        className="details-back"
      >
        ← Back
      </Link>
    </div>
  );
}

export default ItemDetailsPage;
