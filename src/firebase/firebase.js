// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBO1wLV5w8qAiTPWO3T5VO3nqQ2Bjqo0To",
  authDomain: "fundhive-crowdfunding.firebaseapp.com",
  projectId: "fundhive-crowdfunding",
  storageBucket: "fundhive-crowdfunding.firebasestorage.app",
  messagingSenderId: "489299445079",
  appId: "1:489299445079:web:7253909adfe4a641eaaa12",
  measurementId: "G-SMV0EV7C41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
