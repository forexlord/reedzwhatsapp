import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: "AIzaSyCWi9Z7SpaxWNMycS4LXScSvt1Rc1C6u3E",
  authDomain: "reedzwhatsapp.firebaseapp.com",
  projectId: "reedzwhatsapp",
  storageBucket: "reedzwhatsapp.appspot.com",
  messagingSenderId: "563007998881",
  appId: "1:563007998881:web:513eb4b59ae7ee026959e0",
  measurementId: "G-0TQQHFPE45",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };
