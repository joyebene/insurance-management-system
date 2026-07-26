import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Claim } from "@/types/claim";

const claimsRef = collection(db, "claims");

export interface CreateClaimData {
  customerId: string;
  customerName: string;
  policyId: string;
  policyNumber: string;
  claimNumber: string;
  title: string;
  description: string;
  amount: number;
  status: Claim["status"];
}

export const ClaimService = {
  subscribe(callback: (claims: Claim[]) => void) {
    const q = query(
      claimsRef,
      orderBy("createdAt", "desc")
    );

    return onSnapshot(q, (snapshot) => {
      const claims = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Claim[];

      callback(claims);
    });
  },

  async create(data: CreateClaimData) {
    await addDoc(claimsRef, {
      ...data,
      createdAt: serverTimestamp(),
    });
  },

  async update(
    id: string,
    data: Partial<CreateClaimData>
  ) {
    await updateDoc(doc(db, "claims", id), data);
  },

  async delete(id: string) {
    await deleteDoc(doc(db, "claims", id));
  },
};