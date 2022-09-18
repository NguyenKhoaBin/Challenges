import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCLJdYcDwi4N82nneMIbbv9FaSWqXLMf28",
  authDomain: "learnenglish-47094.firebaseapp.com",
  projectId: "learnenglish-47094",
  storageBucket: "learnenglish-47094.appspot.com",
  messagingSenderId: "254209001003",
  appId: "1:254209001003:web:e425072bf301ef089e8c6e",
  measurementId: "G-F1D4CLCTKD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
