import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDNykQ-wDP3KczWJISp2tKoa10Jvy4V7bU",
  authDomain: "kaizenisg-19e0a.firebaseapp.com",
  databaseURL: "https://kaizenisg-19e0a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kaizenisg-19e0a",
  storageBucket: "kaizenisg-19e0a.appspot.com",
  messagingSenderId: "572396827695",
  appId: "1:572396827695:android:142d0b271dc1b4c09442da",
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app); // db'yi burada dışa aktar
