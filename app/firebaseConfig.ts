import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAd7Odm74275WjzBMyLQsNUbRST8U0sZkY",
  authDomain: "cro102-df246.firebaseapp.com",
  projectId: "cro102-df246",
  storageBucket: "cro102-df246.firebasestorage.app",
  messagingSenderId: "909139847872",
  appId: "1:909139847872:web:bc27f88f8ef32d92e21b25",
  measurementId: "G-KKHJ8C1VBJ"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const analytics = getAnalytics(firebaseApp);

export { auth };