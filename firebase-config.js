// firebase-config.js
// Configuração e inicialização do Firebase para a Ascensão Milionária

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Configuração real do projeto "ascensao-milionaria"
const firebaseConfig = {
  apiKey: "AIzaSyCISgCMjNzTouImMa_JwTi_NzsYhS6-dE8",
  authDomain: "ascensao-milionaria.firebaseapp.com",
  projectId: "ascensao-milionaria",
  storageBucket: "ascensao-milionaria.firebasestorage.app",
  messagingSenderId: "700963931035",
  appId: "1:700963931035:web:857c6ff3aee25d6682173e",
  measurementId: "G-HJBQ03WPCD"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export {
  auth, db, googleProvider, analytics,
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup, signOut, onAuthStateChanged,
  doc, setDoc, getDoc, updateDoc, collection, getDocs
};
