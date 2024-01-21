"use client";
// Import required Firebase modular SDK features
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/firebase";
import Loading from "@/component/Loading";
import Login from "./Login/page";
import Sidebar from "@/component/Sidebar";

import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp,
  collection,
} from "firebase/firestore";

export default function Home() {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const updateUserInFirestore = async () => {
      if (user) {
        const firestore = getFirestore();
        const userDocRef = doc(collection(firestore, "users"), user.uid);

        try {
          await setDoc(
            userDocRef,
            {
              email: user.email,
              lastSeen: serverTimestamp(),
              photoUrl: user.photoURL,
            },
            { merge: true }
          );
        } catch (error) {
          console.error("Error updating user in Firestore:", error.message);
        }
      }
    };

    updateUserInFirestore();
  }, [user]);

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return (
    <main>
      <Sidebar />
    </main>
  );
}
