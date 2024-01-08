// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB3bo4VPXAceQVEo-FqbN3q2eTyr2jlJZQ",
    authDomain: "ctrl-future.firebaseapp.com",
    projectId: "ctrl-future",
    storageBucket: "ctrl-future.appspot.com",
    messagingSenderId: "560422170708",
    appId: "1:560422170708:web:920825955bff70a9fdbdc1",
    measurementId: "G-JLYE5PPDS4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db };
