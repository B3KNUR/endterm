import { useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCharacters, setPage, setSearch, setPerPage } from "../store/itemsSlice";
import { useSearchParams, Link } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { addFavorite, removeFavorite } from "../store/favoritesSlice";
import { saveLocalFavorites, saveUserFavorites } from "../services/favoritesService";
import "../styles/items.css";

function ItemsListPage() {
  const dispatch = useDispatch();
  const { list, loading, error, page, totalPages, search, perPage } =
    useSelector((state) => state.items);
  const user = useSelector((state) => state.auth.user);
  const favorites = useSelector((state) => state.favorites.items);

  const [searchParams, setSearchParams] = useSearchParams();

  const queryPage = Number(searchParams.get("page")) || 1;
  const querySearch = searchParams.get("search") || "";
  const queryPerPage = Number(searchParams.get("perPage")) || 5;

  const debouncedSearch = useDebounce(querySearch, 500);

  useEffect(() => {
    dispatch(setPage(queryPage));
    dispatch(setSearch(querySearch));
    dispatch(setPerPage(queryPerPage));

    dispatch(loadCharacters({
      page: queryPage,
      name: debouncedSearch,
      perPage: queryPerPage,
    }));
  }, [dispatch, queryPage, debouncedSearch, querySearch, queryPerPage]);

  const toggleFavorite = useCallback(async (id) => {
    let updated;

    if (favorites.includes(id)) {
      updated = favorites.filter((f) => f !== id);
      dispatch(removeFavorite(id));
    } else {
      updated = [...favorites, id];
      dispatch(addFavorite(id));
    }

    if (user) await saveUserFavorites(user.uid, updated);
    else saveLocalFavorites(updated);
  }, [favorites, dispatch, user]);

  const handleSearchChange = (e) =>
    setSearchParams({ page: 1, search: e.target.value, perPage });

  const handlePerPageChange = (e) =>
    setSearchParams({ page: 1, search, perPage: Number(e.target.value) });

  const memoizedList = useMemo(() => list, [list]);

  return (
    <div className="items">
      <h1>Characters</h1>

      <input
        type="text"
        placeholder="Search"
        defaultValue={querySearch}
        onChange={handleSearchChange}
      />

      <select value={perPage} onChange={handlePerPageChange}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div>
        {memoizedList.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} />

            <Link
              to={`/items/${item.id}?page=${page}&search=${search}&perPage=${perPage}`}
            >
              {item.name}
            </Link>

            <button onClick={() => toggleFavorite(item.id)}>
              {favorites.includes(item.id) ? "Remove" : "Add"}
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => setSearchParams({ page: page - 1, search, perPage })}
          disabled={page === 1}
        >
          Prev
        </button>

        <span> Page {page} of {totalPages} </span>

        <button
          onClick={() => setSearchParams({ page: page + 1, search, perPage })}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ItemsListPage;
