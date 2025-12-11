import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadProfile } from "../store/profileSlice";
import { clearProfile } from "../store/profileSlice";
import {
  setUser,
  clearUser,
  setLoading,
  setError,
} from "../store/authSlice";
import {
  login,
  logout,
  signup,
  subscribeToAuth,
} from "../services/authService";
import {
  loadFavorites,
  mergeFavorites,
  clearFavorites,
} from "../store/favoritesSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          email: user.email,
        };
  
        dispatch(setUser(userData));
        await dispatch(loadProfile(user.uid));

  
        await dispatch(loadFavorites(user.uid));
        
        const local = JSON.parse(
          localStorage.getItem("guest_favorites") || "[]"
        );
  
        if (local.length > 0) {
          await dispatch(mergeFavorites(user.uid));
          await dispatch(loadFavorites(user.uid));
        }
      } else {
        dispatch(clearUser());
        dispatch(clearFavorites());
        dispatch(loadFavorites(null));
        dispatch(clearProfile());
      }
    });
  
    return () => unsubscribe();
  }, [dispatch]);
  

  const loginUser = async (email, password) => {
    try {
      dispatch(setLoading());
      await login(email, password);
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const signupUser = async (email, password) => {
    try {
      dispatch(setLoading());
      await signup(email, password);
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const logoutUser = async () => {
    await logout();
  };

  return {
    ...auth,
    loginUser,
    signupUser,
    logoutUser,
  };
};
