import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBAu_coPGR4Q4jxE3l7_8nZm3iQmxtuVQ",
  authDomain: "rm-app-976ce.firebaseapp.com",
  projectId: "rm-app-976ce",
  storageBucket: "rm-app-976ce.firebasestorage.app",
  messagingSenderId: "389257278742",
  appId: "1:389257278742:web:7c5da6d8d6597143cdcc37"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);