import { Timestamp } from "firebase/firestore";

export type UserRole = "admin" | "customer";

export interface AppUser {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  photoURL?: string;
  createdAt?: Timestamp;
}