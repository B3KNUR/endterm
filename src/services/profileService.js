import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


export const getProfile = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
};

export const updateProfile = async (uid, data) => {
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, data, { merge: true });
};

export const uploadProfilePictureBase64 = (file, uid) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(
      new URL("../workers/imageCompressor.worker.js", import.meta.url)
    );

    worker.postMessage(file);

    worker.onmessage = async (e) => {
      try {
        const compressedBase64 = e.data;

        if (!compressedBase64) {
          throw new Error("Failed to compress image");
        }

        const userRef = doc(db, "users", uid);

        await updateDoc(userRef, {
          photoURL: compressedBase64,
        });

        worker.terminate();
        resolve(compressedBase64);
      } catch (err) {
        worker.terminate();
        reject(err);
      }
    };

    worker.onerror = (err) => {
      worker.terminate();
      reject(err);
    };
  });
};

