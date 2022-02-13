import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCKivOh3NYYajAJT-DTYQKw8ZBnKq-YKA4",
  authDomain: "marrkt-916b3.firebaseapp.com",
  databaseURL:
    "https://marrkt-916b3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "marrkt-916b3",
  storageBucket: "marrkt-916b3.appspot.com",
  messagingSenderId: "50753055150",
  appId: "1:50753055150:web:9594a194a5871a898a403f",
};

export const firebaseApp = initializeApp(config);
export const firebaseDB = getFirestore();
