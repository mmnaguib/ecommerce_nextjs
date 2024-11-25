import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyATAvRwTSNjxl-KgH4jPUwBUlhzlLMa2b4",
  authDomain: "tia-store.firebaseapp.com",
  projectId: "tia-store",
  storageBucket: "tia-store.firebasestorage.app",
  messagingSenderId: "8703763351",
  appId: "1:8703763351:web:ec4e7c5ae95c010b0edad2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp