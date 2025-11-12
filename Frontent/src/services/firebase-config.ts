import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjmoJ_vwS8RLYDlAssQiMU_UGfLVm6Gkg",
  authDomain: "avaliacoes-loja-63a8f.firebaseapp.com",
  projectId: "avaliacoes-loja-63a8f",
  storageBucket: "avaliacoes-loja-63a8f.firebasestorage.app",
  messagingSenderId: "915410168835",
  appId: "1:915410168835:web:8527f9c072e4a6b7457236",
  measurementId: "G-TM6HG7F7XL"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);