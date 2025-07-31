import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatappp-d8b3f.firebaseapp.com",
  projectId: "chatappp-d8b3f",
  storageBucket: "chatappp-d8b3f.firebasestorage.app",
  messagingSenderId: "667926703117",
  appId: "1:667926703117:web:c830eac15fc2369e75f944",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getFirestore(app);
