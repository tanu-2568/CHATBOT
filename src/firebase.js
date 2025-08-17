// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAe46vTbdv80stU4xmfUKRPyzeELgR59II",
  authDomain: "chatbot-ba872.firebaseapp.com",
  projectId: "chatbot-ba872",
  storageBucket: "chatbot-ba872.appspot.com", // ✅ small fix: use .appspot.com
  messagingSenderId: "319073790618",
  appId: "1:319073790618:web:d51b7e2e3095a6aad4cd23",
  measurementId: "G-7F8JDV7YV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication
export const auth = getAuth(app);
