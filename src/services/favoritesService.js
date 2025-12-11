import { db } from "../firebase/firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

const LOCAL_KEY = "guest_favorites";

export const getLocalFavorites = () => {
  const data = localStorage.getItem(LOCAL_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveLocalFavorites = (favorites) => {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(favorites));
};

export const clearLocalFavorites = () => {
  localStorage.removeItem(LOCAL_KEY);
};

export const getUserFavorites = async (uid) => {
  const docRef = doc(db, "favorites", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().items || [];
  }
  return [];
};

export const saveUserFavorites = async (uid, items) => {
  const docRef = doc(db, "favorites", uid);
  await setDoc(docRef, { items }, { merge: true });
};