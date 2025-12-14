import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQtqa_hSsWBk0JEk1rBmYWXUQwyCfp0uU",
  authDomain: "fir-frontend-2601a.firebaseapp.com",
  projectId: "fir-frontend-2601a",
  storageBucket: "fir-frontend-2601a.firebasestorage.app",
  messagingSenderId: "268911909240",
  appId: "1:268911909240:web:0e1c4d4c523091de25508d",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
