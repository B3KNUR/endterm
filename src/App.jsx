import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ItemsListPage from "./pages/ItemsListPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import OfflineBanner from "./components/OfflineBanner";
import Header from "./components/Header";
import { useAuth } from "./hooks/useAuth";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearMergeMessage } from "./store/favoritesSlice";



function App() {
  useAuth();

  const dispatch = useDispatch();
  const mergedMessage = useSelector(
    (state) => state.favorites.mergedMessage
  );

  useEffect(() => {
    if (mergedMessage) {
      alert("Your local favorites were merged with your account.");
      dispatch(clearMergeMessage());
    }
  }, [mergedMessage, dispatch]);

  return (
    <Router>
      <OfflineBanner />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/items" element={<ItemsListPage />} />
        <Route path="/items/:id" element={<ItemDetailsPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>

    </Router>
  );
}

export default App;
