import {
  collection,
  doc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { AppUser } from "@/types/user";

const usersRef = collection(db, "users");

export const UserService = {
  subscribeCustomers(callback: (users: AppUser[]) => void) {
    const q = query(usersRef, where("role", "==", "customer"));

    return onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as AppUser[];

      callback(users);
    });
  },

  subscribeAllUsers(callback: (users: AppUser[]) => void) {
    return onSnapshot(usersRef, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      })) as AppUser[];

      callback(users);
    });
  },

  async getUser(uid: string) {
    const snap = await getDoc(doc(db, "users", uid));

    if (!snap.exists()) return null;

    return {
      uid: snap.id,
      ...snap.data(),
    } as AppUser;
  },

  async updateUser(uid: string, data: Partial<AppUser>) {
    await updateDoc(doc(db, "users", uid), data);
  },

  async deleteUser(uid: string) {
    await deleteDoc(doc(db, "users", uid));
  },
};