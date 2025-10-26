
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { User } from "@/models/user";

const usersCollection = "users";

export const addUser = async (user: User) => {
  const userRef = doc(db, usersCollection, user.uid);
  await setDoc(userRef, user);
};

export const getUser = async (uid: string) => {
  const userRef = doc(db, usersCollection, uid);
  const userSnap = await getDoc(userRef);
  return userSnap.exists() ? (userSnap.data() as User) : null;
};

export const updateUser = async (uid: string, updates: Partial<User>) => {
  const userRef = doc(db, usersCollection, uid);
  await updateDoc(userRef, updates);
};

export const deleteUser = async (uid: string) => {
  const userRef = doc(db, usersCollection, uid);
  await deleteDoc(userRef);
};
